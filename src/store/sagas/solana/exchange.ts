/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { actions } from '@reducers/exchange'
import { collateralToken, userAccountAddress } from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import testAdmin from '@consts/testAdmin'
import * as anchor from '@project-serum/anchor'
import { getSystemProgram } from '@web3/connection'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Account } from '@solana/web3.js'
import { pullAssetPrices } from './oracle'
import { createAccount, getToken, getWallet } from './wallet'
import { Program } from '@project-serum/anchor'
import { SystemProgram } from '@solana/web3.js'

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
  // return SystemProgram.createAccount({
  //   fromPubkey: systemProgram.provider.wallet.publicKey,
  //   newAccountPubkey: userAccount.publicKey,
  //   space: systemProgram.account.userAccount.size,
  //   lamports: await systemProgram.provider.connection.getMinimumBalanceForRentExemption(
  //     systemProgram.account.userAccount.size
  //   ),
  //   programId: systemProgram.programId
  // })
  console.log(systemProgram.programId.toBuffer())
  return await systemProgram.account.userAccount.createInstruction(userAccount)
}
export function* depositCollateral(): Generator {
  const collateralTokenAddress = yield* select(collateralToken)
  const tokensAccounts = yield* select(accounts)
  const userCollateralTokenAccount = tokensAccounts[collateralTokenAddress.toString()][0]
  // console.log(userCollateralTokenAccount)
  const userExchangeAccount = yield* select(userAccountAddress)
  const wallet = yield* call(getWallet)
  const systemProgram = yield* call(getSystemProgram)
  console.log(userExchangeAccount.toString())
  if (userExchangeAccount.equals(DEFAULT_PUBLICKEY)) {
    console.log('create account')
    const userAccount = new Account()

    const createInstruction = yield* call(createAccountInstruction, userAccount, systemProgram)
    console.log('111')
    yield* call(systemProgram.rpc.createUserAccount, wallet.publicKey, {
      accounts: {
        userAccount: userAccount.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY
      },
      signers: [userAccount],
      instructions: [createInstruction]
    })
    console.log('111')

    yield* put(actions.setUserAccountAddress(userAccount.publicKey))
  }

  // const collateralTokenProgram = yield* call(getToken, collateralTokenAddress)
  // // const wallet = yield* call(getWallet)
  // let accountAddress = tokensAccounts[collateralTokenAddress.toString()]
  //   ? tokensAccounts[collateralTokenAddress.toString()][0].address
  //   : null
  // if (!accountAddress) {
  //   accountAddress = yield* call(createAccount, collateralTokenProgram.publicKey)
  // }
  // yield* call(
  //   [collateralTokenProgram, collateralTokenProgram.mintTo],
  //   accountAddress,
  //   testAdmin,
  //   [],
  //   1e9
  // )
  // console.log('Token Airdroped')
}
