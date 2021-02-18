import React from 'react'
import { Button } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  variant?: 'white' | 'black'
  className?: string
  disabled?: boolean
  startIcon?: JSX.Element
}
export const FilledButton: React.FC<IProps> = ({
  name,
  onClick,
  className,
  disabled = false,
  startIcon,
  variant = 'black'
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(
        className,
        variant === 'black' ? classes.buttonBlack : classes.buttonWhite
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
export default FilledButton
