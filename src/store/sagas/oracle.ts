/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { state } from '@selectors/exchange'
import { actions, IAsset } from '@reducers/exchange'
import { getExchangeProgram } from '@web3/programs/exchange'
import { addressToAssetSymbol } from '@synthetify/sdk/lib/utils'

export function* pullAssetPrices(): Generator {
  const exchangeProgram = yield* call(getExchangeProgram)
  const stateExchange = yield* select(state)
  const assetsList = yield* call(
    [exchangeProgram, exchangeProgram.getAssetsList],
    stateExchange.assetsList
  )
  yield* put(
    actions.setAssets(
      assetsList.assets.reduce((acc, asset) => {
        // TODO add parsing address to symbol
        acc[asset.synthetic.assetAddress.toString()] = {
          ...asset,
          symbol: addressToAssetSymbol[asset.synthetic.assetAddress.toString()] || 'XYZ'
        }
        return acc
      }, {} as { [key in string]: IAsset })
    )
  )
}
