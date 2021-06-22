import { Input, InputAdornment } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import classNames from 'classnames'

interface IProps {
  setValue: (value: string) => void
  currency: string
  value?: string
  error?: string | null
  className?: string
}

export const AmountInput: React.FC<IProps> = ({ setValue, currency, value, error, className }) => {
  const classes = useStyles()
  return (
    <Input
      error={!!error}
      className={classNames(classes.amountInput, className)}
      color='primary'
      type={'text'}
      value={value}
      disableUnderline={true}
      endAdornment={
        <InputAdornment position='end' className={classes.currency}>
          |&nbsp;&nbsp;{currency}
        </InputAdornment>
      }
      onChange={e => {
        setValue(e.target.value)
        value = e.target.value
      }}
    />
  )
}
export default AmountInput
