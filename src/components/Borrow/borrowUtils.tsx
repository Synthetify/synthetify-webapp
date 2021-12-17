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
  syntheticPrice: BN,
  syntheticScale: number,
  collateraPrice: BN,
  collateralScale: number,
  amount: BN,
  cRatio: string
) => {
  const decimalChange = 10 ** (syntheticScale - collateralScale)
  if (decimalChange < 1) {
    return collateraPrice
      .mul(amount)
      .div(new BN(1 / decimalChange))
      .div(syntheticPrice)
      .mul(new BN(10000))
      .div(printBNtoBN((Number(cRatio) * 100).toString(), 0))
  } else {
    return collateraPrice
      .mul(amount)
      .mul(new BN(decimalChange))
      .div(syntheticPrice)
      .mul(new BN(10000))
      .div(printBNtoBN((Number(cRatio) * 100).toString(), 0))
  }
}

export const calculateCRatio = (
  syntheticPrice: BN,
  syntheticScale: number,
  collateraPrice: BN,
  collateralScale: number,
  assetToAmount: BN,
  assetFromAmount: BN
) => {
  if (assetToAmount > new BN(0)) {
    const difDecimal = 10 ** (syntheticScale - collateralScale + 4)
    if (difDecimal < 1) {
      return assetFromAmount
        .mul(collateraPrice)
        .mul(new BN(1 / (difDecimal)))
        .div(assetToAmount.mul(syntheticPrice))
    } else {
      return assetFromAmount
        .mul(collateraPrice)
        .mul(new BN((difDecimal)))
        .div(assetToAmount.mul(syntheticPrice))
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
  vaultEntryAmountBorrow: BN,
  minCRatio: string
) => {
  const amountInputAfterCalculation = calculateAmountBorrow(
    assetTo.priceVal,
    assetTo.assetScale,
    assetFrom.priceVal,
    assetFrom.assetScale,
    amountCollateral,
    cRatio
  )
  const amountVaultAfterCalculation = calculateAmountBorrow(
    assetTo.priceVal,
    assetTo.assetScale,
    assetFrom.priceVal,
    assetFrom.assetScale,
    vaultEntryAmountCollateral,
    minCRatio
  )

  if (amountVaultAfterCalculation.sub(vaultEntryAmountBorrow).gte(new BN(0))) {
    return amountInputAfterCalculation.add(amountVaultAfterCalculation.sub(vaultEntryAmountBorrow))
  } else {
    return amountInputAfterCalculation
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
  if (
    amountAfterCalculation.gte(new BN(0)) &&
    vaultEntryAmountCollateral.sub(amountAfterCalculation).gte(new BN(0))
  ) {
    return vaultEntryAmountCollateral.sub(amountAfterCalculation)
  } else {
    return new BN(0)
  }
}

export const calculateLiqAndCRatio = (
  action: string,
  priceFrom: BN,
  amountCollateral: BN,
  vaultAmountCollatera: BN,
  priceTo: BN,
  amountBorrow: BN,
  vaultAmountBorrow: BN,
  liqThreshold: Decimal,
  assetScaleTo: number,
  assetScaleFrom: number
) => {
  const ratioTo = calculateCRatio(
    priceTo,
    assetScaleTo,
    priceFrom,
    assetScaleFrom,
    action === 'borrow'
      ? amountBorrow.add(vaultAmountBorrow)
      : vaultAmountBorrow.sub(amountBorrow),

    action === 'borrow'
      ? amountCollateral.add(vaultAmountCollatera)
      : vaultAmountCollatera.sub(amountCollateral)
  )

  const ratioFrom = calculateCRatio(
    priceTo,
    assetScaleTo,
    priceFrom,
    assetScaleFrom,
    vaultAmountBorrow,
    vaultAmountCollatera
  )
  return {
    liquidationTo: Number(
      calculateLiqPrice(
        priceFrom,
        action === 'borrow'
          ? amountCollateral.add(vaultAmountCollatera)
          : vaultAmountCollatera.sub(amountCollateral),
        priceTo,
        action === 'borrow'
          ? amountBorrow.add(vaultAmountBorrow)
          : vaultAmountBorrow.sub(amountBorrow),
        liqThreshold,
        assetScaleTo,
        assetScaleFrom
      )
    ),
    liquidationFrom: Number(
      calculateLiqPrice(
        priceFrom,
        vaultAmountCollatera,
        priceTo,
        vaultAmountBorrow,
        liqThreshold,
        assetScaleTo,
        assetScaleFrom
      )
    ),
    cRatioTo: ratioTo === 'NaN' ? 'NaN' : ratioTo.lt(new BN(0)) ? 'NaN' : Math.floor(Number(printBN(ratioTo, 0)) / 100),
    cRatioFrom: ratioFrom === 'NaN' ? 'NaN' : Math.floor(Number(printBN(ratioFrom, 0)) / 100)

  }
}

export const calculateAvailableBorrowAndWithdraw = (
  assetTo: AssetPriceData,
  assetFrom: AssetPriceData,
  cRatio: string,
  vaultEntryAmountCollateral: BN,
  amountCollateral: BN,
  vaultEntryAmountBorrow: BN,
  amountBorrow: BN,
  minCRatio: string
) => {
  return {
    availableBorrow: calculateAvailableBorrow(
      assetTo,
      assetFrom,
      cRatio,
      vaultEntryAmountCollateral,
      amountCollateral,
      vaultEntryAmountBorrow,
      minCRatio
    ),
    availableWithdraw: calculateAvailableWithdraw(
      assetTo,
      assetFrom,
      cRatio,
      vaultEntryAmountCollateral,
      amountBorrow,
      vaultEntryAmountBorrow
    )
  }
}
