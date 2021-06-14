import { TextField } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

export interface IProps {
  name?: string
  disabled?: boolean
}
export const AmountInput: React.FC<IProps> = ({
  name = 'Amount',
  disabled = false
}) => {
  const classes = useStyles()
  return (
    <TextField />
  )
}
export default AmountInput
