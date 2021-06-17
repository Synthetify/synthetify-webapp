import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
}
export const HeaderButton: React.FC<IProps> = ({
  name,
  onClick,
  disabled = false
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.headerButton}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      onClick={onClick}>
      {name}
    </Button>
  )
}
export default HeaderButton
