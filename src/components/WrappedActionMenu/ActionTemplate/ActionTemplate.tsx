import React, { useEffect, useState } from 'react'
import { Divider, Grid } from '@material-ui/core'
import AmountInputWithLabel from '@components/Input/AmountInputWithLabel'
import MaxButton from '@components/CommonButton/MaxButton'
import KeyValue from '@components/WrappedActionMenu/KeyValue/KeyValue'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { capitalizeString, printBN, stringToMinDecimalBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import useStyles from './style'

export interface IProps {
  action: string
  maxAvailable: BN
  maxDecimal: number
  onClick: () => void
}

export const ActionTemplate: React.FC<IProps> = ({ action, maxAvailable, maxDecimal, onClick }) => {
  const classes = useStyles()
  const [amountBN, setAmountBN] = useState(new BN(0))
  const [decimal, setDecimal] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [actionAvailable, setActionAvailable] = useState(false)
  const [amountInputTouched, setTAmountInputTouched] = useState(false)

  useEffect(() => {
    setActionAvailable(checkActionIsAvailable())
  }, [amountBN, decimal])

  const checkActionIsAvailable = () => {
    if (decimal > maxDecimal) {
      return false
    }
    const decimalDiff = maxDecimal - decimal
    const isLessThanMaxAmount = amountBN.mul(new BN(10).pow(new BN(decimalDiff))).lte(maxAvailable)
    return !amountBN.eqn(0) && isLessThanMaxAmount
  }

  const onMaxButtonClick = () => {
    setAmountBN(maxAvailable)
    setDecimal(maxDecimal)
    setInputValue(printBN(maxAvailable, maxDecimal))
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

  return (
    <Grid
      container
      justify='space-around'
      alignItems='flex-start'
      direction='column'
      className={classes.root}>
      <Grid container item className={classes.wrap}>
        <Grid item>
          <AmountInputWithLabel
            value={inputValue}
            setValue={onAmountInputChange}
            className={classes.amountInput}
            currency={'xUSD'}
          />
        </Grid>
        <Grid
          item
          container
          direction='row'
          justify='space-around'
          alignItems='flex-end'
          wrap='nowrap'
          className={classes.secondHalf}>
          <Grid item>
            <MaxButton style={{ marginBottom: 0 }} onClick={onMaxButtonClick} />
          </Grid>
          <Grid item>
            <Divider orientation='vertical' className={classes.divider} />
          </Grid>
          <Grid item className={classes.available}>
            <KeyValue
              keyName={`Available to ${action}`}
              value={maxAvailable}
              decimal={maxDecimal}
              unit='xUSD'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container className={classes.bottom}>
        <Grid item style={{ marginRight: 18 }}>
          <OutlinedButton
            name={capitalizeString(action)}
            disabled={!actionAvailable}
            color='secondary'
            padding='11px 40px'
            style={{ width: 160 }}
            onClick={onClick}
          />
        </Grid>
        <Grid item>
          <Progress
            state={checkAmountInputError() ? 'none' : 'failed'}
            message={checkAmountInputError() ? '' : 'incorrect value!'}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ActionTemplate
