import React from 'react'
import classNames from 'classnames'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import useStyles from './style'

export interface IProps {
  name?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  style?: React.CSSProperties
  startIcon?: JSX.Element
}
export const MaxButton: React.FC<IProps> = ({
  name = 'Max',
  onClick,
  className,
  disabled = false,
  style,
  startIcon
}) => {
  const classes = useStyles()
  return (
    <OutlinedButton
      name={name}
      color='primary'
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      style={style}
      className={classNames(classes.maxButton, className)}
    />
  )
}
export default MaxButton
