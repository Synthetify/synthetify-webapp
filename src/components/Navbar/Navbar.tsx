import React from 'react'
import useStyles from './style'
import NavbarButton from './Button'
import { Grid } from '@material-ui/core'

export interface IProps {
  current?: string
}
export const Navbar: React.FC<IProps> = ({
  current
}) => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item>
        <NavbarButton name ='Staking'/>
      </Grid>
      <Grid item>
        <NavbarButton name ='Stats'/>
      </Grid>
      <Grid item>
        <NavbarButton name ='Exchange'/>
      </Grid>
    </Grid>
  )
}
export default Navbar
