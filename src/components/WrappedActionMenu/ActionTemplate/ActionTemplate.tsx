import React, { useEffect, useState } from 'react'
import { Divider, Grid, Hidden, Typography, useMediaQuery } from '@material-ui/core'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { capitalizeString, printBN, stringToMinDecimalBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { MAX_U64 } from '@consts/static'
import BurnWarning from '@components/BurnWarning/BurnWarning'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { theme } from '@static/theme'
import useStyles from './style'
import { IRewardsProps } from '../RewardsTab/RewardsTab'

export type ActionType = 'mint' | 'deposit' | 'withdraw' | 'repay'
export type MaxBehavior = 'number' | 'maxU64' | 'balance'

export interface IProps {
  action: ActionType
  maxAvailable: BN
  maxDecimal: number
  onClick: (amount: BN, decimals: number) => () => void
  onBurn?: (amount: BN, decimals: number) => () => void
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
  balance?: BN
  showWarning?: boolean
  rewards?: IRewardsProps
}

export const ActionTemplate: React.FC<IProps> = ({
  action,
  maxAvailable,
  maxDecimal,
  onClick,
  currency,
  onBurn,
  sending,
  hasError,
  tokens,
  onSelectToken,
  showArrowInInput,
  walletConnected,
  noWalletHandler,
  maxBehavior = 'number',
  emptyTokensHandler,
  balance,
  showWarning = false,
  rewards
}) => {
  const classes = useStyles()

  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const [amountBN, setAmountBN] = useState(new BN(0))
  const [decimal, setDecimal] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [actionAvailable, setActionAvailable] = useState(false)
  const [amountInputTouched, setTAmountInputTouched] = useState(false)
  const [showOperationProgressFinale, setShowOperationProgressFinale] = useState(false)

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
        (maxBehavior === 'maxU64' && amountBN.eq(MAX_U64) && !maxAvailable.eqn(0)) ||
        (maxBehavior === 'balance' &&
          typeof balance !== 'undefined' &&
          amountBN.eq(balance) &&
          !maxAvailable.eqn(0)))
    )
  }

  const onMaxButtonClick = () => {
    if (maxBehavior === 'maxU64') {
      setAmountBN(MAX_U64)
      setDecimal(maxDecimal)
      setInputValue('Max')
    } else if (maxBehavior === 'balance' && typeof balance !== 'undefined') {
      setAmountBN(balance)
      setDecimal(maxDecimal)
      setInputValue('Max')
    } else {
      setAmountBN(maxAvailable)
      setDecimal(maxDecimal)
      setInputValue(printBN(maxAvailable, maxDecimal))
    }
  }

  const onAmountInputChange = (value: string) => {
    const { BN, decimal } = stringToMinDecimalBN(value)
    setAmountBN(BN)
    setDecimal(decimal)
    setInputValue(value)
    if (!amountInputTouched) {
      setTAmountInputTouched(true)
    }
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
      repay: 'Burning',
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
      repay: 'burned',
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
          setValue={onAmountInputChange}
          placeholder={'0.0'}
          current={currency}
          tokens={tokens}
          onSelect={onSelectToken}
          hideArrow={!showArrowInInput}
          walletConnected={walletConnected}
          noWalletHandler={noWalletHandler}
          emptyTokensHandler={emptyTokensHandler}
          onMaxClick={onMaxButtonClick}
        />
        <Grid
          item
          container
          direction='row'
          alignItems='flex-end'
          wrap='nowrap'
          className={classes.secondHalf}>
          <Hidden smUp>
            <OutlinedButton
              name={capitalizeString(action)}
              disabled={!actionAvailable}
              color='secondary'
              className={classes.actionButton}
              onClick={onClick(amountBN, decimal)}
              labelClassName={classes.label}
            />
          </Hidden>
          <Divider orientation='vertical' className={classes.divider} />
          <Grid item className={classes.available}>
            <KeyValue
              keyName={`Available to ${action}`}
              keyClassName={classes.textCenter}
              valueClassName={classes.textCenter}
              value={maxAvailable}
              decimal={maxDecimal}
              unit={currency}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        alignItems='center'
        wrap='nowrap'
        direction='row'
        justifyContent='flex-start'
        className={classes.bottom}
        style={getProgressState() !== 'none' && isXs ? { height: 76 } : undefined}>
        <Hidden xsDown>
          <OutlinedButton
            name={capitalizeString(action)}
            disabled={!actionAvailable}
            color='secondary'
            className={classes.actionButton}
            onClick={onClick(amountBN, decimal)}
            labelClassName={classes.label}
          />
        </Hidden>
        <Progress
          className={classes.progressMobile}
          state={getProgressState()}
          message={getProgressMessage()}
        />
      </Grid>
      {onBurn ? (
        <BurnWarning
          open={showWarning}
          burnAmount={{
            amount: amountBN,
            decimal: decimal
          }}
          onBurn={onBurn}
          burnTokenSymbol={currency}
          onCancel={onClick}
          rewards={rewards}
        />
      ) : (
        ''
      )}
    </Grid>
  )
}

export default ActionTemplate
