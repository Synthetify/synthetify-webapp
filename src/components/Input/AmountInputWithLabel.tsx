import React, { CSSProperties } from 'react'
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
  style?: CSSProperties
}

export const AmountInputWithLabel: React.FC<IProps> = ({
  setValue,
  currency,
  label = 'Amount',
  value,
  error,
  className,
  style
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
        style={style}
      />
    </div>
  )
}
export default AmountInputWithLabel
