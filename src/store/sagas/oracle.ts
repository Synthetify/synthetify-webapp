/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { state } from '@selectors/exchange'
import { actions, IAsset } from '@reducers/exchange'
import { getExchangeProgram } from '@web3/programs/exchange'
import { addressToAssetSymbol } from '@synthetify/sdk/lib/utils'
import { Collateral, Synthetic } from '@synthetify/sdk/lib/exchange'

export function* pullAssetPrices(): Generator {
  const exchangeProgram = yield* call(getExchangeProgram)
  const stateExchange = yield* select(state)
  const assetsList = yield* call(
    [exchangeProgram, exchangeProgram.getAssetsList],
    stateExchange.assetsList
  )
  let assets: IAsset[] = []
  assets = assetsList.synthetics.reduce((acc, asset) => {
    acc[asset.assetIndex] = {
      ...assetsList.assets[asset.assetIndex],
      symbol: addressToAssetSymbol[asset.assetAddress.toString()] || 'XYZ'
    }
    return acc
  }, assets)
  assets = assetsList.collaterals.reduce((acc, asset) => {
    acc[asset.assetIndex] = {
      ...assetsList.assets[asset.assetIndex],
      symbol: addressToAssetSymbol[asset.collateralAddress.toString()] || 'XYZ'
    }
    return acc
  }, assets)
  yield* put(actions.setAssets(assets))
  yield* put(actions.setSynthetics(
    assetsList.synthetics.reduce((acc, asset) => {
      acc[asset.assetAddress.toString()] = asset
      return acc
    }, {} as { [key in string]: Synthetic })
  ))
  yield* put(actions.setCollaterals(
    assetsList.collaterals.reduce((acc, asset) => {
      acc[asset.collateralAddress.toString()] = asset
      return acc
    }, {} as { [key in string]: Collateral })
  ))
}
