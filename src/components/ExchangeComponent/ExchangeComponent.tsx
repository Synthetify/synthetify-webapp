import React, { useEffect } from 'react'
import { Grid, Typography, Divider, Hidden, IconButton } from '@material-ui/core'
import useStyles from './style'
import AmountInput from '@components/Input/AmountInput'
import { PublicKey } from '@solana/web3.js'
import { Swap } from '@reducers/exchange'
import { TokensWithBalance } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import { colors } from '@static/theme'
import MaxButton from '@components/CommonButton/MaxButton'
import SelectToken from '@components/Inputs/SelectToken/SelectToken'
import { printBNtoBN, printBN } from '@consts/utils'
import { useDispatch } from 'react-redux'

export const calculateSwapOutAmount = (
  assetIn: TokensWithBalance,
  assetFor: TokensWithBalance,
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
  assetIn: TokensWithBalance,
  assetFor: TokensWithBalance,
  amount: string,
  effectiveFee: number = 300
) => {
  const amountAfterFee = printBNtoBN(amount, assetIn.decimals).add(
    printBNtoBN(amount, assetIn.decimals).mul(new BN(effectiveFee)).div(new BN(100000))
  )
  const amountOutBeforeFee = assetFor.price.mul(amountAfterFee).div(assetIn.price)

  const decimalChange = 10 ** (assetFor.decimals - assetIn.decimals)

  if (decimalChange < 1) {
    return printBN(amountOutBeforeFee.div(new BN(1 / decimalChange)), assetFor.decimals)
  } else {
    return printBN(amountOutBeforeFee.mul(new BN(decimalChange)), assetFor.decimals)
  }
}

const getButtonMessage = (
  amountFrom: string,
  tokenFrom: TokensWithBalance | null,
  amountTo: string,
  tokenTo: TokensWithBalance | null
) => {
  if (!tokenFrom) return ''
  if (!tokenTo) {
    return 'Select output token'
  }
  if (!amountTo) {
    return 'Enter value of swap'
  }
  if (printBNtoBN(amountFrom, tokenFrom.decimals).gt(tokenFrom.balance)) {
    return 'Invalid swap amount'
  }
  return 'Swap'
}

