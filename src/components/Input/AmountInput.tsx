import { Divider, Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties, useRef } from 'react'
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

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeroes: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      const startValue = e.target.value
      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const caretPosition = e.target.selectionStart
      setValue(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = caretPosition - 1
            inputRef.current.selectionEnd = caretPosition - 1
          }
        }, 0)
      }
    }
  }

  return (
    <Input
      inputRef={inputRef}
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
            <Divider orientation='vertical' className={classes.divider} />
            {currency}
          </InputAdornment>
        )
      }
      onChange={allowOnlyDigitsAndTrimUnnecessaryZeroes}
    />
  )
}
export default AmountInput
