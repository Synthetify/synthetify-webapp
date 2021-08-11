import React, { useEffect } from 'react'
import { Grid, Typography, Divider, Hidden, IconButton } from '@material-ui/core'
import AmountInput from '@components/Input/AmountInput'
import { PublicKey } from '@solana/web3.js'
import { Swap } from '@reducers/exchange'
import { ExchangeTokensWithBalance } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { colors } from '@static/theme'
import MaxButton from '@components/MaxButton/MaxButton'
import SelectToken from '@components/Inputs/SelectToken/SelectToken'
import { printBNtoBN, printBN } from '@consts/utils'
import classNames from 'classnames'
import AnimatedNumber from '@components/AnimatedNumber'
import ExclamationMark from '@static/svg/exclamationMark.svg'
import QuestionMark from '@static/svg/questionMark.svg'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import useStyles from './style'

export const calculateSwapOutAmount = (
  assetIn: ExchangeTokensWithBalance,
  assetFor: ExchangeTokensWithBalance,
  amount: string,
  effectiveFee: number = 300
) => {
  const amountOutBeforeFee = assetIn.price
    .mul(printBNtoBN(amount, assetIn.decimals))
    .div(assetFor.price)

  const amountAfterFee = amountOutBeforeFee.sub(
    amountOutBeforeFee.mul(new BN(effectiveFee)).div(new BN(100000))
  )
  const decimalChange = 10 ** (assetFor.decimals - assetIn.decimals)

  if (decimalChange < 1) {
    return printBN(amountAfterFee.div(new BN(1 / decimalChange)), assetFor.decimals)
  } else {
    return printBN(amountAfterFee.mul(new BN(decimalChange)), assetFor.decimals)
  }
}

export const calculateSwapOutAmountReversed = (
  assetIn: ExchangeTokensWithBalance,
  assetFor: ExchangeTokensWithBalance,
  amount: string,
  effectiveFee: number = 300
) => {
  const amountAfterFee = printBNtoBN(amount, assetFor.decimals).add(
    printBNtoBN(amount, assetFor.decimals).mul(new BN(effectiveFee)).div(new BN(100000))
  )
  const amountOutBeforeFee = assetFor.price.mul(amountAfterFee).div(assetIn.price)

  const decimalChange = 10 ** (assetFor.decimals - assetIn.decimals)

  if (decimalChange < 1) {
    return printBN(amountOutBeforeFee.mul(new BN(1 / decimalChange)), assetIn.decimals)
  } else {
    return printBN(amountOutBeforeFee.div(new BN(decimalChange)), assetIn.decimals)
  }
}

const getButtonMessage = (
  amountFrom: string,
  tokenFrom: ExchangeTokensWithBalance | null,
  amountTo: string,
  tokenTo: ExchangeTokensWithBalance | null
) => {
  if (!tokenFrom) return 'Select input token'
  if (!tokenTo) {
    return 'Select output token'
  }
  if (amountTo.match(/^0\.0*$/)) {
    return 'Enter value of swap'
  }
  if (amountTo.match(`^\\d+\\.\\d{${tokenTo.decimals + 1},}$`)) {
    return 'Incorrect output token amount'
  }
  if (printBNtoBN(amountFrom, tokenFrom.decimals).gt(tokenFrom.balance)) {
    return 'Invalid swap amount'
  }
  if (tokenFrom.symbol === tokenTo.symbol) {
    return 'Choose another token'
  }
  if (printBNtoBN(amountTo, tokenTo.decimals).gt(tokenTo.maxSupply)) {
    return 'Supply insufficient to swap'
  }
  return 'Swap'
}

