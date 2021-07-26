import React, { CSSProperties } from 'react'
import { Typography } from '@material-ui/core'
import AmountInput from './AmountInput'
import useStyles from './style'
import { BN } from '@project-serum/anchor'

interface IProps {
  currency: string
  label?: string
  value?: string
  setValue: (value: string) => void
  error?: string | null
  className?: string
  placeholder?: string
  style?: CSSProperties
  tokens?: Array<{ symbol: string, balance?: BN, decimals?: number }>
  onSelectToken?: (chosen: string) => void
  showArrow?: boolean
}

export const AmountInputWithLabel: React.FC<IProps> = props => {
  const classes = useStyles()
  const label = props.label || 'Amount'

  return (
    <div className={classes.root}>
      <Typography>
        <label className={classes.inputLabel}>{label}</label>
      </Typography>
      <AmountInput {...props} />
    </div>
  )
}
export default AmountInputWithLabel
