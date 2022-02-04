import { ILeverageSynthetic } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { ILeveragePair } from '@reducers/leverage'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
export const getAssetFromAndTo = (leveragePair: ILeveragePair | null) => {
  if (leveragePair === null) {
    return [
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: null,
        maxAvailable: new BN(0),
        balance: new BN(0)
      },
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: null,
        maxAvailable: new BN(0),
        balance: new BN(0)
      }
    ]
  }

  const syntheticFrom: AssetPriceData = {
    priceVal: leveragePair.collateralPrice.val,
    assetScale: leveragePair.collateralBalance.scale,
    symbol: leveragePair.collateralSymbol,
    maxAvailable: leveragePair.collateralBalance.val,
    balance: leveragePair.collateralBalance.val
  }
  const syntheticTo: AssetPriceData = {
    priceVal: leveragePair.syntheticPrice.val,
    assetScale: leveragePair.syntheticBalance.scale,
    symbol: leveragePair.syntheticSymbol,
    maxAvailable: leveragePair.syntheticBalance.val,
    balance: leveragePair.syntheticBalance.val
  }
  return [syntheticFrom, syntheticTo]
}
export const getSyntheticAsCollateral = (allSynthetic: ILeverageSynthetic | null) => {
  if (allSynthetic === null) {
    return [
      {
        priceVal: new BN(1000000),
        assetScale: 6,
        symbol: null,
        maxAvailable: new BN(0),
        balance: new BN(0)
      }
    ]
  }
  const collateral: AssetPriceData = {
    priceVal: allSynthetic.syntheticData.price.val,
    assetScale: allSynthetic.syntheticData.supply.scale,
    symbol: allSynthetic.syntheticData.symbol,
    maxAvailable: allSynthetic.syntheticData.balance,
    balance: allSynthetic.syntheticData.balance
  }

  return [collateral]
}

export const getLeverageLevel = (percentageCRatio: number) => {
  return percentageCRatio > 100 ? (1 / (1 - 1 / (percentageCRatio / 100))).toFixed(2) : '1'
}
