import React from 'react'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { Grid, Typography, Divider } from '@material-ui/core'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import { BN } from '@project-serum/anchor'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { printBN, stringToMinDecimalBN } from '@consts/utils'
import { ILeverageSynthetic } from '@selectors/solanaWallet'
import { getAssetFromAndTo, getSyntheticAsCollateral } from '@consts/leverageUtils'
import { ILeveragePair } from '@reducers/leverage'
import { calculateAmountBorrow, calculateLiqPrice } from '@consts/borrowUtils'
import useStyles from './style'
import { Select } from '@components/Inputs/Select/Select'
interface IProp {
  action: string
  liquidationPriceTo: number
  liquidationPriceFrom: number
  allSynthetic: ILeverageSynthetic[]
  sending: boolean
  pairIndex: number | null
  setPairIndex: (nr: number) => void
  hasError?: boolean
  vaultAmount: { collateralAmount: Decimal; borrowAmount: Decimal }
  walletStatus: boolean
  noWalletHandler: () => void
  leveragePairs: ILeveragePair[]
  leverageIndex: number | null
  setLeverageIndex: (nr: number) => void
  currentLeverage: string
  setLiquidationPriceTo: (nr: number) => void
  setLiquidationPriceFrom: (nr: number) => void
  cRatio: string
  leverageType: string
  amountToken: BN
  setAmountToken: (value: BN) => void
  price: { collateralPrice: Decimal; syntheticPrice: Decimal }
}
export const ActionLeverage: React.FC<IProp> = ({
  action,
  liquidationPriceTo,
  liquidationPriceFrom,
  allSynthetic,
  sending,
  hasError,
  pairIndex,
  setPairIndex,
  walletStatus,
  noWalletHandler,
  leveragePairs,
  leverageIndex,
  setLeverageIndex,
  currentLeverage,
  setLiquidationPriceFrom,
  setLiquidationPriceTo,
  vaultAmount,
  cRatio,
  leverageType,
  amountToken,
  setAmountToken,
  price
}) => {
  const classes = useStyles()
  const [amountTokenString, setAmountTokenString] = React.useState('')
  const [totalExposure, setTotalExposure] = React.useState(0)
  const [tokenFrom, tokenTo] = getAssetFromAndTo(
    leverageIndex !== null ? leveragePairs[leverageIndex] : null,
    price
  )
  const [collateralToken] = getSyntheticAsCollateral(
    pairIndex !== null ? allSynthetic[pairIndex] : null
  )
  const [showOperationProgressFinale, setShowOperationProgressFinale] = React.useState(false)
  const [amountInputTouched, setAmountInputTouched] = React.useState(false)
  const [debtValue, setDebtValue] = React.useState<BN>(new BN(0))
  const [buyingValue, setBuyingValue] = React.useState<number>(0)
  React.useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
    if (!sending || hasError) {
      // reset value
    }
  }, [sending])

  React.useEffect(() => {
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }
  }, [amountTokenString])
  React.useEffect(() => {
    if (leverageIndex !== null && pairIndex !== null) {
      setDebtValue(
        calculateAmountBorrow(
          tokenTo.priceVal,
          tokenTo.assetScale,
          collateralToken.priceVal,
          collateralToken.assetScale,
          amountToken
            .mul(new BN(Number(currentLeverage) * 10 ** collateralToken.assetScale))
            .div(new BN(10 ** collateralToken.assetScale)),
          cRatio
        )
      )
      setTotalExposure(
        (+printBN(amountToken, collateralToken.assetScale) *
          +printBN(collateralToken.priceVal, 8) *
          Number(currentLeverage)) /
          +printBN(tokenFrom.priceVal, 8) +
          +printBN(vaultAmount.collateralAmount.val, vaultAmount.collateralAmount.scale)
      )
      setBuyingValue(
        Number(
          (+printBN(amountToken, collateralToken.assetScale) *
            +printBN(collateralToken.priceVal, 8) *
            (Number(currentLeverage) - 1)) /
            +printBN(tokenFrom.priceVal, 8)
        )
      )
    }
  }, [amountTokenString, cRatio, pairIndex, leverageIndex])

  React.useEffect(() => {
    if (leverageIndex !== null && pairIndex !== null) {
      setLiquidationPriceFrom(
        +calculateLiqPrice(
          tokenFrom.priceVal,
          vaultAmount.collateralAmount.val,
          tokenTo.priceVal,
          vaultAmount.borrowAmount.val,
          leveragePairs[leverageIndex].liquidationThreshold,
          tokenTo.assetScale,
          tokenFrom.assetScale
        )
      )
      const difDecimal = 10 ** (tokenFrom.assetScale - collateralToken.assetScale)
      let actualAmountCollateral
      if (difDecimal < 1) {
        actualAmountCollateral = amountToken
          .div(new BN(1 / difDecimal))
          .mul(new BN(Number(currentLeverage) * 10 ** collateralToken.assetScale))
          .div(new BN(10 ** collateralToken.assetScale))
          .mul(collateralToken.priceVal)
          .div(tokenFrom.priceVal)
      } else {
        actualAmountCollateral = amountToken
          .mul(new BN(difDecimal))
          .mul(new BN(Number(currentLeverage) * 10 ** collateralToken.assetScale))
          .div(new BN(10 ** collateralToken.assetScale))
          .mul(collateralToken.priceVal)
          .div(tokenFrom.priceVal)
      }
      setLiquidationPriceTo(
        +calculateLiqPrice(
          tokenFrom.priceVal,
          actualAmountCollateral.add(vaultAmount.collateralAmount.val),
          tokenTo.priceVal,
          debtValue.add(vaultAmount.borrowAmount.val),
          leveragePairs[leverageIndex].liquidationThreshold,
          tokenTo.assetScale,
          tokenFrom.assetScale
        )
      )
    }
  }, [debtValue])
  return (
    <Grid>
      <Grid className={classes.root}>
        <Grid className={classes.middleGrid}>
          <Grid className={classes.collateralContainer}>
            <Grid
              style={{
                width: '100%',
                flexDirection: 'row',
                display: 'flex',
                paddingRight: '24px'
              }}>
              <Grid>
                <Grid container justifyContent='space-between'>
                  <Grid container alignItems='center' style={{ width: 'auto' }}>
                    <Typography className={classes.title}>Choose your token</Typography>
                  </Grid>
                  <Typography className={classes.balance}>
                    Balance:{' '}
                    {Number(
                      printBN(collateralToken.maxAvailable, collateralToken.assetScale)
                    ).toFixed(4)}{' '}
                    {collateralToken.symbol}
                  </Typography>
                </Grid>
                <Grid className={classes.inputGrid}>
                  <ExchangeAmountInput
                    value={amountTokenString}
                    setValue={(value: string) => {
                      if (!amountInputTouched) {
                        setAmountInputTouched(true)
                      }
                      if (value.match(/^\d*\.?\d*$/)) {
                        const limitedNumber = value.includes('.')
                          ? value.substr(0, value.indexOf('.')) +
                            value.substr(value.indexOf('.'), collateralToken.assetScale + 1)
                          : value

                        const BNValue = stringToMinDecimalBN(limitedNumber)
                        const difDecimal =
                          action === 'open'
                            ? collateralToken.assetScale - BNValue.decimal
                            : tokenFrom.assetScale - BNValue.decimal
                        setAmountTokenString(limitedNumber)
                        setAmountToken(BNValue.BN.mul(new BN(10).pow(new BN(difDecimal))))
                      }
                    }}
                    placeholder={'0.0'}
                    onMaxClick={() => {}}
                    tokens={allSynthetic.map(tokens => ({
                      symbol: tokens.syntheticData.symbol,
                      balance: tokens.syntheticData.balance,
                      decimals: tokens.syntheticData.supply.scale
                    }))}
                    current={
                      pairIndex !== null
                        ? action === 'open'
                          ? collateralToken.symbol
                          : tokenTo.symbol
                        : null
                    }
                    onSelect={(chosen: number) => {
                      setPairIndex(chosen)
                    }}
                    className={classes.input}
                    selectText='Select'
                    walletConnected={walletStatus}
                    noWalletHandler={noWalletHandler}
                  />
                </Grid>
              </Grid>
              <Grid style={{ marginLeft: '24px' }}>
                <Grid container alignItems='center'>
                  <Typography className={classes.title}>Leverage token</Typography>
                </Grid>
                <Grid className={classes.selectGrid}>
                  <Select
                    className={classes.select}
                    centered={true}
                    tokens={leveragePairs.map(tokens => ({
                      symbol:
                        leverageType === 'short' ? tokens.syntheticSymbol : tokens.collateralSymbol,
                      balance:
                        leverageType === 'short'
                          ? tokens.syntheticBalance.val
                          : tokens.collateralBalance.val,
                      decimals:
                        leverageType === 'short'
                          ? tokens.syntheticBalance.scale
                          : tokens.collateralBalance.scale
                    }))}
                    onSelect={(chosen: number) => {
                      setLeverageIndex(chosen)
                    }}
                    current={
                      leverageIndex !== null ? leveragePairs[leverageIndex].syntheticSymbol : null
                    }
                    name='Select'
                    walletConnected={walletStatus}
                    noWalletHandler={noWalletHandler}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider} style={{ margin: '20px 0' }} />
          <Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>Liquidation price:</Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>
                  ${liquidationPriceFrom.toFixed(3)}
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
                  ${liquidationPriceTo.toFixed(3)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>Buying {tokenFrom.symbol}:</Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>
                  {buyingValue.toFixed(2)}
                  {tokenFrom.symbol}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>
                Total {tokenFrom.symbol} exposure:
              </Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>
                  {(+printBN(
                    vaultAmount.collateralAmount.val,
                    vaultAmount.collateralAmount.scale
                  )).toFixed(2)}{' '}
                  {tokenFrom.symbol}
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
                  {' '}
                  {totalExposure.toFixed(2)}
                  {tokenFrom.symbol}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>Vault {tokenTo.symbol} Debt:</Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>
                  {(+printBN(vaultAmount.borrowAmount.val, vaultAmount.borrowAmount.scale)).toFixed(
                    4
                  )}{' '}
                  {tokenTo.symbol}
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
                  {(+printBN(debtValue, tokenTo.assetScale)).toFixed(4)} {tokenTo.symbol}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>
                Current price {collateralToken.symbol}:
              </Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>
                  ${Number(printBN(collateralToken.priceVal, 8)).toFixed(4)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
