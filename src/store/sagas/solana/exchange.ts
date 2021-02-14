/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put } from 'typed-redux-saga'

import { actions, IAsset } from '@reducers/exchange'
import * as R from 'remeda'
import { getSystemProgram } from '@web3/connection'

export function* pullExchangeState(): Generator {
  const systemProgram = yield* call(getSystemProgram)
  // @ts-expect-error
  const state = yield* call(systemProgram.state) as any
  yield put(
    actions.setState({
      debt: state.debt,
      shares: state.shares,
      collateralAccount: state.collateralAccount,
      assets: R.map(state.assets, (a: any) => {
        return {
          address: a.assetAddress,
          feedAddress: a.feedAddress,
          decimals: a.decimals,
          price: a.price,
          supply: a.supply,
          ticker: a.ticker
        } as IAsset
      }),
      collateralToken: state.collateralToken,
      fee: state.fee,
      collateralizationLevel: state.collateralizationLevel
    })
  )
}
