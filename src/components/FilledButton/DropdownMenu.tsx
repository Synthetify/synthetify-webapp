import React from 'react'
import useStyles from './style'

export interface IProps {
  name: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export const DropdownMenu: React.FC<IProps> = ({ name, onClick }) => {
  const classes = useStyles()
  return <div className={classes.dropdownMenu}> {name} </div>
}
export default DropdownMenu
