import React, { useEffect } from 'react'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { printBNtoBN, printBN, showPrefix } from '@consts/utils'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { CardMedia, Divider, Grid, Typography, useMediaQuery } from '@material-ui/core'
import Swap from '@static/svg/swap.svg'
import Arrows from '@static/svg/swapArrows.svg'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import AnimatedNumber from '@components/AnimatedNumber'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import Output from '@static/svg/output.svg'
import ExclamationMark from '@static/svg/exclamationMark.svg'
import RedExclamationMark from '@static/svg/redExclamationMark.svg'
import { pyth } from '@static/links'
import { colors, theme } from '@static/theme'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import useStyles from '../style'
import { SwaplinePair } from '@selectors/solanaWallet'
import { SwaplineSwapType } from '@reducers/exchange'

interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}

export const getAssetInAndFor = (
  pair: SwaplinePair | null,
  swapType: SwaplineSwapType
): [AssetPriceData, AssetPriceData] => {
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
    assetScale: pair.collateralData.reserveBalance.scale,
    symbol: pair.collateralData.symbol,
    maxAvailable: pair.balance.val.sub(pair.accumulatedFee.val),
    balance: pair.collateralData.balance
  }

  const synthetic: AssetPriceData = {
    priceVal: pair.syntheticData.price.val,
    assetScale: pair.syntheticData.supply.scale,
    symbol: pair.syntheticData.symbol,
    maxAvailable: pair.syntheticData.maxSupply.val.sub(pair.syntheticData.supply.val),
    balance: pair.syntheticData.balance
  }

  return swapType === 'nativeToSynthetic' ? [collateral, synthetic] : [synthetic, collateral]
}

export const calculateSwapOutAmount = (
  assetIn: AssetPriceData,
  assetFor: AssetPriceData,
  amount: string,
  effectiveFee: Decimal
) => {
  const amountOutBeforeFee = assetIn.priceVal
    .mul(printBNtoBN(amount, assetIn.assetScale))
    .div(assetFor.priceVal)

  const amountAfterFee = amountOutBeforeFee.sub(
    amountOutBeforeFee.mul(effectiveFee.val).div(new BN(10 ** effectiveFee.scale))
  )
  const decimalChange = 10 ** (assetFor.assetScale - assetIn.assetScale)

  if (decimalChange < 1) {
    return printBN(amountAfterFee.div(new BN(1 / decimalChange)), assetFor.assetScale)
  } else {
    return printBN(amountAfterFee.mul(new BN(decimalChange)), assetFor.assetScale)
  }
}

export const calculateEstimateAmount = (
  assetIn: AssetPriceData,
  assetFor: AssetPriceData,
  amount: string
) => {
  const actualAmountOut = assetIn.priceVal
    .mul(printBNtoBN(amount, assetIn.assetScale))
    .div(assetFor.priceVal)
  const decimalChange = 10 ** (assetFor.assetScale - assetIn.assetScale)

  if (decimalChange < 1) {
    return printBN(actualAmountOut.div(new BN(1 / decimalChange)), assetFor.assetScale)
  } else {
    return printBN(actualAmountOut.mul(new BN(decimalChange)), assetFor.assetScale)
  }
}

export const calculateSwapOutAmountReversed = (
  assetIn: AssetPriceData,
  assetFor: AssetPriceData,
  amount: string,
  effectiveFee: Decimal
) => {
  const amountAfterFee = printBNtoBN(amount, assetFor.assetScale).add(
    printBNtoBN(amount, assetFor.assetScale)
      .mul(effectiveFee.val)
      .div(new BN(10 ** effectiveFee.scale))
  )
  const amountOutBeforeFee = assetFor.priceVal.mul(amountAfterFee).div(assetIn.priceVal)

  const decimalChange = 10 ** (assetFor.assetScale - assetIn.assetScale)

  if (decimalChange < 1) {
    return printBN(amountOutBeforeFee.mul(new BN(1 / decimalChange)), assetIn.assetScale)
  } else {
    return printBN(amountOutBeforeFee.div(new BN(decimalChange)), assetIn.assetScale)
  }
}

export const swapOutAmountCurrencyName = (
  reserved: boolean,
  tokenToSymbol: string | null,
  tokenFromSymbol: string | null
) => {
  const per = tokenToSymbol === null || tokenFromSymbol === null ? '' : 'per'
  const firstSymbol = tokenToSymbol === null ? '' : tokenToSymbol
  const secondSymbol = tokenFromSymbol === null ? '' : tokenFromSymbol
  return reserved
    ? `${firstSymbol} ${per} ${secondSymbol}`
    : `${secondSymbol} ${per} ${firstSymbol}`
}

