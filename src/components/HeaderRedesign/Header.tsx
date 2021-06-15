import React from 'react'
import { Grid, CardMedia } from '@material-ui/core'
import useStyles from './style'
import snyIcon from '@static/icons/sny.png'
import NavbarButton from '@components/Navbar/Button'

export interface IHeader {
}
export const HeaderRedesign: React.FC<IHeader> = () => {
  const classes = useStyles()

  return (
    <>
      <Grid container className={classes.root} wrap='nowrap' alignItems='center'>
        <Grid item spacing={8}>
          <CardMedia
            className={classes.snyLogo}
            image={snyIcon}
          />
        </Grid>
        <Grid item>
          <NavbarButton name='Staking' onClick={() => {}}/>
          <NavbarButton name='Stats' onClick={() => {}}/>
          <NavbarButton name='Exchange' onClick={() => {}}/>
        </Grid>
      </Grid>
    </>
  )
}
export default HeaderRedesign
