/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { actions, IAsset } from '@reducers/exchange'
import { collateralToken } from '@selectors/exchange'
import { accounts } from '@selectors/solanaWallet'
import testAdmin from '@consts/testAdmin'
import * as R from 'remeda'
import { getSystemProgram } from '@web3/connection'
import { createAccount, getToken } from './wallet'
import { pullAssetPrices } from './oracle'

export function* pullExchangeState(): Generator {
  const systemProgram = yield* call(getSystemProgram)
  // @ts-expect-error
  const state = yield* call(systemProgram.state) as any
  yield put(
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
  // const wallet = yield* call(getWallet)
  let accountAddress = tokensAccounts[collateralTokenAddress.toString()]
    ? tokensAccounts[collateralTokenAddress.toString()][0].address
    : null
  if (!accountAddress) {
    accountAddress = yield* call(createAccount, collateralTokenProgram.publicKey)
  }
  yield* call(
    [collateralTokenProgram, collateralTokenProgram.mintTo],
    accountAddress,
    testAdmin,
    [],
    1e9
  )
  console.log('Token Airdroped')
}
