import React, { useEffect, useState } from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { capitalizeString, printBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { MAX_U64 } from '@consts/static'
import { theme } from '@static/theme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import useStyles from './style'
import classNames from 'classnames'
export type ActionType = 'mint' | 'deposit' | 'withdraw' | 'burn'
export type MaxBehavior = 'number' | 'maxU64' | 'inputOnly' | 'balance' | 'inputOnly'

export interface IProps {
  action: ActionType
  maxAvailable: BN
  maxDecimal: number
  onClick: (amount: BN, decimals: number) => () => void
  currency: string
  sending: boolean
  hasError: boolean
  tokens?: Array<{ symbol: string; balance?: BN; decimals?: number }>
  onSelectToken?: (chosen: number) => void
  showArrowInInput?: boolean
  walletConnected?: boolean
  noWalletHandler?: () => void
  maxBehavior?: MaxBehavior
  emptyTokensHandler?: () => void
}

export const ActionTemplate: React.FC<IProps> = ({
  action,
  maxAvailable,
  maxDecimal,
  onClick,
  currency,
  sending,
  hasError,
  tokens,
  maxBehavior = 'number'
}) => {
  const classes = useStyles()
  const [amountBN, setAmountBN] = useState(new BN(0))
  const [decimal, setDecimal] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [actionAvailable, setActionAvailable] = useState(false)
  const [amountInputTouched, setAmountInputTouched] = useState(false)
  const [showOperationProgressFinale, setShowOperationProgressFinale] = useState(false)
  const [tokenToIndex, setTokenToIndex] = React.useState<number | null>(null)

  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  useEffect(() => {
    setActionAvailable(checkActionIsAvailable())
  }, [amountBN, decimal, maxAvailable, maxDecimal])

  useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
  }, [sending])

  useEffect(() => {
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }
  }, [amountBN])

  useEffect(() => {
    if (maxBehavior !== 'number' && inputValue === 'Max') {
      setAmountBN(new BN(0))
      setDecimal(1)
      setInputValue(printBN(new BN(0), 1))
    }
  }, [currency])

  const checkActionIsAvailable = () => {
    if (decimal > maxDecimal) {
      return false
    }
    const decimalDiff = maxDecimal - decimal
    const isLessThanMaxAmount = amountBN.mul(new BN(10).pow(new BN(decimalDiff))).lte(maxAvailable)
    return (
      !amountBN.eqn(0) &&
      (isLessThanMaxAmount ||
        (maxBehavior === 'maxU64' && amountBN.eq(MAX_U64) && !maxAvailable.eqn(0)))
    )
  }

  const checkAmountInputError = () => {
    return !amountInputTouched || actionAvailable
  }

  const getProgressState = () => {
    if (sending) {
      return 'progress'
    }

    if (showOperationProgressFinale && hasError) {
      return 'failed'
    }

    if (showOperationProgressFinale && !hasError) {
      return 'success'
    }

    if (!checkAmountInputError()) {
      return 'failed'
    }

    return 'none'
  }

  const getProgressMessage = () => {
    const actionToNoun: { [key in ActionType]: string } = {
      mint: 'Minting',
      withdraw: 'Withdrawing',
      burn: 'Burning',
      deposit: 'Depositing'
    }

    if (sending) {
      return `${actionToNoun[action]} in progress`
    }

    if (showOperationProgressFinale && hasError) {
      return `${actionToNoun[action]} failed`
    }

    const actionToPastNoun: { [key in ActionType]: string } = {
      mint: 'minted',
      withdraw: 'withdrawn',
      burn: 'burned',
      deposit: 'deposited'
    }

    if (showOperationProgressFinale && !hasError) {
      return `Successfully ${actionToPastNoun[action]}`
    }

    if (!checkAmountInputError()) {
      return 'Incorrect value!'
    }

    return ''
  }

  return (
    <Grid container alignItems='flex-start' direction='column' className={classes.root}>
      <Typography className={classes.inputLabel}>Amount</Typography>
      <Grid container item direction='row' className={classes.wrap}>
        <ExchangeAmountInput
          value={inputValue}
          placeholder={'0.0'}
          setValue={() => {}}
          onMaxClick={() => {
            if (maxBehavior === 'maxU64') {
              setAmountBN(MAX_U64)
              setDecimal(tokens[tokenToIndex].decimals)
              setInputValue('Max')
            } else if (maxBehavior === 'inputOnly') {
              setAmountBN(tokens[tokenToIndex].balance)
              setDecimal(tokens[tokenToIndex].decimals)
              setInputValue('Max')
            } else {
              setAmountBN(tokens[tokenToIndex].balance)
              setDecimal(tokens[tokenToIndex].decimals)
              setInputValue(printBN(tokens[tokenToIndex].balance, tokens[tokenToIndex].decimals))
            }
          }}
          tokens={tokens}
          current={tokenToIndex !== null ? tokens[tokenToIndex].symbol : currency}
          onSelect={(chosen: number) => {
            setTokenToIndex(chosen)
          }}
        />
        <Grid
          item
          container
          direction='row'
          alignItems='flex-end'
          wrap='nowrap'
          className={classes.secondHalf}>
          {
            isXs &&
          <OutlinedButton
            name={capitalizeString(action)}
            disabled={!actionAvailable}
            color='secondary'
            className={classNames(classes.actionButton, classes.actionButtonXS)}
            onClick={onClick(amountBN, decimal)}
            labelClassName={classes.label}
          />
          }
          <Divider orientation='vertical' className={classes.divider} />
          <Grid item className={classes.available}>
            <KeyValue
              keyName={`Available to ${action}`}
              keyClassName={classes.textCenter}
              valueClassName={classes.textCenter}
              unit={tokenToIndex ? tokens[tokenToIndex]?.symbol : currency}
              value={tokenToIndex ? tokens[tokenToIndex]?.balance : maxAvailable}
              decimal={tokenToIndex ? tokens[tokenToIndex]?.decimals : maxDecimal}
            />
          </Grid>
        </Grid>
      </Grid>
      {
        !isXs &&
      <Grid
        item
        container
        alignItems='center'
        wrap='nowrap'
        direction='row'
        justifyContent='flex-start'
        className={classes.bottom}>
        <OutlinedButton
          name={capitalizeString(action)}
          disabled={!actionAvailable}
          color='secondary'
          className={classes.actionButton}
          onClick={onClick(amountBN, decimal)}
          labelClassName={classes.label}
        />
        <Progress state={getProgressState()} message={getProgressMessage()} />
      </Grid>
      }
    </Grid>
  )
}
export default ActionTemplate
