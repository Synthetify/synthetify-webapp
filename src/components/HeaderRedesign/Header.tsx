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
      <Grid container spacing={6} className={classes.root} wrap='nowrap' alignItems='center'>
        <Grid item>
          <CardMedia
            className={classes.snyLogo}
            image={snyIcon}
          />
        </Grid>
        <Grid item container spacing={1} wrap='nowrap'>
          <Grid item>
            <NavbarButton name='Staking' onClick={() => {}}/>
          </Grid>
          <Grid item>
            <NavbarButton name='Stats' onClick={() => {}}/>
          </Grid>
          <Grid item>
            <NavbarButton name='Exchange' onClick={() => {}}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default HeaderRedesign
