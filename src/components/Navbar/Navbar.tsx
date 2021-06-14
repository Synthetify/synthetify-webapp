import React from 'react'
import useStyles from './style'
import NavbarButton from './Button'
import { Grid } from '@material-ui/core'

export interface IProps {
  variant?: string
}
export const Navbar: React.FC<IProps> = ({
  variant
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <NavbarButton name ='Staking'/>
      <NavbarButton name ='Stats'/>
      <NavbarButton name ='Exchange'/>
    </Grid>
  )
}
export default Navbar
