import React from 'react'
import { Button, PropTypes } from '@material-ui/core'
import classNames from 'classnames'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: () => void
  className?: string
  color?: PropTypes.Color
  disabled?: boolean
  startIcon?: JSX.Element
}
export const CommonButton: React.FC<IProps> = ({
  name,
  onClick,
  className,
  color = 'primary',
  disabled = false,
  startIcon
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classNames(className, classes.button)}
      color={color}
      variant='outlined'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
  )
}
export default CommonButton
