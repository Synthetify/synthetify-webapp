import { Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties, useState } from 'react'
import useStyles from './style'
import classNames from 'classnames'

interface IProps {
  currency: string
  value?: string
  setValue: (value: string) => void
  error?: string | null
  className?: string
  style?: CSSProperties
}

type inputString = { target: { value: string } }

export const AmountInput: React.FC<IProps> = ({
  currency,
  value,
  setValue,
  error,
  className,
  style
}) => {
  const classes = useStyles()

  const allowOnlyDigits = (e: inputString) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      value = e.target.value
      setValue(value)
    }
  }

  return (
    <Input
      error={!!error}
      className={classNames(classes.amountInput, className)}
      style={style}
      color='primary'
      type={'text'}
      value={value}
      disableUnderline={true}
      endAdornment={
        <InputAdornment position='end' className={classes.currency}>
          |&nbsp;&nbsp;{currency}
        </InputAdornment>
      }
      onChange={allowOnlyDigits}
    />
  )
}
export default AmountInput
