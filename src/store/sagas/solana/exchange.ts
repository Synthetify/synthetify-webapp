/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, SagaGenerator, select } from 'typed-redux-saga'

import { actions } from '@reducers/exchange'
import {
  collateralAccount,
  collateralToken,
  userAccountAddress,
  assets,
  xUSDAddress,
  mintAuthority
} from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import testAdmin from '@consts/testAdmin'
import * as anchor from '@project-serum/anchor'
import { getSystemProgram } from '@web3/connection'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Account, TransactionInstruction } from '@solana/web3.js'
import { pullAssetPrices } from './oracle'
import { createAccount, getToken, getWallet } from './wallet'
import { BN, Program } from '@project-serum/anchor'
import { createTransferInstruction } from './token'
import { TokenInstructions } from '@project-serum/serum'

export function* pullExchangeState(): Generator {
  const systemProgram = yield* call(getSystemProgram)
  // @ts-expect-error
  const state = yield* call(systemProgram.state) as any
  yield* put(
    actions.setState({
      debt: state.debt,
      shares: state.shares,
      collateralAccount: state.collateralAccount,
      assets: state.assets.reduce((acc: any, a: any) => {
        return Object.assign(acc, {
          [a.assetAddress.toString()]: {
            address: a.assetAddress,
            feedAddress: a.feedAddress,
            decimals: a.decimals,
            price: a.price,
            supply: a.supply,
            ticker: a.ticker.toString()
          }
        })
      }, {}),
      collateralToken: state.collateralToken,
      mintAuthority: state.mintAuthority,
      fee: state.fee,
      collateralizationLevel: state.collateralizationLevel
    })
  )
  yield* call(pullAssetPrices)
}
export function* getCollateralTokenAirdrop(): Generator {
  const collateralTokenAddress = yield* select(collateralToken)
  const tokensAccounts = yield* select(accounts)
  const collateralTokenProgram = yield* call(getToken, collateralTokenAddress)
  let accountAddress = tokensAccounts[collateralTokenAddress.toString()]
    ? tokensAccounts[collateralTokenAddress.toString()][0].address
    : null
  if (accountAddress == null) {
    accountAddress = yield* call(createAccount, collateralTokenProgram.publicKey)
  }
  yield* call(
    [collateralTokenProgram, collateralTokenProgram.mintTo],
    accountAddress,
    testAdmin,
    [],
    1e9
  )
  // console.log('Token Airdroped')
}
const createAccountInstruction = async (userAccount: Account, systemProgram: Program) => {
  return await systemProgram.account.userAccount.createInstruction(userAccount)
}
export function* depositCollateral(amount: BN): SagaGenerator<string> {
  const collateralTokenAddress = yield* select(collateralToken)
  const collateralAccountAddress = yield* select(collateralAccount)
  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[collateralTokenAddress.toString()][0]
  let userExchangeAccount = yield* select(userAccountAddress)
  const wallet = yield* call(getWallet)
  const systemProgram = yield* call(getSystemProgram)
  if (userExchangeAccount.equals(DEFAULT_PUBLICKEY)) {
    console.log('create account')
    const userAccount = new Account()

    const createInstruction = yield* call(createAccountInstruction, userAccount, systemProgram)
    yield* call(systemProgram.rpc.createUserAccount, wallet.publicKey, {
      accounts: {
        userAccount: userAccount.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY
      },
      signers: [userAccount],
      instructions: [createInstruction]
    })
    yield* put(actions.setUserAccountAddress(userAccount.publicKey))
  }
  const transferTx = yield* call(
    createTransferInstruction,
    collateralTokenAddress,
    userCollateralTokenAccount.address,
    collateralAccountAddress,
    amount
  )
  userExchangeAccount = yield* select(userAccountAddress)
  const txid = yield* call(systemProgram.state.rpc.deposit, {
    accounts: {
      userAccount: userExchangeAccount,
      collateralAccount: collateralAccountAddress
    },
    signers: [wallet],
    instructions: [transferTx]
  })
  return txid
}
export function* updateFeedsTransactions(): SagaGenerator<TransactionInstruction[]> {
  const transactions: TransactionInstruction[] = []
  const systemProgram = yield* call(getSystemProgram)
  // @ts-expect-error
  const state = yield* call(systemProgram.state) as any
  for (let index = 1; index < state.assets.length; index++) {
    transactions.push(
      yield* call(
        // @ts-expect-error
        [systemProgram, systemProgram.state.instruction.updatePrice],
        state.assets[index].feedAddress,
        {
          accounts: {
            priceFeedAccount: state.assets[index].feedAddress,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
          }
        }
      ) as any
    )
  }
  return transactions
}
export function* pullUserAccountData(): Generator {
  const systemProgram = yield* call(getSystemProgram)
  const userExchangeAccount = yield* select(userAccountAddress)
  if (userExchangeAccount.equals(DEFAULT_PUBLICKEY)) {
    return
  }
  const account = yield* call(
    [systemProgram, systemProgram.account.userAccount],
    userExchangeAccount
  ) as any
  yield* put(actions.setUserAccountData({ collateral: account.collateral, shares: account.shares }))
}
export function* mintUsd(amount: BN): SagaGenerator<string> {
  const usdTokenAddress = yield* select(xUSDAddress)
  const authority = yield* select(mintAuthority)
  const tokensAccounts = yield* select(accounts)
  const tokenProgram = yield* call(getToken, usdTokenAddress)
  const systemProgram = yield* call(getSystemProgram)
  const userExchangeAccount = yield* select(userAccountAddress)

  let accountAddress = tokensAccounts[usdTokenAddress.toString()]
    ? tokensAccounts[usdTokenAddress.toString()][0].address
    : null
  if (accountAddress == null) {
    accountAddress = yield* call(createAccount, tokenProgram.publicKey)
  }
  const updateFeedsTxs = yield* call(updateFeedsTransactions)
  const wallet = yield* call(getWallet)
  // console.log(accountAddress.toString())
  return yield* call([systemProgram, systemProgram.state.rpc.mint], amount, {
    accounts: {
      authority: authority,
      mint: usdTokenAddress,
      to: accountAddress,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      userAccount: userExchangeAccount,
      owner: wallet.publicKey
    },
    signers: [wallet],
    instructions: updateFeedsTxs
  })
}
export function* withdrawCollateral(amount: BN): SagaGenerator<string> {
  const collateralTokenAddress = yield* select(collateralToken)
  const collateralAccountAddress = yield* select(collateralAccount)

  const authority = yield* select(mintAuthority)
  const tokensAccounts = yield* select(accounts)
  const systemProgram = yield* call(getSystemProgram)
  const userExchangeAccount = yield* select(userAccountAddress)

  const accountAddress = tokensAccounts[collateralTokenAddress.toString()][0].address

  const updateFeedsTxs = yield* call(updateFeedsTransactions)
  const wallet = yield* call(getWallet)
  return yield* call([systemProgram, systemProgram.state.rpc.withdraw], amount, {
    accounts: {
      authority: authority,
      to: accountAddress,
      collateralAccount: collateralAccountAddress,
      tokenProgram: TokenInstructions.TOKEN_PROGRAM_ID,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      userAccount: userExchangeAccount,
      owner: wallet.publicKey
    },
    signers: [wallet],
    instructions: updateFeedsTxs
  })
}
