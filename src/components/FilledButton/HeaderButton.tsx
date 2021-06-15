import React from 'react'
import { Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  dropdown?: boolean
}
export const HeaderButton: React.FC<IProps> = ({
  name,
  onClick,
  disabled = false,
  dropdown = false
}) => {
  const classes = useStyles()
  return (
    <Button
      className={dropdown ? classes.headerButton : classes.dropdownHeaderButton}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      onClick={onClick}
      endIcon={dropdown ? <ExpandMoreIcon /> : null}>
      {name}
    </Button>
  )
}
export default HeaderButton
