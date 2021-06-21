import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  disabled?: boolean
  startIcon?: JSX.Element
}
export const NavbarButton: React.FC<IProps> = ({
  name,
  onClick,
  className,
  disabled = false,
  startIcon
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(
        className,
        classes.button
      )}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}
export default NavbarButton