export interface IExchangeComponent {
  tokens: TokensWithBalance[]
  swapData: Swap
  onSwap: (fromToken: PublicKey, toToken: PublicKey, amount: BN) => void
}
export const ExchangeComponent: React.FC<IExchangeComponent> = ({ tokens, onSwap }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [tokenFrom, setTokenFrom] = React.useState<TokensWithBalance | null>(tokens[0] ?? null)
  const [tokenTo, setTokenTo] = React.useState<TokensWithBalance | null>(null)
  const [amountFrom, setAmountFrom] = React.useState<string>('')
  const [amountTo, setAmountTo] = React.useState<string>('')

  useEffect(() => {
    if (tokenFrom) {
      const fromIndex = tokens.findIndex(t => t.assetAddress.equals(tokenFrom?.assetAddress))
      setTokenFrom(tokens[fromIndex])
    }
    if (tokenTo) {
      const toIndex = tokens.findIndex(t => t.assetAddress.equals(tokenTo?.assetAddress))
      setTokenTo(tokens[toIndex])
    }
  }, [tokens])

  useEffect(() => {
    updateEstimatedAmount()
  }, [tokenTo, tokenFrom, dispatch])

  const updateEstimatedAmount = (amount: string | null = null) => {
    if (!!tokenFrom && !!tokenTo) {
      setAmountTo(calculateSwapOutAmount(tokenFrom, tokenTo, amount ?? amountFrom))
    }
  }
  const updateFromEstimatedAmount = (amount: string | null = null) => {
    if (!!tokenFrom && !!tokenTo) {
      setAmountFrom(calculateSwapOutAmountReversed(tokenFrom, tokenTo, amount ?? amountFrom))
    }
  }

  const tokenNames = tokens.map(token => token.symbol)

  return (
    <Grid container className={classes.root} direction='column'>
      <Grid item>
        <Typography className={classes.title}>Swap</Typography>
        <Divider className={classes.titleDivider} />
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
          <Typography className={classes.tokenComponentText}>From</Typography>
          <Typography className={classes.tokenMaxText}>{tokenFrom ? `${printBN(tokenFrom.balance, tokenFrom.decimals)} ${tokenFrom.symbol}` : ''}</Typography>
        </Grid>
        <Hidden lgUp>
          <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokenNames}
                current={tokenFrom?.symbol ?? null}
                centered={true}
                onSelect={(chosen: string) =>
                  setTokenFrom(tokens.find(t => t.symbol === chosen) ?? null)
                }
              />
            </Grid>
            <Grid item xs={6}>
              <MaxButton
                name='Set to max'
                className={classes.button}
                onClick={() => {
                  if (tokenFrom) {
                    setAmountFrom(printBN(tokenFrom.balance, tokenFrom.decimals))
                    updateEstimatedAmount(printBN(tokenFrom.balance, tokenFrom.decimals))
                  }
                }}
              />
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
          <Hidden mdDown>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokenNames}
                current={tokenFrom?.symbol ?? null}
                centered={true}
                onSelect={(chosen: string) =>
                  setTokenFrom(tokens.find(t => t.symbol === chosen) ?? null)
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
              currency={tokenFrom?.symbol ?? null}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={6}>
              <MaxButton
                name='Set&nbsp;to&nbsp;max'
                className={classes.button}
                onClick={() => {
                  if (tokenFrom) {
                    setAmountFrom(printBN(tokenFrom.balance, tokenFrom.decimals))
                    updateEstimatedAmount(printBN(tokenFrom.balance, tokenFrom.decimals))
                  }
                }}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>

      <Grid item container direction='row' justify='center'>
        <Grid item>
          <IconButton
            className={classes.swapIconSquare}
            onClick={() => {
              if (!tokenTo || !tokenFrom) return
              setTokenFrom(tokenTo)
              setTokenTo(tokenFrom)
              setTimeout(() => updateEstimatedAmount(), 0)
            }}>
            <SwapVertIcon
              style={{ fill: colors.gray.veryLight, height: 43, width: 43 }}
              className={classes.swapIcon}
            />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item container direction='column' className={classes.tokenComponent}>
        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
          <Typography className={classes.tokenComponentText}>To (Estimate)</Typography>
          <Typography className={classes.tokenMaxText}>{tokenFrom && tokenTo ? `Balance: ${calculateSwapOutAmount(tokenFrom, tokenTo, printBN(tokenFrom.balance, tokenFrom.decimals), 0)} ${tokenTo.symbol}` : ''}</Typography>
        </Grid>
        <Hidden lgUp>
          <Grid item container wrap='nowrap' justify='space-around' alignItems='center'>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokenNames}
                current={tokenTo?.symbol ?? null}
                centered={true}
                onSelect={(chosen: string) => {
                  setTokenTo(tokens.find(t => t.symbol === chosen) ?? null)
                  setTimeout(() => updateEstimatedAmount(), 0)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MaxButton
                name='Set to max'
                className={classes.button}
                onClick={() => {
                  if (tokenFrom && tokenTo) {
                    setAmountFrom(printBN(tokenFrom.balance, tokenFrom.decimals))
                    updateEstimatedAmount(printBN(tokenFrom.balance, tokenFrom.decimals))
                  }
                }}
              />{' '}
            </Grid>
          </Grid>
        </Hidden>

        <Grid item container wrap='nowrap' justify='space-between' alignItems='center'>
          <Hidden mdDown>
            <Grid item xs={6}>
              <SelectToken
                tokens={tokenNames}
                current={tokenTo?.symbol ?? null}
                centered={true}
                onSelect={(chosen: string) => {
                  setTokenTo(tokens.find(t => t.symbol === chosen) ?? null)
                  setTimeout(() => updateEstimatedAmount(), 0)
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
              currency={tokenTo?.symbol ?? null}
            />
          </Grid>
          <Hidden mdDown>
            <Grid item xs={6}>
              <MaxButton
                name='Set&nbsp;to&nbsp;max'
                className={classes.button}
                onClick={() => {
                  if (tokenFrom && tokenTo) {
                    setAmountFrom(printBN(tokenFrom.balance, tokenFrom.decimals))
                    updateEstimatedAmount(printBN(tokenFrom.balance, tokenFrom.decimals))
                  }
                }}
              />{' '}
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Grid item container className={classes.numbersField}>
        <Grid item>
          <Typography className={classes.numbersFieldTitle}>Fee</Typography>
          <Typography className={classes.numbersFieldAmount}>{'0.03'}%</Typography>
        </Grid>
        <Grid item>
          <Divider className={classes.amountDivider} orientation='vertical' />
        </Grid>
        <Grid item>
          <Typography className={classes.numbersFieldTitle}>Exchange rate</Typography>
          <Typography className={classes.numbersFieldAmount}>
            {(() => {
              if (!tokenFrom || !tokenTo) return '0.0000'
              return calculateSwapOutAmount(tokenFrom, tokenTo, '1', 0)
            })()}{' '}
            {tokenFrom?.symbol ?? 'xUSD'} {tokenTo == null ? '' : `per ${tokenTo.symbol}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <OutlinedButton
          name={getButtonMessage(amountFrom, tokenFrom, amountTo, tokenTo)}
          color='secondary'
          disabled={getButtonMessage(amountFrom, tokenFrom, amountTo, tokenTo) !== 'Swap'}
          className={classes.swapButton}
          onClick={() => {
            if (!tokenFrom || !tokenTo) return

            onSwap(
              tokenFrom.assetAddress,
              tokenTo.assetAddress,
              printBNtoBN(amountFrom, tokenFrom.decimals)
            )
          }}
        />
      </Grid>
    </Grid>
  )
}
export default ExchangeComponent
