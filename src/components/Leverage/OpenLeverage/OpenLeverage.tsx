import React from 'react'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { Grid, Typography, Divider } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { printBN, stringToMinDecimalBN } from '@consts/utils'
import { ILeverageSynthetic } from '@selectors/solanaWallet'
import { getAssetFromAndTo, getSyntheticAsCollateral } from '@consts/leverageUtils'
import { ILeveragePair } from '@reducers/leverage'
import { calculateAmountBorrow, calculateLiqPrice } from '@consts/borrowUtils'
import { Select } from '@components/Inputs/Select/Select'
import { descrpitionForSymbol } from '@consts/static'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import RedExclamationMark from '@static/svg/redExclamationMark.svg'
import useStyles from './style'
interface IProp {
  action: string
  liquidationPriceTo: number
  allSynthetic: ILeverageSynthetic[]
  pairIndex: number | null
  setPairIndex: (num: number) => void
  vaultAmount: { collateralAmount: Decimal; borrowAmount: Decimal }
  walletStatus: boolean
  noWalletHandler: (warningMessage: string) => void
  leveragePairs: ILeveragePair[]
  leverageIndex: number | null
  setLeverageIndex: (num: number) => void
  currentLeverage: string
  setLiquidationPriceTo: (num: number) => void
  cRatio: string
  leverageType: string
  amountToken: BN
  setAmountToken: (value: BN) => void
  price: { collateralPrice: Decimal; syntheticPrice: Decimal }
  buyingValue: number
  setBuyingValue: (num: number) => void
}
export const OpenLeverage: React.FC<IProp> = ({
  action,
  liquidationPriceTo,
  allSynthetic,
  pairIndex,
  setPairIndex,
  walletStatus,
  noWalletHandler,
  leveragePairs,
  leverageIndex,
  setLeverageIndex,
  currentLeverage,
  setLiquidationPriceTo,
  vaultAmount,
  cRatio,
  leverageType,
  amountToken,
  setAmountToken,
  price,
  buyingValue,
  setBuyingValue
}) => {
  const classes = useStyles()
  const [amountTokenString, setAmountTokenString] = React.useState<string>('')
  const [totalExposure, setTotalExposure] = React.useState<number>(0)
  const [tokenFrom, tokenTo] = getAssetFromAndTo(
    leverageIndex !== null ? leveragePairs[leverageIndex] : null,
    price
  )
  const [collateralToken] = getSyntheticAsCollateral(
    pairIndex !== null ? allSynthetic[pairIndex] : null
  )
  const [amountInputTouched, setAmountInputTouched] = React.useState<boolean>(false)
  const [debtValue, setDebtValue] = React.useState<BN>(new BN(0))

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
          +printBN(tokenFrom.priceVal, 8)
      )
      setBuyingValue(
        Number(
          (+printBN(amountToken, collateralToken.assetScale) *
            +printBN(collateralToken.priceVal, 8) *
            (Number(currentLeverage) - 1)) /
            +printBN(tokenFrom.priceVal, 8)
        )
      )
    } else {
      setBuyingValue(0)
      setDebtValue(new BN(0))
      setTotalExposure(0)
      if (amountToken.eq(new BN(0))) {
        setAmountTokenString('')
      }
    }
  }, [
    amountToken.toString(),
    cRatio,
    pairIndex,
    leverageIndex,
    amountInputTouched,
    vaultAmount.collateralAmount.val.toString()
  ])

  React.useEffect(() => {
    if (leverageIndex !== null && pairIndex !== null) {
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
          actualAmountCollateral,
          tokenTo.priceVal,
          debtValue,
          leveragePairs[leverageIndex].liquidationThreshold,
          tokenTo.assetScale,
          tokenFrom.assetScale
        )
      )
    }
  }, [debtValue.toString()])
  return (
    <Grid>
      <Grid className={classes.root}>
        <Grid>
          <Grid className={classes.middleGrid}>
            <Grid className={classes.collateralContainer}>
              <Grid
                style={{
                  width: '100%',
                  flexDirection: 'column',
                  display: 'flex'
                }}>
                <Grid>
                  <Grid container justifyContent='space-between'>
                    <Grid container item alignItems='flex-end' style={{ width: 'auto' }}>
                      <Typography className={classes.title}>Choose your token</Typography>
                      {collateralToken.symbol !== tokenFrom.symbol ? (
                        <MobileTooltip
                          hint={
                            <Grid style={{ padding: 7 }}>
                              We are going to swap {collateralToken.symbol} for {tokenFrom.symbol}{' '}
                              from the existing pair, becouse this pair does not exist.
                            </Grid>
                          }
                          anchor={
                            <img
                              src={RedExclamationMark}
                              alt=''
                              className={classes.exclamationMark}
                            />
                          }
                          mobilePlacement='top-end'
                          desktopPlacement='top-end'
                          tooltipClasses={{ tooltip: classes.tootlipMain }}
                        />
                      ) : null}
                    </Grid>
                    <Grid container alignItems='center' style={{ width: 'auto' }}>
                      <Typography className={classes.balance}>
                        Balance:{' '}
                        {Number(
                          printBN(collateralToken.maxAvailable, collateralToken.assetScale)
                        ).toFixed(4)}{' '}
                        {collateralToken.symbol}
                      </Typography>
                    </Grid>
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
                      onMaxClick={() => {
                        setAmountTokenString(
                          printBN(collateralToken.balance, collateralToken.assetScale)
                        )
                        setAmountToken(collateralToken.balance)
                      }}
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
                      noWalletHandler={() => {
                        noWalletHandler('Connect your wallet first')
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <Grid container alignItems='center'>
                    <Typography className={classes.title}>Leverage token</Typography>
                  </Grid>
                  <Grid className={classes.selectGrid}>
                    <Select
                      className={classes.select}
                      centered={true}
                      tokens={leveragePairs.map(tokens => ({
                        symbol:
                          leverageType === 'short'
                            ? tokens.syntheticSymbol
                            : tokens.collateralSymbol,
                        type: tokens.vaultType
                      }))}
                      onSelect={(chosen: number) => {
                        setLeverageIndex(chosen)
                      }}
                      current={
                        leverageIndex !== null
                          ? leverageType === 'short'
                            ? leveragePairs[leverageIndex].syntheticSymbol
                            : leveragePairs[leverageIndex].collateralSymbol
                          : null
                      }
                      name='Select'
                      walletConnected={walletStatus}
                      noWalletHandler={() => {
                        noWalletHandler('Connect your wallet first')
                      }}
                    />
                    <Grid container alignItems='center'>
                      {leverageIndex !== null ? (
                        <Grid container>
                          <Typography className={classes.tokenName}>
                            {descrpitionForSymbol[
                              leverageType === 'short'
                                ? leveragePairs[leverageIndex].syntheticSymbol
                                : leveragePairs[leverageIndex].collateralSymbol
                            ]
                              .split(' ')
                              .slice(1)}
                          </Typography>
                          <Typography className={classes.syntheticWord}>
                            (
                            {
                              descrpitionForSymbol[
                                leverageType === 'short'
                                  ? leveragePairs[leverageIndex].syntheticSymbol
                                  : leveragePairs[leverageIndex].collateralSymbol
                              ].split(' ')[0]
                            }
                            )
                          </Typography>
                        </Grid>
                      ) : (
                        <Typography className={classes.tokenName}>Select token</Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid className={classes.bottomGrid}>
            <Grid style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Grid className={classes.infoGrid}>
                <Typography className={classes.infoTitle}>
                  Current price {collateralToken.symbol}:
                </Typography>
                <Grid className={classes.valueContainer}>
                  <Typography className={classes.infoValueTo}>
                    ${Number(printBN(collateralToken.priceVal, 8)).toFixed(4)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.infoGrid}>
                <Typography className={classes.infoTitle}>Liquidation price:</Typography>
                <Grid className={classes.valueContainer}>
                  <Typography className={classes.infoValueTo}>
                    ${liquidationPriceTo.toFixed(3)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.infoGrid}>
                <Typography className={classes.infoTitle}>Buying {tokenFrom.symbol}:</Typography>
                <Grid className={classes.valueContainer}>
                  <Typography className={classes.infoValueTo}>
                    {buyingValue.toFixed(2)} {tokenFrom.symbol}
                  </Typography>
                </Grid>
              </Grid>
              <Grid className={classes.infoGrid}>
                <Typography className={classes.infoTitle}>
                  Total {tokenFrom.symbol} exposure:
                </Typography>
                <Grid className={classes.valueContainer}>
                  <Typography className={classes.infoValueTo}>
                    {' '}
                    {totalExposure.toFixed(2)} {tokenFrom.symbol}
                  </Typography>
                </Grid>
              </Grid>

              <Grid className={classes.infoGrid}>
                <Typography className={classes.infoTitle}>Vault {tokenTo.symbol} Debt:</Typography>
                <Grid className={classes.valueContainer}>
                  <Typography className={classes.infoValueTo}>
                    ~{(+printBN(debtValue, tokenTo.assetScale)).toFixed(tokenTo.assetScale)}{' '}
                    {tokenTo.symbol}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
