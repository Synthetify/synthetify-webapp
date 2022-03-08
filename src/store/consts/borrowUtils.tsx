import { BN } from '@project-serum/anchor'
import { printBN, printBNtoBN, stringToMinDecimalBN } from '@consts/utils'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { ActionType } from '@reducers/vault'
import { BorrowedPair } from '@components/Borrow/WrappedBorrow/WrappedBorrow'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
export const calculateAmountCollateral = (
  syntheticPrice: BN,
  syntheticScale: number,
  collateraPrice: BN,
  collateralScale: number,
  amount: BN,
  cRatio: string
) => {
  const cRatioBN = stringToMinDecimalBN(cRatio)
  const amountBeforeCalculations = syntheticPrice
    .mul(amount)
    .mul(cRatioBN.BN)
    .div(collateraPrice)
    .div(new BN(10).pow(new BN(cRatioBN.decimal + 2)))

  const decimalChange = 10 ** (syntheticScale - collateralScale)
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
  const cRatioBN = stringToMinDecimalBN(cRatio)
  const decimalChange = 10 ** (syntheticScale - collateralScale)
  if (decimalChange < 1) {
    return collateraPrice
      .mul(amount)
      .div(new BN(1 / decimalChange))
      .mul(new BN(10).pow(new BN(cRatioBN.decimal + 2)))
      .div(syntheticPrice)
      .div(cRatioBN.BN)
  } else {
    return collateraPrice
      .mul(amount)
      .mul(new BN(decimalChange))
      .mul(new BN(10).pow(new BN(cRatioBN.decimal + 2)))
      .div(syntheticPrice)
      .div(cRatioBN.BN)
  }
}

