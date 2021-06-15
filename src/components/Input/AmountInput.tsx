import { Input, InputAdornment } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

interface IProps {
  setValue: (value: string) => void
  value?: string
  label?: string
  error?: string | null
}

export const AmountInput: React.FC<IProps> = ({
  setValue,
  value,
  label,
  error
}) => {
  const classes = useStyles()
  return (
    <Input
      error={!!error}
      className={classes.amountInput}
      color='primary'
      type={'text'}
      value={value}
      endAdornment={<InputAdornment>| xUSD</InputAdornment>}
      onChange={e => {
        setValue(e.target.value)
        value = e.target.value
      }}
    />
  )
}
export default AmountInput
