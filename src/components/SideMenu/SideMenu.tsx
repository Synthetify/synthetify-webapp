import React from 'react'
import { Grid, Typography } from '@material-ui/core'
// import SynthetifyIconHorizontal from '@components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'
import useStyles from './style'
import { UiLocation } from '@containers/WelcomePage/WelcomePage'
import classNames from 'classnames'
import SynthetifyIconHorizontal from '@components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'

export interface ISideMenu {
  location: UiLocation
  setLocation: (location: UiLocation) => void
}
export const SideMenu: React.FC<ISideMenu> = ({ location, setLocation }) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item className={classes.logo}>
        <SynthetifyIconHorizontal onClick={() => {}} />
      </Grid>
      <Grid item style={{ marginTop: 90 }}>
        <Grid
          item
          className={classes.menuItem}
          onClick={() => {
            setLocation(UiLocation.Account)
          }}>
          <Typography
            variant='body1'
            className={classNames(classes.menuText, {
              [classes.selected]: location === UiLocation.Account
            })}>
            Account
          </Typography>
        </Grid>
        <Grid
          item
          className={classes.menuItem}
          onClick={() => {
            setLocation(UiLocation.Staking)
          }}>
          <Typography
            variant='body1'
            className={classNames(classes.menuText, {
              [classes.selected]: location === UiLocation.Staking
            })}>
            Staking
          </Typography>
        </Grid>
        <Grid
          item
          className={classes.menuItem}
          onClick={() => {
            setLocation(UiLocation.Exchange)
          }}>
          <Typography
            variant='body1'
            className={classNames(classes.menuText, {
              [classes.selected]: location === UiLocation.Exchange
            })}>
            Exchange
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SideMenu
