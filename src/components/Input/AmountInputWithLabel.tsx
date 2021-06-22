import React from 'react'
import { Typography } from '@material-ui/core'

import useStyles from './style'
import AmountInput from './AmountInput'

interface IProps {
  setValue: (value: string) => void
  currency: string
  label?: string
  value?: string
  error?: string | null
  className?: string
}

export const AmountInputWithLabel: React.FC<IProps> = ({
  setValue,
  currency,
  label = 'Amount',
  value,
  error,
  className
}) => {
  const classes = useStyles()
  return (
    <div>
      <Typography>
        <label className={classes.inputLabel}>{label}</label>
      </Typography>
      <AmountInput
        setValue={setValue}
        currency={currency}
        value={value}
        error={error}
        className={className}
      />
    </div>
  )
}
export default AmountInputWithLabel