export interface ISwaplineComponent {
  pairs: SwaplinePair[]
  onSwap: (collateral: PublicKey, synthetic: PublicKey, amount: BN, type: SwaplineSwapType) => void
  onSelectPair: (index: number | null) => void
}
export const SwaplineComponent: React.FC<ISwaplineComponent> = ({
  pairs,
  onSwap,
  onSelectPair
}) => {
  const classes = useStyles()

  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [swapType, setSwapType] = React.useState<SwaplineSwapType>('nativeToSynthetic')
  const [amountFrom, setAmountFrom] = React.useState<string>('0.000000')
  const [amountTo, setAmountTo] = React.useState<string>('')
  const [isReversed, setIsReversed] = React.useState<boolean>(false)

  const [rotates, setRotates] = React.useState<number>(0)

  const [tokenFrom, tokenTo] = getAssetInAndFor(
    pairIndex !== null ? pairs[pairIndex] : null,
    swapType
  )

  useEffect(() => {
    updateEstimatedAmount()
  }, [pairIndex])

  const updateEstimatedAmount = (amount: string | null = null) => {
    if (pairIndex !== null) {
      setAmountTo(
        calculateSwapOutAmount(tokenFrom, tokenTo, amount ?? amountFrom, pairs[pairIndex].fee)
      )
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (pairIndex !== null) {
      setAmountFrom(
        calculateSwapOutAmountReversed(
          tokenFrom,
          tokenTo,
          amount ?? amountFrom,
          pairs[pairIndex].fee
        )
      )
    }
  }

  const formatNumbers = (value: string) => {
    const num = Number(value)

    if (num < 10) {
      return num.toFixed(4)
    }

    if (num < 1000) {
      return num.toFixed(2)
    }

    if (num < 10000) {
      return num.toFixed(1)
    }

    if (num < 1000000) {
      return (num / 1000).toFixed(2)
    }

    return (num / 1000000).toFixed(2)
  }

  const formatExchangeRateOnXs = (value: string) => {
    const num = Number(value)

    if (num < 1) {
      return num.toFixed(5)
    }

    if (num < 10) {
      return num.toFixed(4)
    }

    if (num < 1000) {
      return num.toFixed(2)
    }

    if (num < 10000) {
      return num.toFixed(1)
    }

    return num.toFixed(0)
  }

  const getButtonMessage = () => {
    if (pairIndex === null) return 'Select a pair'

    if (amountTo.match(/^0\.0*$/)) {
      return 'Enter value of swap'
    }
    if (amountTo.match(`^\\d+\\.\\d{${tokenTo.assetScale + 1},}$`)) {
      return 'Incorrect output token amount'
    }
    if (printBNtoBN(amountFrom, tokenFrom.assetScale).gt(tokenFrom.balance)) {
      return 'Invalid swap amount'
    }
    if (
      swapType === 'nativeToSynthetic' &&
      printBNtoBN(amountFrom, tokenFrom.assetScale).gt(
        pairs[pairIndex].limit.val.sub(pairs[pairIndex].balance.val)
      )
    ) {
      return 'Collateral limit reached'
    }
    if (printBNtoBN(amountTo, tokenTo.assetScale).gt(tokenTo.maxAvailable)) {
      return (
        <>
          Max supply reached
          <MobileTooltip
            hint={
              <>
                <img src={ExclamationMark} alt='' className={classes.circleIcon} />
                <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>
                  Max supply
                </Typography>
                Your amount exceeded current supply of token. Available to trade:
                <b style={{ wordWrap: 'break-word' }}>{` ${printBN(
                  tokenTo.maxAvailable,
                  tokenTo.assetScale
                )} ${tokenTo.symbol}`}</b>
              </>
            }
            anchor={<img src={RedExclamationMark} alt='' className={classes.exclamationMark} />}
            tooltipClasses={{ tooltip: classes.supplyTooltip }}
            mobilePlacement='top-end'
            desktopPlacement='top-end'
          />
        </>
      )
    }
    return 'Swap'
  }

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item container direction='column' className={classes.tokenComponent}>
        <Grid
          item
          container
          wrap='nowrap'
          justifyContent='space-between'
          alignItems='center'
          className={classes.tokenComponentInfo}>
          <Typography className={classes.tokenComponentText}>You send</Typography>
          <Typography className={classes.tokenMaxText}>
            {pairIndex !== null ? (
              <>
                Balance:{' '}
                <AnimatedNumber
                  value={printBN(tokenFrom.balance, tokenFrom.assetScale)}
                  duration={300}
                  formatValue={formatNumbers}
                />
                {+printBN(tokenFrom.balance, tokenFrom.assetScale) >= 10000
                  ? +printBN(tokenFrom.balance, tokenFrom.assetScale) >= 1000000
                    ? 'M'
                    : 'K'
                  : ''}
                {` ${tokenFrom.symbol}`}
              </>
            ) : (
              ''
            )}
          </Typography>
        </Grid>

        <ExchangeAmountInput
          value={amountFrom}
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountFrom(value)
              updateEstimatedAmount(value)
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (pairIndex !== null) {
              setAmountFrom(printBN(tokenFrom.balance, tokenFrom.assetScale))
              updateEstimatedAmount(printBN(tokenFrom.balance, tokenFrom.assetScale))
            }
          }}
          pairs={pairs.map(pair => ({
            symbol1: pair.syntheticData.symbol,
            symbol2: pair.collateralData.symbol
          }))}
          current={pairIndex !== null ? tokenFrom.symbol : null}
          onSelect={(chosen: number) => {
            setPairIndex(chosen)
            onSelectPair(chosen)
          }}
          selectText='Select a pair'
        />
      </Grid>

      <Grid item container direction='row' justifyContent='center'>
        <div
          className={classes.swapIconSquare}
          onClick={() => {
            setRotates(rotates + 1)
            setSwapType(
              swapType === 'nativeToSynthetic' ? 'syntheticToNative' : 'nativeToSynthetic'
            )
          }}>
          <CardMedia
            className={classes.swapIcon}
            image={Swap}
            component='img'
            style={{ transform: `rotate(${rotates * 180}deg)` }}
          />
        </div>
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Grid
          item
          container
          wrap='nowrap'
          justifyContent='space-between'
          alignItems='center'
          className={classes.tokenComponentInfo}>
          <Typography className={classes.tokenComponentText}>You get</Typography>
          <Typography className={classes.tokenMaxText}>
            {pairIndex !== null ? (
              <>
                Balance:{' '}
                <AnimatedNumber
                  value={printBN(tokenTo.balance, tokenTo.assetScale)}
                  duration={300}
                  formatValue={formatNumbers}
                />
                {showPrefix(+printBN(tokenTo.balance, tokenTo.assetScale))}
                {` ${tokenTo.symbol}`}
              </>
            ) : (
              ''
            )}
          </Typography>
        </Grid>

        <ExchangeAmountInput
          value={amountTo}
          setValue={value => {
            if (value.match(/^\d*\.?\d*$/)) {
              setAmountTo(value)
              updateFromEstimatedAmount(value)
            }
          }}
          placeholder={'0.0'}
          onMaxClick={() => {
            if (pairIndex !== null) {
              setAmountFrom(printBN(tokenFrom.balance, tokenFrom.assetScale))
              updateEstimatedAmount(printBN(tokenFrom.balance, tokenFrom.assetScale))
            }
          }}
          pairs={pairs.map(pair => ({
            symbol1: pair.syntheticData.symbol,
            symbol2: pair.collateralData.symbol
          }))}
          current={pairIndex !== null ? tokenTo.symbol : null}
          onSelect={(chosen: number) => {
            setPairIndex(chosen)
            onSelectPair(chosen)
          }}
          selectText='Select a pair'
        />
      </Grid>
      <Grid container item className={classes.numbersField}>
        <Grid item className={classes.numbersFieldGrid}>
          <Typography className={classes.numbersFieldTitle}>Fee</Typography>
          <Typography className={classes.numbersFieldAmount}>
            {pairIndex !== null
              ? +printBN(pairs[pairIndex].fee.val.mul(new BN(100)), pairs[pairIndex].fee.scale)
              : 0}
            %
          </Typography>
        </Grid>

        <Divider className={classes.amountDivider} orientation='vertical' />

        <Grid className={classes.numbersFieldGrid} item>
          <Grid container item alignItems='center'>
            <Typography className={classes.numbersFieldTitle}>Exchange rate</Typography>
            <Grid item className={classes.arrowsBg}>
              <CardMedia
                className={classes.arrowsIcon}
                image={Arrows}
                component='img'
                onClick={() => {
                  setIsReversed(!isReversed)
                }}
              />
            </Grid>
          </Grid>
          <Typography className={classes.numbersFieldAmount}>
            <AnimatedNumber
              value={(() => {
                if (pairIndex === null) return '0.0000'
                const Amountvalue = isReversed
                  ? calculateEstimateAmount(tokenTo, tokenFrom, '1')
                  : calculateEstimateAmount(tokenFrom, tokenTo, '1')
                return Amountvalue
              })()}
              duration={300}
              formatValue={
                isXs ? formatExchangeRateOnXs : (value: string) => Number(value).toFixed(6)
              }
            />{' '}
            {swapOutAmountCurrencyName(isReversed, tokenTo.symbol, tokenFrom.symbol)}
          </Typography>
        </Grid>
      </Grid>

      <OutlinedButton
        name={getButtonMessage()}
        color='secondary'
        disabled={getButtonMessage() !== 'Swap'}
        className={classes.swapButton}
        onClick={() => {
          if (pairIndex === null) return

          onSwap(
            pairs[pairIndex].collateral,
            pairs[pairIndex].synthetic,
            printBNtoBN(amountFrom, tokenFrom.assetScale),
            swapType
          )
        }}
      />
    </Grid>
  )
}
export default SwaplineComponent
