import React from 'react'
import { Grid } from '@material-ui/core'
import { UiLocation } from '@containers/WelcomePage/WelcomePage'
import { ReactComponent as TwitterIcon } from '@static/svg/twitter-ic-footer.svg'
import { ReactComponent as GithubIcon } from '@static/svg/github-ic-footer.svg'
import { ReactComponent as LinkedinIcFooter } from '@static/svg/linkedin-ic-footer.svg'
import { ReactComponent as DiscordIcon } from '@static/svg/discord-ic-footer.svg'
import { social } from '@static/links'
import { ReactComponent as AccountWhiteIcon } from '@static/svg/accWhite.svg'
import { ReactComponent as AccountColorIcon } from '@static/svg/accColor.svg'
import { ReactComponent as StakeColorIcon } from '@static/svg/stakeColor.svg'
import { ReactComponent as StakeWhiteIcon } from '@static/svg/stakeWhite.svg'
import { ReactComponent as ExchangeWhiteIcon } from '@static/svg/exchangeWhite.svg'
import { ReactComponent as ExchangeColorIcon } from '@static/svg/exchangeColor.svg'
import SnyIcon from '@static/icons/sny.png'

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
export default SideMenu