export interface IExchangeComponent {
  tokens: ExchangeTokensWithBalance[]
  swapData: Swap
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
  discountPercent?: number
  nextDiscountPercent?: number
  nextDiscountThreshold?: string
}
export const ExchangeComponent: React.FC<IExchangeComponent> = ({
  tokens,
  onSwap,
  discountPercent,
  nextDiscountPercent,
  nextDiscountThreshold
}) => {
  const classes = useStyles()

  const [tokenFromIndex, setTokenFromIndex] = React.useState<number | null>(tokens.length ? 0 : null)
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')

  useEffect(() => {
    updateEstimatedAmount()

    if (tokenFromIndex !== null && tokenToIndex === null) {
      setAmountFrom('0.000000')
    }
  }, [tokenToIndex, tokenFromIndex])

  const updateEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountTo(calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountFrom))
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (tokenFromIndex !== null && tokenToIndex !== null) {
      setAmountFrom(calculateSwapOutAmountReversed(tokens[tokenFromIndex], tokens[tokenToIndex], amount ?? amountFrom))
    }
  }

  return (
    <Grid container className={classes.root} direction='column'>
      <Typography className={classes.title}>Swap</Typography>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center'>
          <Typography className={classes.tokenComponentText}>From</Typography>
          <Typography className={classes.tokenMaxText}>
            {tokenFromIndex !== null
              ? (
                <>
                  Balance:{' '}
                  <AnimatedNumber
                    value={printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals)}
                    duration={300}
                    formatValue={(value: string) => Number(value).toFixed(3)}
                  />
                  {` ${tokens[tokenFromIndex].symbol}`}
                </>
              )
              : ''}
          </Typography>
        </Grid>
        <Hidden mdUp>
          <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center'>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokens}
                current={tokenFromIndex !== null ? tokens[tokenFromIndex].symbol : null}
                centered={true}
                onSelect={(chosen: string) =>
                  setTokenFromIndex(tokens.findIndex(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <MaxButton
                name='Set to max'
                className={classNames(classes.button, classes.mdDownButton)}
                onClick={() => {
                  if (tokenFromIndex !== null) {
                    setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                    updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                  }
                }}
                style={{ whiteSpace: 'nowrap' }}
              />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center'>
          <Hidden smDown>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokens}
                current={tokenFromIndex !== null ? tokens[tokenFromIndex].symbol : null}
                centered={true}
                onSelect={(chosen: string) =>
                  setTokenFromIndex(tokens.findIndex(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} style={{ padding: 10 }}>
            <AmountInput
              value={amountFrom}
              setValue={value => {
                if (value.match(/^\d*\.?\d*$/)) {
                  setAmountFrom(value)
                  updateEstimatedAmount(value)
                }
              }}
              placeholder={'0.0'}
              currency={null}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={6}>
              <MaxButton
                name='Set to max'
                className={classes.button}
                onClick={() => {
                  if (tokenFromIndex !== null) {
                    setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                    updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                  }
                }}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>

      <Grid item container direction='row' justifyContent='center'>
        <Grid item>
          <IconButton
            className={classes.swapIconSquare}
            onClick={() => {
              if (tokenToIndex === null || tokenFromIndex === null) return
              setTokenFromIndex(tokenToIndex)
              setTokenToIndex(tokenFromIndex)
            }}>
            <SwapVertIcon
              style={{ fill: colors.gray.veryLight, height: 43, width: 43 }}
              className={classes.swapIcon}
            />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center'>
          <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center' className={classes.toText}>
            <Typography className={classes.tokenComponentText}>To (Estimate)</Typography>
            {(tokenToIndex !== null) && (printBNtoBN(amountTo, tokens[tokenToIndex].decimals).gte(tokens[tokenToIndex].maxSupply))
              ? (
                <MobileTooltip
                  hint={(
                    <>
                      <span>Available to trade: </span>
                      <span>{printBN(tokens[tokenToIndex].maxSupply, tokens[tokenToIndex].decimals)} {tokens[tokenToIndex].symbol}</span>
                    </>
                  )}
                  anchor={<img src={ExclamationMark} alt='' className={classes.exclamationMark} />}
                  tooltipClassName={classNames(classes.tooltip, classes.supplyTooltip)}
                  mobilePlacement='top-end'
                  desktopPlacement='top-end'
                />
              )
              : null
            }
          </Grid>
          <Typography className={classes.tokenMaxText}>
            {tokenFromIndex !== null && tokenToIndex !== null
              ? (
                <>
                  Balance:{' '}
                  <AnimatedNumber
                    value={printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimals)}
                    duration={300}
                    formatValue={(value: string) => Number(value).toFixed(3)}
                  />
                  {` ${tokens[tokenToIndex].symbol}`}
                </>
              )
              : ''}
          </Typography>
        </Grid>
        <Hidden mdUp>
          <Grid item container wrap='nowrap' justifyContent='space-around' alignItems='center'>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokens}
                current={tokenToIndex !== null ? tokens[tokenToIndex].symbol : null}
                centered={true}
                onSelect={(chosen: string) => {
                  setTokenToIndex(tokens.findIndex(t => t.symbol === chosen) ?? null)
                  setTimeout(() => updateEstimatedAmount(), 0)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MaxButton
                name='Set to max'
                className={classNames(classes.button, classes.mdDownButton)}
                onClick={() => {
                  if (tokenFromIndex !== null && tokenToIndex !== null) {
                    setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                    updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                  }
                }}
                style={{ whiteSpace: 'nowrap' }}
              />{' '}
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container wrap='nowrap' justifyContent='space-between' alignItems='center'>
          <Hidden smDown>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokens}
                current={tokenToIndex !== null ? tokens[tokenToIndex].symbol : null}
                centered={true}
                onSelect={(chosen: string) => {
                  setTokenToIndex(tokens.findIndex(t => t.symbol === chosen) ?? null)
                  updateEstimatedAmount()
                }}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} style={{ padding: 10 }}>
            <AmountInput
              value={amountTo}
              setValue={value => {
                if (value.match(/^\d*\.?\d*$/)) {
                  setAmountTo(value)
                  updateFromEstimatedAmount(value)
                }
              }}
              placeholder={'0.0'}
              currency={null}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs={6}>
              <MaxButton
                name='Set to max'
                className={classes.button}
                onClick={() => {
                  if (tokenFromIndex !== null && tokenToIndex !== null) {
                    setAmountFrom(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                    updateEstimatedAmount(printBN(tokens[tokenFromIndex].balance, tokens[tokenFromIndex].decimals))
                  }
                }}
              />{' '}
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Grid item container className={classes.numbersField}>
        <Grid item container direction="column" className={classes.fee} style={typeof discountPercent === 'undefined' ? { width: 'fit-content' } : undefined}>
          <Grid item container justifyContent="space-between" style={{ width: 'auto' }}>
            <Typography className={classes.numbersFieldTitle}>Fee</Typography>
            {typeof nextDiscountPercent !== 'undefined' && (
              <MobileTooltip
                hint={(
                  <>
                    Deposit <b>{nextDiscountThreshold} SNY</b> to get <b>{nextDiscountPercent}%</b> discount.
                  </>
                )}
                anchor={<img src={QuestionMark} alt='' className={classes.questionMark} />}
                tooltipClassName={classNames(classes.tooltip, classes.feeTooltip)}
                mobilePlacement='top-start'
                desktopPlacement='top-end'
              />
            )}
          </Grid>

          <Grid item container justifyContent="space-between">
            <Typography className={classes.numbersFieldAmount}>{'0.3'}%</Typography>
            {typeof discountPercent !== 'undefined' && (
              <Typography
                className={classes.discount}
                style={{
                  color: discountPercent === 0
                    ? colors.navy.grey
                    : colors.green.main
                }}
              >
              ({discountPercent}%)
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Divider className={classes.amountDivider} orientation='vertical' />
        </Grid>
        <Grid item>
          <Typography className={classes.numbersFieldTitle}>Exchange rate</Typography>
          <Typography className={classes.numbersFieldAmount}>
            <AnimatedNumber
              value={(() => {
                if (tokenFromIndex === null || tokenToIndex === null) return '0.0000'
                return calculateSwapOutAmount(tokens[tokenFromIndex], tokens[tokenToIndex], '1', 300)
              })()}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(6)}
            />
            {' '}{tokenToIndex === null ? '' : `${tokens[tokenToIndex].symbol} per `}{tokenFromIndex !== null ? tokens[tokenFromIndex].symbol : 'xUSD'}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <OutlinedButton
          name={getButtonMessage(amountFrom, tokenFromIndex !== null ? tokens[tokenFromIndex] : null, amountTo, tokenToIndex !== null ? tokens[tokenToIndex] : null)}
          color='secondary'
          disabled={getButtonMessage(amountFrom, tokenFromIndex !== null ? tokens[tokenFromIndex] : null, amountTo, tokenToIndex !== null ? tokens[tokenToIndex] : null) !== 'Swap'}
          className={classes.swapButton}
          onClick={() => {
            if (tokenFromIndex === null || tokenToIndex === null) return

            onSwap(
              tokens[tokenFromIndex].assetAddress,
              tokens[tokenToIndex].assetAddress,
              printBNtoBN(amountFrom, tokens[tokenFromIndex].decimals)
            )
          }}
        />
      </Grid>
    </Grid>
  )
}
export default ExchangeComponent
