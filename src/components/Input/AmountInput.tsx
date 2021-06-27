import { Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties, useState } from 'react'
import useStyles from './style'
import classNames from 'classnames'

interface IProps {
  currency: string
  initValue?: string
  error?: string | null
  className?: string
  style?: CSSProperties
}

export const AmountInput: React.FC<IProps> = ({
  currency,
  initValue = '',
  error,
  className,
  style
}) => {
  const classes = useStyles()
  const [value, setValue] = useState(initValue)

  const allowOnlyDigits = (e: { target: { value: string } }) => {
    const regex = /^[0-9\b]+$/
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
