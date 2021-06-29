import { Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties } from 'react'
import useStyles from './style'
import classNames from 'classnames'

interface IProps {
  setValue: (value: string) => void
  currency: string | null
  value?: string
  error?: string | null
  className?: string
  style?: CSSProperties
}

export const AmountInput: React.FC<IProps> = ({
  setValue,
  currency,
  value,
  error,
  className,
  style
}) => {
  const classes = useStyles()
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
        !currency ? null : (
          <InputAdornment position='end' className={classes.currency}>
            |&nbsp;&nbsp;{currency}
          </InputAdornment>
        )
      }
      onChange={e => {
        setValue(e.target.value)
        value = e.target.value
      }}
    />
  )
}
export default AmountInput
