/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { call, put, select } from 'typed-redux-saga'

import { state } from '@selectors/exchange'
import { actions, ICollateral, ISynthetic } from '@reducers/exchange'
import { actions as actionsVault } from '@reducers/vault'
import { getExchangeProgram } from '@web3/programs/exchange'
import { addressToAssetSymbol } from '@synthetify/sdk/lib/utils'
import { Asset } from '@synthetify/sdk/lib/exchange'

export function* pullAssetPrices(): Generator {
  const exchangeProgram = yield* call(getExchangeProgram)
  const stateExchange = yield* select(state)
  const assetsList = yield* call(
    [exchangeProgram, exchangeProgram.getAssetsList],
    stateExchange.assetsList
  )
  let assets: Asset[] = []
  assets = assetsList.synthetics.reduce((acc, asset) => {
    acc[asset.assetIndex] = {
      ...assetsList.assets[asset.assetIndex]
    }
    return acc
  }, assets)
  assets = assetsList.collaterals.reduce((acc, asset) => {
    acc[asset.assetIndex] = {
      ...assetsList.assets[asset.assetIndex]
    }
    return acc
  }, assets)
  yield* put(actions.setAssets(assets))
  yield* put(
    actions.setSynthetics(
      assetsList.synthetics.reduce((acc, asset) => {
        acc[asset.assetAddress.toString()] = {
          ...asset,
          symbol: addressToAssetSymbol[asset.assetAddress.toString()] || 'XYZ'
        }
        return acc
      }, {} as { [key in string]: ISynthetic })
    )
  )
  yield* put(
    actions.setCollaterals(
      assetsList.collaterals.reduce((acc, asset) => {
        acc[asset.collateralAddress.toString()] = {
          ...asset,
          symbol: addressToAssetSymbol[asset.collateralAddress.toString()] || 'XYZ'
        }
        return acc
      }, {} as { [key in string]: ICollateral })
    )
  )

  for (const token of assetsList.synthetics) {
    yield* put(
      actionsVault.batchSetAssetPrice({
        [token.assetAddress.toString()]: assets[token.assetIndex].price
      })
    )
  }
  for (const token of assetsList.collaterals) {
    yield* put(
      actionsVault.batchSetAssetPrice({
        [token.collateralAddress.toString()]: assets[token.assetIndex].price
      })
    )
  }
}
