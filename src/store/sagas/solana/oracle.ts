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
  for (const asset of assetsList.assets) {
    console.log(asset.assetAddress.toString())
    console.log(asset.price.toString())
  }
  yield* put(
    actions.setAssets(
      assetsList.assets.reduce((acc, asset) => {
        // TODO add parsing address to symbol
        acc[asset.assetAddress.toString()] = {
          ...asset,
          symbol: addressToAssetSymbol[asset.assetAddress.toString()] || 'XYZ'
        }
        return acc
      }, {} as { [key in string]: IAsset })
    )
  )
}

const addressToAssetSymbol: { [key: string]: string } = {
  '8V8JuSxR4SCSbqp2f74w7Kiv93FBbqfmPQGSJ1x2MPYi': 'xUSD',
  qB6GZSkKLWkkPEzraDdroAVvMFWyvvw9PWP71PKfAsm: 'SNY',
  '6txDFBT7v5uoLewnTCPYvBW25GLgr1d9eYQt3RTD9bdF': 'xFTT',
  '5Hm3K6nNUJ8gBQTQhLBb8ZHC8BupaED6mkws3vXPuHyH': 'xBTC',
  HPxzYx1doGTbwJx6AJmtsx1iN53v6sV2nPy7VgeA5aJ7: 'xSOL',
  '2HnwLrUhdkUg7zLmC2vaU9gVppkLo9WMPHyJK49h9SRa': 'xSRM',
  AKEJVWRH8QM19mP6gKrqjfm2rPTZrcqTiiWNKpoKxk8q: 'xETH',
  DYX3sKjcjNfHuoGLADVFotf8vDhThqxsPSmByKZN81sA: 'xLINK',
  '9hDKBnkbK7byYUm4Tp3ZMmTLA5XPt5UWfnLPj8HQWUEg': 'xBNB',
  AMDe7a7VZTo5d9UmMpdEh6H6kVmyvo1BPWb2BiVdcyrP: 'xUSD',
  '681fXt5mXkcrztcmjDRwtG2McQ6rh1zaY4MVjVE23FRN': 'SNY',
  '2K8fxLMajRCSdjMY6xCPg8hXpswAYgsdYCxGLT72ByD9': 'xFTT',
  HmrgH46wwSityKa9x321DPA4sRmknEjNhjuJgMAxPuea: 'xBTC',
  G3P9upmKa8xuP6WnjRZ7yF46raYL7KEmK45sgPuc9kgM: 'xSOL',
  '8CmY67FG1syfMQxd68kY8GgEKRjvM4JPVeN29VqWEyNQ': 'xSRM',
  '6HWS9dMamPPnaHLnwZ9oWmY9SJ9Qw5icxGVXCPyqad4Z': 'xETH',
  HvAAn7hyD3KoWg3oDhBhg2xKoj4g1PgaGEga365vKRbJ: 'xLINK',
  '6KB7svk18HxokBYVaxQLz4SEvGGKeJ9Y2J26NHZ9wcdQ': 'xBNB'
}
