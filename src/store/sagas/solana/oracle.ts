/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { assets } from '@selectors/exchange'
import { actions } from '@reducers/exchange'
import { getOracleProgram } from '@web3/connection'

export function* pullAssetPrices(): Generator {
  const oracleProgram = yield* call(getOracleProgram)
  const exchangeAssets = yield* select(assets)

  for (const [_, asset] of Object.entries(exchangeAssets)) {
    try {
      const priceFeed = yield* call(
        [oracleProgram, oracleProgram.account.priceFeed],
        asset.feedAddress
      ) as any
      yield* put(actions.setAssetPrice({ price: priceFeed.price, token: asset.address }))
    } catch (error) {}
  }
}
