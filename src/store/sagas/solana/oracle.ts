/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { state } from '@selectors/exchange'
import { actions, IAsset } from '@reducers/exchange'
import { getManagerProgram } from '@web3/programs/manager'

export function* pullAssetPrices(): Generator {
  const managerProgram = yield* call(getManagerProgram)
  const stateExchange = yield* select(state)
  const assetsList = yield* call(
    [managerProgram, managerProgram.getAssetsList],
    stateExchange.assetsList
  )
  yield* put(
    actions.setAssets(
      assetsList.assets.reduce((acc, asset) => {
        // TODO add parsing address to symbol
        acc[asset.assetAddress.toString()] = { ...asset, symbol: '123' }
        return acc
      }, {} as { [key in string]: IAsset })
    )
  )
}
