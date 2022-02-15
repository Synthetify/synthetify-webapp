import { ILeverageSynthetic } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { ILeveragePair } from '@reducers/leverage'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { PublicKey } from '@solana/web3.js'
import { calculateAmountBorrow } from './borrowUtils'
import { printBN } from './utils'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
export const getAssetFromAndTo = (
  leveragePair: ILeveragePair | null,
  price: { collateralPrice: Decimal; syntheticPrice: Decimal }
) => {
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
    priceVal: price.collateralPrice.val,
    assetScale: leveragePair.collateralBalance.scale,
    symbol: leveragePair.collateralSymbol,
    maxAvailable: leveragePair.collateralBalance.val,
    balance: leveragePair.collateralBalance.val
  }
  const syntheticTo: AssetPriceData = {
    priceVal: price.syntheticPrice.val,
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
export const getCRatioFromLeverage = (leverage: number) => {
  return leverage > 1 ? ((100 * leverage) / (leverage - 1)).toFixed(2) : '100'
}

export const calculateAmountAfterSwap = (
  assetInPrice: BN,
  assetForPrice: BN,
  assetInScale: number,
  assetForScale: number,
  amount: BN,
  effectiveFee: Decimal
) => {
  const amountOutBeforeFee = assetInPrice.mul(amount).div(assetForPrice)
  const amountAfterFee = amountOutBeforeFee.sub(
    amountOutBeforeFee.mul(effectiveFee.val).div(new BN(10 ** effectiveFee.scale))
  )
  const decimalChange = 10 ** (assetForScale - assetInScale)

  if (decimalChange < 1) {
    return amountAfterFee.div(new BN(1 / decimalChange))
  } else {
    return amountAfterFee.mul(new BN(decimalChange))
  }
}
export interface IFeeData {
  price: BN
  publicKey: PublicKey
  assetScale: number
}
export const calculateFee = (
  collateral: IFeeData,
  tokenTo: IFeeData,
  tokenFrom: IFeeData,
  amountToken: BN,
  feeData: Decimal,
  cRatio: string,
  maxCRatio: string,
  openFee: Decimal
) => {
  let totalFee: BN = new BN(0)
  let amountTokenTmp = amountToken
  let amountCollateral: BN = amountToken
  let sumCollateralAmount: BN = amountToken
  let symulatedSumCollateral: BN = new BN(0)
  let amountSynthetic: BN = new BN(0)
  let sumAmountSynthetic: BN = new BN(0)
  let tmp = 0
  const leverage = getLeverageLevel(Number((+cRatio).toFixed(5)))
  if (collateral.publicKey.toString() !== tokenFrom.publicKey.toString()) {
    const amount = calculateAmountAfterSwap(
      collateral.price,
      tokenFrom.price,
      collateral.assetScale,
      tokenFrom.assetScale,
      amountToken,
      feeData
    )
    totalFee = totalFee.add(
      tokenFrom.price
        .mul(amountToken)
        .mul(feeData.val)
        .div(new BN(10 ** feeData.scale))
        .div(new BN(10 ** 8))
    )
    amountCollateral = amount
    amountTokenTmp = amount
    sumCollateralAmount = amount
  }

  symulatedSumCollateral = calculateAmountAfterSwap(
    tokenTo.price,
    tokenFrom.price,
    tokenTo.assetScale,
    tokenFrom.assetScale,
    calculateAmountBorrow(
      tokenTo.price,
      tokenTo.assetScale,
      tokenFrom.price,
      tokenFrom.assetScale,
      amountCollateral,
      (+maxCRatio + 2).toFixed(10)
    )
      .mul(new BN(10 ** openFee.scale))
      .div(openFee.val.add(new BN(10 ** openFee.scale))),
    feeData
  )
    .mul(new BN(Number(0.995) * 10 ** tokenFrom.assetScale))
    .div(new BN(10 ** tokenFrom.assetScale))
  while (
    amountTokenTmp
      .mul(new BN(Number(leverage) * 10 ** tokenFrom.assetScale))
      .div(new BN(10 ** tokenFrom.assetScale))
      .mul(new BN(Number(0.9995) * 10 ** tokenFrom.assetScale))
      .div(new BN(10 ** tokenFrom.assetScale))
      .gt(sumCollateralAmount.add(symulatedSumCollateral)) &&
    tmp < 3
  ) {
    amountSynthetic = calculateAmountBorrow(
      tokenTo.price,
      tokenTo.assetScale,
      tokenFrom.price,
      tokenFrom.assetScale,
      amountCollateral,
      (+maxCRatio + 2).toFixed(10)
    )
      .mul(new BN(10 ** openFee.scale))
      .div(openFee.val.add(new BN(10 ** openFee.scale)))
    totalFee = totalFee.add(
      amountSynthetic
        .mul(tokenTo.price)
        .mul(openFee.val)
        .div(new BN(10 ** (openFee.scale + 2)))
        .div(new BN(10 ** 8))
    )
    sumAmountSynthetic = sumAmountSynthetic.add(amountSynthetic)
    amountCollateral = calculateAmountAfterSwap(
      tokenTo.price,
      tokenFrom.price,
      tokenTo.assetScale,
      tokenFrom.assetScale,
      amountSynthetic,
      feeData
    )
      .mul(new BN(Number(0.995) * 10 ** tokenFrom.assetScale))
      .div(new BN(10 ** tokenFrom.assetScale))

    totalFee = totalFee.add(
      tokenFrom.price
        .mul(amountCollateral)
        .mul(feeData.val)
        .div(new BN(10 ** feeData.scale))
        .div(new BN(10 ** 8))
    )
    sumCollateralAmount = sumCollateralAmount.add(amountCollateral)
    symulatedSumCollateral = calculateAmountAfterSwap(
      tokenFrom.price,
      tokenTo.price,
      tokenFrom.assetScale,
      tokenTo.assetScale,
      calculateAmountBorrow(
        tokenTo.price,
        tokenTo.assetScale,
        tokenFrom.price,
        tokenFrom.assetScale,
        amountCollateral,
        (+maxCRatio + 2).toFixed(10)
      )
        .mul(new BN(10 ** openFee.scale))
        .div(openFee.val.add(new BN(10 ** openFee.scale))),
      feeData
    )
      .mul(new BN(Number(0.995) * 10 ** tokenFrom.assetScale))
      .div(new BN(10 ** tokenFrom.assetScale))
    tmp = tmp + 1
  }
  amountSynthetic = calculateAmountBorrow(
    tokenTo.price,
    tokenTo.assetScale,
    tokenFrom.price,
    tokenFrom.assetScale,
    amountCollateral,
    (+maxCRatio + 2).toFixed(10)
  )
    .mul(new BN(10 ** openFee.scale))
    .div(openFee.val.add(new BN(10 ** openFee.scale)))
  totalFee = totalFee.add(
    amountSynthetic
      .mul(tokenTo.price)
      .mul(openFee.val)
      .div(new BN(10 ** (openFee.scale + 2)))
      .div(new BN(10 ** 8))
  )

  amountCollateral = calculateAmountAfterSwap(
    tokenTo.price,
    tokenFrom.price,
    tokenTo.assetScale,
    tokenFrom.assetScale,
    amountSynthetic,
    feeData
  )
    .mul(new BN(Number(0.995) * 10 ** tokenFrom.assetScale))
    .div(new BN(10 ** tokenFrom.assetScale))
  totalFee = totalFee.add(
    tokenFrom.price
      .mul(amountCollateral)
      .mul(feeData.val)
      .div(new BN(10 ** feeData.scale))
      .div(new BN(10 ** 8))
  )
  return (+printBN(totalFee, 8)).toFixed(2)
}
