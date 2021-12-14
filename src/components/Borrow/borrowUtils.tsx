import React from 'react'
import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN } from '@consts/utils'
import { Decimal } from '@synthetify/sdk/lib/exchange'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
export const calculateAmountCollateral = (
  assetTo: AssetPriceData,
  assetFrom: AssetPriceData,
  amount: BN,
  cRatio: string
) => {
  const amountBeforeCalculations = assetTo.priceVal
    .mul(amount)
    .div(assetFrom.priceVal)
    .mul(printBNtoBN((Number(cRatio) * 100).toString(), 0))
    .div(new BN(10000))

  const decimalChange = 10 ** (assetTo.assetScale - assetFrom.assetScale)
  if (decimalChange < 1) {
    return amountBeforeCalculations.mul(new BN(1 / decimalChange))
  } else {
    return amountBeforeCalculations.div(new BN(decimalChange))
  }
}
export const calculateAmountBorrow = (
  assetTo: AssetPriceData,
  assetFrom: AssetPriceData,
  amount: BN,
  cRatio: string
) => {
  const decimalChange = 10 ** (assetTo.assetScale - assetFrom.assetScale)

  if (decimalChange < 1) {
    return assetFrom.priceVal
      .mul(amount)
      .div(new BN(1 / decimalChange))
      .div(assetTo.priceVal)
      .mul(new BN(10000))
      .div(printBNtoBN((Number(cRatio) * 100).toString(), 0))
  } else {
    return assetFrom.priceVal
      .mul(amount)
      .mul(new BN(decimalChange))
      .div(assetTo.priceVal)
      .mul(new BN(10000))
      .div(printBNtoBN((Number(cRatio) * 100).toString(), 0))
  }
}

export const calculateCRatio = (
  assetTo: AssetPriceData,
  assetToAmount: BN,
  assetFrom: AssetPriceData,
  assetFromAmount: BN
) => {
  if (assetToAmount > new BN(0)) {
    const difDecimal = assetTo.assetScale - assetFrom.assetScale + 4
    if (difDecimal < 1) {
      return assetFromAmount
        .mul(assetFrom.priceVal)
        .mul(new BN(10).pow(new BN(1 / difDecimal)))
        .div(assetToAmount.mul(assetTo.priceVal))
    } else {
      return assetFromAmount
        .mul(assetFrom.priceVal)
        .mul(new BN(10).pow(new BN(difDecimal)))
        .div(assetToAmount.mul(assetTo.priceVal))
    }
  } else {
    return 'NaN'
  }
}
export const calculateLiqPrice = (
  priceFrom: BN,
  amountCollateral: BN,
  priceTo: BN,
  amountBorrow: BN,
  liqThreshold: Decimal,
  assetScaleTo: number,
  assetScaleFrom: number
) => {
  const amountUSDBorrow = amountBorrow.mul(priceTo)
  if (amountBorrow.eq(new BN(0)) || amountCollateral.eq(new BN(0))) {
    return printBN(
      priceFrom.mul(liqThreshold.val).div(new BN(10).pow(new BN(liqThreshold.scale))),
      assetScaleFrom + 2
    )
  } else {
    return printBN(
      amountUSDBorrow.div(
        liqThreshold.val.mul(amountCollateral).div(new BN(10).pow(new BN(liqThreshold.scale)))
      ),
      assetScaleTo + 2
    )
  }
}
export const calculateAvailableBorrow = (
  assetTo: AssetPriceData,
  assetFrom: AssetPriceData,
  cRatio: string,
  vaultEntryAmountCollateral: BN,
  amountCollateral: BN,
  vaultEntryAmountBorrow: BN
) => {
  const amountAfterCalculation = calculateAmountBorrow(
    assetTo,
    assetFrom,
    amountCollateral.add(vaultEntryAmountCollateral),
    cRatio
  )
  if (amountAfterCalculation.sub(vaultEntryAmountBorrow).gte(new BN(0))) {
    return amountAfterCalculation.sub(vaultEntryAmountBorrow)
  } else {
    return new BN(0)
  }
}

export const calculateAvailableWithdraw = (
  assetTo: AssetPriceData,
  assetFrom: AssetPriceData,
  cRatio: string,
  vaultEntryAmountCollateral: BN,
  amountSynthetic: BN,
  vaultEntryAmountBorrow: BN
) => {
  const amountAfterCalculation = calculateAmountCollateral(
    assetTo,
    assetFrom,
    vaultEntryAmountBorrow.sub(amountSynthetic),
    cRatio
  )
  if (amountAfterCalculation.gte(new BN(0)) && vaultEntryAmountCollateral.sub(amountAfterCalculation).gte(new BN(0))) {
    return vaultEntryAmountCollateral.sub(amountAfterCalculation)
  } else {
    return new BN(0)
  }
}
