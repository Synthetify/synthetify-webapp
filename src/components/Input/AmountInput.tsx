import { Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties } from 'react'
import classNames from 'classnames'
import useStyles from './style'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  value?: string
  error?: string | null
  className?: string
  placeholder?: string
  style?: CSSProperties
}

interface inputString {
  target: { value: string }
}

export const AmountInput: React.FC<IProps> = ({
  currency,
  value,
  setValue,
  error,
  className,
  placeholder,
  style
}) => {
  const classes = useStyles()

  const allowOnlyDigits = (e: inputString) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      setValue(e.target.value)
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
      placeholder={placeholder}
      endAdornment={
        !currency ? null : (
          <InputAdornment position='end' className={classes.currency}>
            |&nbsp;&nbsp;{currency}
          </InputAdornment>
        )
      }
      onChange={allowOnlyDigits}
    />
  )
}
export default AmountInput
