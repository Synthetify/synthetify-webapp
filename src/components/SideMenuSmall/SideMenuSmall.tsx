import React from 'react'
import { Grid } from '@material-ui/core'
import { UiLocation } from '#containers/WelcomePage/WelcomePage'
import TwitterIcon from '#static/svg/twitter-ic-footer.svg'
import GithubIcon from '#static/svg/github-ic-footer.svg'
import LinkedinIcFooter from '#static/svg/linkedin-ic-footer.svg'
import DiscordIcon from '#static/svg/discord-ic-footer.svg'
import { social } from '#static/links'
import AccountWhiteIcon from '#static/svg/accWhite.svg'
import AccountColorIcon from '#static/svg/accColor.svg'
import StakeColorIcon from '#static/svg/stakeColor.svg'
import StakeWhiteIcon from '#static/svg/stakeWhite.svg'
import ExchangeWhiteIcon from '#static/svg/exchangeWhite.svg'
import ExchangeColorIcon from '#static/svg/exchangeColor.svg'
import SnyIcon from '#static/icons/sny.png'

import useStyles from './style'
export interface ISideMenu {
  location: UiLocation
  setLocation: (location: UiLocation) => void
}
const SideMenuSmall: React.FC<ISideMenu> = ({ location, setLocation }) => {
  const classes = useStyles()

  return (
    <Grid container direction='column' className={classes.root} justify='space-between'>
      <Grid item>
        <Grid item className={classes.logo}>
          <img src={SnyIcon} alt='Synthetify Logo' />
        </Grid>
        <Grid item style={{ marginTop: 90 }}>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Account)
            }}>
            {location === UiLocation.Account ? (
              <AccountColorIcon></AccountColorIcon>
            ) : (
              <AccountWhiteIcon></AccountWhiteIcon>
            )}
          </Grid>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Staking)
            }}>
            {location === UiLocation.Staking ? (
              <StakeColorIcon></StakeColorIcon>
            ) : (
              <StakeWhiteIcon></StakeWhiteIcon>
            )}
          </Grid>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Exchange)
            }}>
            {location === UiLocation.Exchange ? (
              <ExchangeColorIcon></ExchangeColorIcon>
            ) : (
              <ExchangeWhiteIcon></ExchangeWhiteIcon>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.socialsDiv}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item>
            <TwitterIcon
              className={classes.icon}
              onClick={() => window.open(social.twitter)}></TwitterIcon>
          </Grid>
          <Grid item>
            <GithubIcon
              className={classes.icon}
              onClick={() => window.open(social.github)}></GithubIcon>
          </Grid>
          <Grid item>
            <DiscordIcon
              className={classes.icon}
              onClick={() => window.open(social.discord)}></DiscordIcon>
          </Grid>
          <Grid item>
            <LinkedinIcFooter
              className={classes.icon}
              onClick={() => window.open(social.linkedin)}></LinkedinIcFooter>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SideMenuSmall