export const calculateCRatio = (
  syntheticPrice: BN,
  syntheticScale: number,
  collateralPrice: BN,
  collateralScale: number,
  assetToAmount: BN,
  assetFromAmount: BN
) => {
  if (
    Number((+printBN(assetToAmount, syntheticScale)).toFixed(syntheticScale - 2)) > 0 &&
    Number((+printBN(assetFromAmount, collateralScale)).toFixed(6)) > 0
  ) {
    const difDecimal = 10 ** (syntheticScale - collateralScale)
    if (difDecimal < 1) {
      return assetFromAmount
        .mul(collateralPrice)
        .div(new BN((1 / difDecimal) * 10 ** 4))
        .div(assetToAmount.mul(syntheticPrice).div(new BN(10 ** 8)))
    } else {
      return assetFromAmount
        .mul(collateralPrice)
        .mul(new BN(difDecimal))
        .div(assetToAmount.mul(syntheticPrice).div(new BN(10 ** 8)))
        .div(new BN(10 ** 4))
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
      8
    )
  }
  const difDecimal = 10 ** (assetScaleTo - assetScaleFrom)
  if (difDecimal < 1) {
    if (
      liqThreshold.val
        .mul(amountCollateral.div(new BN(1 / difDecimal)))
        .div(new BN(10).pow(new BN(liqThreshold.scale)))
        .eq(new BN(0))
    ) {
      return printBN(
        priceFrom.mul(liqThreshold.val).div(new BN(10).pow(new BN(liqThreshold.scale))),
        8
      )
    }

    return printBN(
      amountUSDBorrow.div(
        liqThreshold.val
          .mul(amountCollateral.div(new BN(1 / difDecimal)))
          .div(new BN(10).pow(new BN(liqThreshold.scale)))
      ),
      8
    )
  }

  if (
    liqThreshold.val
      .mul(amountCollateral.mul(new BN(difDecimal)))
      .div(new BN(10).pow(new BN(liqThreshold.scale)))
      .eq(new BN(0))
  ) {
    return printBN(
      priceFrom.mul(liqThreshold.val).div(new BN(10).pow(new BN(liqThreshold.scale))),
      8
    )
  }
  return printBN(
    amountUSDBorrow.div(
      liqThreshold.val
        .mul(amountCollateral.mul(new BN(difDecimal)))
        .div(new BN(10).pow(new BN(liqThreshold.scale)))
    ),
    8
  )
}
export const calculateLiqPriceShort = (
  priceFrom: BN,
  amountCollateral: BN,
  amountBorrow: BN,
  liqThreshold: Decimal,
  assetScaleTo: number,
  assetScaleFrom: number
) => {
  const liqPrice = priceFrom.mul(liqThreshold.val).div(new BN(10).pow(new BN(liqThreshold.scale)))

  if (amountBorrow.eq(new BN(0)) || amountCollateral.eq(new BN(0))) {
    return '0.0'
  }
  const difDecimal = 10 ** (assetScaleTo - assetScaleFrom)
  if (difDecimal < 1) {
    return printBN(
      liqPrice
        .mul(liqThreshold.val)
        .mul(amountCollateral.div(new BN(1 / difDecimal)))
        .div(new BN(10).pow(new BN(liqThreshold.scale)))
        .div(amountBorrow),
      8
    )
  }
  return printBN(
    liqPrice
      .mul(liqThreshold.val)
      .mul(amountCollateral.mul(new BN(difDecimal)))
      .div(new BN(10).pow(new BN(liqThreshold.scale)))
      .div(amountBorrow),
    8
  )
}
export const calculateAvailableBorrow = (
  assetTo: AssetPriceData,
  assetFrom: AssetPriceData,
  cRatio: string,
  vaultEntryAmountCollateral: BN,
  amountCollateral: BN,
  vaultEntryAmountBorrow: BN,
  minCRatio: string,
  openFee: string
) => {
  const openFeeBN = stringToMinDecimalBN(openFee)
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
    return amountInputAfterCalculation
      .add(amountVaultAfterCalculation.sub(vaultEntryAmountBorrow))
      .mul(new BN(10).pow(new BN(openFeeBN.decimal + 2)))
      .div(new BN(10).pow(new BN(openFeeBN.decimal + 2)).add(openFeeBN.BN))
  } else {
    return amountInputAfterCalculation
      .mul(new BN(10).pow(new BN(openFeeBN.decimal + 2)))
      .div(new BN(10).pow(new BN(openFeeBN.decimal + 2)).add(openFeeBN.BN))
  }
}

