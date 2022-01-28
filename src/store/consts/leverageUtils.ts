import { ILeverageSynthetic } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
export const getAssetFromAndTo = (allSynthetic: ILeverageSynthetic | null) => {
  if (allSynthetic === null) {
    return [
      {
        priceVal: new BN(0),
        assetScale: 0,
        symbol: null,
        maxAvailable: new BN(0),
        balance: new BN(0)
      },
      {
        priceVal: new BN(0),
        assetScale: 0,
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

  const synthetic: AssetPriceData = {
    priceVal: allSynthetic.syntheticData.price.val,
    assetScale: allSynthetic.syntheticData.supply.scale,
    symbol: allSynthetic.syntheticData.symbol,
    maxAvailable: allSynthetic.syntheticData.balance,
    balance: allSynthetic.syntheticData.balance
  }

  return [collateral, synthetic]
}

export const getLeverageLevel = (percentageCRatio: number) => {
  return percentageCRatio !== 0 ? (1 / (1 - 1 / (percentageCRatio / 100))).toFixed(2) : '0'
}
