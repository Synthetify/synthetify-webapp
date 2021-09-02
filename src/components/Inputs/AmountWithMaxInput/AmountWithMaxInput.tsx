import { Input } from '@material-ui/core'
import React, { CSSProperties, useRef } from 'react'
import classNames from 'classnames'
import useStyles from './style'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'

interface IProps {
  setValue: (value: string) => void
  value?: string
  error?: string | null
  className?: string
  placeholder?: string
  style?: CSSProperties,
  onMaxClick: () => void
}

export const AmountInput: React.FC<IProps> = ({
  value,
  setValue,
  error,
  className,
  placeholder,
  style,
  onMaxClick
}) => {
  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const allowOnlyDigitsAndTrimUnnecessaryZeros: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || e.target.value === 'Max' || regex.test(e.target.value)) {
      const startValue = e.target.value
      const caretPosition = e.target.selectionStart

      let parsed = e.target.value
      const zerosRegex = /^0+\d+\.?\d*$/
      if (zerosRegex.test(parsed)) {
        parsed = parsed.replace(/^0+/, '')
      }

      const dotRegex = /^\.\d*$/
      if (dotRegex.test(parsed)) {
        parsed = `0${parsed}`
      }

      const diff = startValue.length - parsed.length

      setValue(parsed)
      if (caretPosition !== null && parsed !== startValue) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = Math.max(caretPosition - diff, 0)
            inputRef.current.selectionEnd = Math.max(caretPosition - diff, 0)
          }
        }, 0)
      }
    } else if (!regex.test(e.target.value)) {
      setValue('')
    }
  }

  return (
    <Input
      inputRef={inputRef}
      error={!!error}
      className={classNames(classes.amountInput, className)}
      style={style}
      type={'text'}
      value={value}
      disableUnderline={true}
      placeholder={placeholder}
      onChange={allowOnlyDigitsAndTrimUnnecessaryZeros}
      endAdornment={(
        <OutlinedButton
          name='Max'
          color='primary'
          onClick={onMaxClick}
          className={classes.maxButton}
        />
      )}
    />
  )
}
export default AmountInput