export const calculateAvailableWithdraw = (
  assetToPrice: BN,
  assetFromPrice: BN,
  assetToScale: number,
  assetFromScale: number,
  cRatio: string,
  vaultEntryAmountCollateral: BN,
  amountSynthetic: BN,
  vaultEntryAmountBorrow: BN
) => {
  const amountAfterCalculation = calculateAmountCollateral(
    assetToPrice,
    assetToScale,
    assetFromPrice,
    assetFromScale,
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
  assetScaleFrom: number,
  openFee: Decimal
) => {
  const openFeePercent = openFee.val.add(new BN(10 ** openFee.scale))
  const ratioTo = calculateCRatio(
    priceTo,
    assetScaleTo,
    priceFrom,
    assetScaleFrom,
    action === 'borrow'
      ? amountBorrow
          .mul(openFeePercent.mul(new BN(10 ** assetScaleTo)))
          .div(new BN(10 ** (assetScaleTo + openFee.scale)))
          .add(vaultAmountBorrow)
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
    cRatioTo:
      /* eslint-disable @typescript-eslint/indent */
      ratioTo === 'NaN'
        ? 'NaN'
        : ratioTo.lte(new BN(0))
        ? 'NaN'
        : Math.floor(Number(printBN(ratioTo, 0)) / 100),
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
  minCRatio: string,
  openFee: string
) => {
  return {
    availableBorrow: calculateAvailableBorrow(
      assetTo,
      assetFrom,
      cRatio,
      vaultEntryAmountCollateral,
      amountCollateral,
      vaultEntryAmountBorrow,
      minCRatio,
      openFee
    ),
    availableWithdraw: calculateAvailableWithdraw(
      assetTo.priceVal,
      assetFrom.priceVal,
      assetTo.assetScale,
      assetFrom.assetScale,
      cRatio,
      vaultEntryAmountCollateral,
      amountBorrow,
      vaultEntryAmountBorrow
    )
  }
}

export const checkActionIsAvailable = (
  pairIndex: number,
  amountCollateral: BN,
  amountBorrow: BN,
  availableFrom: BN,
  availableTo: BN,
  maxBehaviorTo: string,
  maxBehaviorFrom: string
) => {
  if (pairIndex === null) {
    return false
  }
  if (maxBehaviorFrom === 'maxU64' || maxBehaviorTo === 'maxU64') {
    return true
  }
  if (availableFrom.lt(amountCollateral)) {
    return false
  }
  if (availableTo.lt(amountBorrow)) {
    return false
  }
  return true
}

export const getProgressMessage = (
  sending: boolean,
  hasError: boolean | undefined,
  actionSubmit: ActionType,
  showOperationProgressFinale: boolean,
  nameSubmitButton: string,
  blockButton: boolean,
  amountInputTouched: boolean,
  resultStatus: string
) => {
  const actionToNoun: { [key in ActionType]: string } = {
    add: 'Adding',
    withdraw: 'Withdrawing',
    borrow: 'Borrowing',
    repay: 'Repaying',
    none: '---'
  }
  if (sending) {
    return `${actionToNoun[actionSubmit]} in progress`
  }
  const actionToPastNoun: { [key in ActionType]: string } = {
    add: 'added',
    withdraw: 'withdrawn',
    borrow: 'borrowed',
    repay: 'repaid',
    none: '---'
  }
  if (resultStatus === 'success') {
    return `Successfully ${actionToPastNoun[nameSubmitButton.toLowerCase() as ActionType]}`
  }
  if (showOperationProgressFinale && !hasError) {
    return `Successfully ${actionToPastNoun[nameSubmitButton.toLowerCase() as ActionType]}`
  }
  if (resultStatus === 'failed') {
    return `${actionToNoun[actionSubmit]} failed`
  }
  if (showOperationProgressFinale && hasError) {
    return `${actionToNoun[actionSubmit]} failed`
  }
  if (blockButton && amountInputTouched) {
    return 'Invalid value'
  }
  return 'Invalid value'
}

export const getProgressState = (
  sending: boolean,
  hasError: boolean | undefined,
  showOperationProgressFinale: boolean,
  blockButton: boolean,
  amountInputTouched: boolean,
  resultStatus: string,
  setResultStatus: (vault: string) => void
) => {
  if (sending) {
    return 'progress'
  }
  if (resultStatus === 'failed') {
    return 'failed'
  }
  if (showOperationProgressFinale && hasError) {
    setResultStatus('failed')
    setTimeout(() => {
      setResultStatus('none')
    }, 2000)
    return 'failed'
  }
  if (resultStatus === 'success') {
    return 'success'
  }
  if (showOperationProgressFinale && !hasError) {
    setResultStatus('success')
    setTimeout(() => {
      setResultStatus('none')
    }, 2000)
    return 'success'
  }
  if (blockButton && amountInputTouched) {
    return 'failed'
  }
  return 'none'
}

export const setActionOnSubmitButton = (
  action: string,
  amountCollateral: BN,
  amountBorrow: BN
): {
  actionSubmit: ActionType
  nameSubmitButton: string
} => {
  if (action === 'borrow') {
    if (!amountCollateral.isZero() && amountBorrow.isZero()) {
      return {
        actionSubmit: 'add',
        nameSubmitButton: 'add'
      }
    }
    if (amountCollateral.isZero() && !amountBorrow.isZero()) {
      return {
        actionSubmit: 'borrow',
        nameSubmitButton: 'borrow'
      }
    }
    if (!amountCollateral.isZero() && !amountBorrow.isZero()) {
      return {
        actionSubmit: 'borrow',
        nameSubmitButton: 'Add/Borrow'
      }
    }
    return {
      actionSubmit: 'add',
      nameSubmitButton: 'add'
    }
  } else {
    if (!amountCollateral.isZero() && amountBorrow.isZero()) {
      return {
        actionSubmit: 'withdraw',
        nameSubmitButton: 'Withdraw'
      }
    }
    if (amountCollateral.isZero() && !amountBorrow.isZero()) {
      return {
        actionSubmit: 'repay',
        nameSubmitButton: 'Repay'
      }
    }
    if (!amountCollateral.isZero() && !amountBorrow.isZero()) {
      return {
        actionSubmit: 'repay',
        nameSubmitButton: 'Withdraw/Repay'
      }
    }
    return {
      actionSubmit: 'withdraw',
      nameSubmitButton: 'Withdraw'
    }
  }
}

export const changeInputSynthetic = (
  value: string,
  tokenTo: AssetPriceData,
  tokenFrom: AssetPriceData,
  cRatio: string,
  openFee: string
) => {
  let amountCollBN = new BN(0)
  const BNValue = stringToMinDecimalBN(value)
  const difDecimal = tokenTo.assetScale - BNValue.decimal
  if (cRatio !== '---') {
    amountCollBN = calculateAmountCollateral(
      tokenTo.priceVal,
      tokenTo.assetScale,
      tokenFrom.priceVal,
      tokenFrom.assetScale,
      printBNtoBN(
        (Number(value) * Number(openFee)).toFixed(tokenTo.assetScale),
        tokenTo.assetScale
      ),
      cRatio
    )
  }
  return {
    amountBorBN: BNValue.BN.mul(new BN(10).pow(new BN(difDecimal))),
    amountCollString: printBN(amountCollBN, tokenFrom.assetScale),
    amountCollBN: amountCollBN
  }
}

export const changeInputCollateral = (
  value: string,
  tokenTo: AssetPriceData,
  tokenFrom: AssetPriceData,
  cRatio: string,
  openFee: string
) => {
  const openFeeBN = stringToMinDecimalBN(openFee)
  const BNValue = stringToMinDecimalBN(value === '' ? '0' : value)
  const difDecimal = tokenFrom.assetScale - BNValue.decimal
  let amountBorBN = new BN(0)

  if (cRatio !== '---') {
    amountBorBN = calculateAmountBorrow(
      tokenTo.priceVal,
      tokenTo.assetScale,
      tokenFrom.priceVal,
      tokenFrom.assetScale,
      printBNtoBN(value === '' ? '0' : value, tokenFrom.assetScale),
      cRatio
    )
      .mul(new BN(10).pow(new BN(openFeeBN.decimal + 2)))
      .div(new BN(10).pow(new BN(openFeeBN.decimal + 2)).add(openFeeBN.BN))
  }
  return {
    amountCollBN: BNValue.BN.mul(new BN(10).pow(new BN(difDecimal))),
    amountBorBNString: printBN(amountBorBN, tokenTo.assetScale),
    amountBorBN: amountBorBN
  }
}

export const getAssetFromAndTo = (
  pair: BorrowedPair | null,
  availableFrom: BN,
  availableTo: BN
) => {
  if (pair === null) {
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
    priceVal: pair.collateralData.price.val,
    assetScale: pair.collateralData.reserveBalance,
    symbol: pair.collateralData.symbol,
    maxAvailable: availableFrom,
    balance: pair.collateralData.balance
  }

  const synthetic: AssetPriceData = {
    priceVal: pair.syntheticData.price.val,
    assetScale: pair.syntheticData.supply.scale,
    symbol: pair.syntheticData.symbol,
    maxAvailable: availableTo,
    balance: pair.syntheticData.balance
  }

  return [collateral, synthetic]
}
