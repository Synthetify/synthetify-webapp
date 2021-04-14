/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { state } from '@selectors/exchange'
import { actions, IAsset } from '@reducers/exchange'
import { getOracleProgram } from '@web3/programs/oracle'
import { getManagerProgram } from '@web3/programs/manager'

export function* pullAssetPrices(): Generator {
  // const oracleProgram = yield* call(getOracleProgram)
  const managerProgram = yield* call(getManagerProgram)
  const stateExchange = yield* select(state)
  const assetsList = yield* call(
    [managerProgram, managerProgram.getAssetsList],
    stateExchange.assetsList
  )
  console.log(assetsList)
  yield* put(
    actions.setAssets(
      assetsList.assets.reduce((acc, asset) => {
        // TODO add parsing address to symbol
        acc[asset.assetAddress.toString()] = { ...asset, symbol: '123' }
        return acc
      }, {} as { [key in string]: IAsset })
    )
  )

  // for (const [_, asset] of Object.entries(assetsList.assets)) {
  //   try {
  //     const priceFeed = yield* call(
  //       [oracleProgram, oracleProgram.account.priceFeed],
  //       asset.feedAddress
  //     ) as any
  //     yield* put(actions.setAssetPrice({ price: priceFeed.price, token: asset.assetAddress }))
  //   } catch (error) {}
  // }
}
