import React from 'react'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { Grid, Typography, Divider } from '@material-ui/core'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import { BN } from '@project-serum/anchor'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { printBN, stringToMinDecimalBN } from '@consts/utils'
import { ILeverageSynthetic } from '@selectors/solanaWallet'
import { getAssetFromAndTo } from '@consts/leverageUtils'
import { Select } from '@components/Inputs/Select/Select'
import { ILeveragePair } from '@reducers/leverage'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import RedExclamationMark from '@static/svg/redExclamationMark.svg'
import ExclamationMark from '@static/svg/exclamationMark.svg'
import useStyles from './style'
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
  setLeverageIndex
}) => {
  const classes = useStyles()
  const [amountToken, setAmountToken] = React.useState<BN>(new BN(0))
  const [amountTokenString, setAmountTokenString] = React.useState('')
  const [availableBorrow, setAvailableBorrow] = React.useState(new BN(0))
  const [buyingPower, setBuyingPower] = React.useState(0)
  const [totalExposure, setTotalExposure] = React.useState(0)
  const [tokenFrom, tokenTo] = getAssetFromAndTo(
    pairIndex !== null ? allSynthetic[pairIndex] : null
  )
  // przemyśleć ra zmienna, zastapić dwoma różnymi obiektami?
  const [showOperationProgressFinale, setShowOperationProgressFinale] = React.useState(false)
  const [amountInputTouched, setAmountInputTouched] = React.useState(false)
  const [changeOnOtherSynthtic, setChangeOnOtherSynthtic] = React.useState(false)

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

  React.useEffect(() => {}, [pairIndex])

  return (
    <Grid>
      <Grid className={classes.root}>
        <Grid className={classes.middleGrid}>
          <Grid className={classes.collateralContainer}>
            <Grid style={{ width: '100%' }}>
              <Grid container justifyContent='space-between'>
                <Grid container alignItems='center' style={{ width: 'auto' }}>
                  <Typography className={classes.title}>Choose your token</Typography>
                  {changeOnOtherSynthtic ? (
                    <MobileTooltip
                      tooltipClasses={{ tooltip: classes.supplyTooltip }}
                      hint={
                        <>
                          <img src={ExclamationMark} alt='' className={classes.circleIcon} />
                          <Typography className={classes.tooltipTitle}>Max supply</Typography>
                          Your amount exceeded current supply of token. Available to trade:
                        </>
                      }
                      anchor={
                        <img
                          src={RedExclamationMark}
                          alt=''
                          className={classes.exclamationMark}
                          style={{ marginLeft: 16 }}
                        />
                      }
                    />
                  ) : null}{' '}
                </Grid>
                <Typography className={classes.balance}>
                  Balance:{' '}
                  {action === 'open'
                    ? Number(printBN(tokenFrom.maxAvailable, tokenFrom.assetScale)).toFixed(4)
                    : Number(printBN(tokenTo.maxAvailable, tokenTo.assetScale)).toFixed(4)}
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
                          value.substr(
                            value.indexOf('.'),
                            action === 'open' ? tokenFrom.assetScale + 1 : tokenTo.assetScale + 1
                          )
                        : value

                      const BNValue = stringToMinDecimalBN(limitedNumber)
                      const difDecimal =
                        action === 'open'
                          ? tokenFrom.assetScale - BNValue.decimal
                          : tokenTo.assetScale - BNValue.decimal
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
                        ? tokenFrom.symbol
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
                <Grid className={classes.selectGrid}>
                  <Select
                    className={classes.select}
                    centered={true}
                    tokens={leveragePairs.map(tokens => ({
                      symbol: tokens.syntheticSymbol,
                      balance: tokens.syntheticBalance.val,
                      decimals: tokens.syntheticBalance.scale
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
                <Typography className={classes.infoValueFrom}>${liquidationPriceFrom}</Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>${liquidationPriceTo}</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>Buying power:</Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>0.0 {tokenFrom.symbol}</Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>4.55 {tokenFrom.symbol}</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>
                Total {tokenFrom.symbol} exposure:
              </Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>0.0 {tokenFrom.symbol}</Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>4.55 {tokenFrom.symbol}</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>Vault {tokenTo.symbol} Debt:</Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}> 0.0 {tokenTo.symbol}</Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>4.55 {tokenTo.symbol}</Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent='space-between'>
              <Typography className={classes.infoTitle}>Current price:</Typography>
              <Grid className={classes.valueContainer}>
                <Typography className={classes.infoValueFrom}>
                  {action === 'open'
                    ? Number(printBN(tokenFrom.priceVal, 8)).toFixed(4)
                    : Number(printBN(tokenTo.priceVal, 8)).toFixed(4)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
