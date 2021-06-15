import React from 'react'
import { Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'

export interface IProps {
  name: string
  disabled?: boolean
}
export const DropdownHeaderButton: React.FC<IProps> = ({
  name,
  disabled = false
}) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.dropdownHeaderButton}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      onClick={() => {
        console.log('a')
      }}
      endIcon={<ExpandMoreIcon />}>
      {name}
    </Button>
  )
}
export default DropdownHeaderButton
