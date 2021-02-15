/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { actions } from '@reducers/exchange'
import { collateralAccount, collateralToken, userAccountAddress } from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import testAdmin from '@consts/testAdmin'
import * as anchor from '@project-serum/anchor'
import { getSystemProgram } from '@web3/connection'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Account } from '@solana/web3.js'
import { pullAssetPrices } from './oracle'
import { createAccount, getToken, getWallet } from './wallet'
import { BN, Program } from '@project-serum/anchor'
import { createTransferInstruction } from './token'

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
            ticker: a.ticker
          }
        })
      }, {}),
      collateralToken: state.collateralToken,
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
export function* depositCollateral(amount: BN): Generator {
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
  yield* call(systemProgram.state.rpc.deposit, {
    accounts: {
      userAccount: userExchangeAccount,
      collateralAccount: collateralAccountAddress
    },
    signers: [wallet],
    instructions: [transferTx]
  })
}
