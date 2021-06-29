import { Input, InputAdornment } from '@material-ui/core'
import React, { CSSProperties, useEffect } from 'react'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import useStyles from './style'

type FormInputs = {
  amount: string
}

interface IProps {
  currency: string
  value?: string
  setValue: (value: string) => void
  error?: string | null
  className?: string
  style?: CSSProperties
}

type inputString = { target: { value: string } }

export const AmountInput: React.FC<IProps> = ({
  currency,
  value,
  setValue,
  error,
  className,
  style
}) => {
  const classes = useStyles()
  const { register, formState } = useForm<FormInputs>()

  useEffect(() => {
    console.log(formState)
  }, [formState])

  const allowOnlyDigits = (e: inputString) => {
    const regex = /^\d*\.?\d*$/
    if (e.target.value === '' || regex.test(e.target.value)) {
      setValue(e.target.value)
    }
  }

  return (
    <form>
      <Input
        {...register('amount')}
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
    </form>
  )
}
export default AmountInput
