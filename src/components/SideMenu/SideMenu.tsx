import React from 'react'
import { Grid, Typography } from '@material-ui/core'
// import SynthetifyIconHorizontal from '#components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'
import { UiLocation } from '#containers/WelcomePage/WelcomePage'
import classNames from 'classnames'
import SynthetifyIconHorizontal from '#components/SynthetifyIconHorizontal/SynthetifyIconHorizontal'
import TwitterIcon from '#static/svg/twitter-ic-footer.svg'
import GithubIcon from '#static/svg/github-ic-footer.svg'
import LinkedinIcFooter from '#static/svg/linkedin-ic-footer.svg'
import DiscordIcon from '#static/svg/discord-ic-footer.svg'
import AccountWhiteIcon from '#static/svg/accWhite.svg'
import AccountColorIcon from '#static/svg/accColor.svg'
import StakeColorIcon from '#static/svg/stakeColor.svg'
import StakeWhiteIcon from '#static/svg/stakeWhite.svg'
import ExchangeWhiteIcon from '#static/svg/exchangeWhite.svg'
import ExchangeColorIcon from '#static/svg/exchangeColor.svg'
import { social } from '#static/links'

import useStyles from './style'
export interface ISideMenu {
  location: UiLocation
  setLocation: (location: UiLocation) => void
}
export const SideMenu: React.FC<ISideMenu> = ({ location, setLocation }) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.root} justify='space-between'>
      <Grid item>
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
            <Grid container alignItems='center' style={{ marginLeft: 60 }}>
              <Grid item>
                {location === UiLocation.Account ? (
                  <AccountColorIcon></AccountColorIcon>
                ) : (
                  <AccountWhiteIcon></AccountWhiteIcon>
                )}
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  className={classNames(classes.menuText, {
                    [classes.selected]: location === UiLocation.Account
                  })}>
                  Account
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Staking)
            }}>
            <Grid container alignItems='center' style={{ marginLeft: 60 }}>
              <Grid item>
                {location === UiLocation.Staking ? (
                  <StakeColorIcon></StakeColorIcon>
                ) : (
                  <StakeWhiteIcon></StakeWhiteIcon>
                )}
              </Grid>
              <Grid item>
                <Typography
                  variant='body1'
                  className={classNames(classes.menuText, {
                    [classes.selected]: location === UiLocation.Staking
                  })}>
                  Staking
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Exchange)
            }}>
            <Grid container alignItems='center' style={{ marginLeft: 60 }}>
              <Grid item>
                {location === UiLocation.Exchange ? (
                  <ExchangeColorIcon></ExchangeColorIcon>
                ) : (
                  <ExchangeWhiteIcon></ExchangeWhiteIcon>
                )}
              </Grid>
              <Grid item>
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
        </Grid>
      </Grid>
      <Grid item className={classes.socialsDiv}>
        <Grid container>
          <Grid item>
            <TwitterIcon
              className={classes.icon}
              onClick={() => window.open(social.twitter)}></TwitterIcon>
          </Grid>
          <Grid item>
            <GithubIcon
              className={classes.icon}
              style={{ marginLeft: 16 }}
              onClick={() => window.open(social.github)}></GithubIcon>
          </Grid>
          <Grid item>
            <DiscordIcon
              className={classes.icon}
              style={{ marginLeft: 16 }}
              onClick={() => window.open(social.discord)}></DiscordIcon>
          </Grid>
          <Grid item>
            <LinkedinIcFooter
              className={classes.icon}
              style={{ marginLeft: 16 }}
              onClick={() => window.open(social.linkedin)}></LinkedinIcFooter>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SideMenu
