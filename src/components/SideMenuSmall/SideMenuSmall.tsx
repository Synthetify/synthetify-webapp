import React from 'react'
import { Grid } from '@material-ui/core'
import { UiLocation } from '@containers/WelcomePage/WelcomePage'
import TwitterIcon from '@static/svg/twitter-ic-footer.svg'
import GithubIcon from '@static/svg/github-ic-footer.svg'
import LinkedinIcFooter from '@static/svg/linkedin-ic-footer.svg'
import DiscordIcon from '@static/svg/discord-ic-footer.svg'
import AccountWhiteIcon from '@static/svg/accWhite.svg'
import AccountColorIcon from '@static/svg/accColor.svg'
import StakeColorIcon from '@static/svg/stakeColor.svg'
import StakeWhiteIcon from '@static/svg/stakeWhite.svg'
import ExchangeWhiteIcon from '@static/svg/exchangeWhite.svg'
import ExchangeColorIcon from '@static/svg/exchangeColor.svg'

import { social } from '@static/links'

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
              <img src={AccountColorIcon} alt="" />
            ) : (
              <img src={AccountWhiteIcon} alt="" />
            )}
          </Grid>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Staking)
            }}>
            {location === UiLocation.Staking ? (
              <img src={StakeColorIcon} alt="" />
            ) : (
              <img src={StakeWhiteIcon} alt="" />
            )}
          </Grid>
          <Grid
            item
            className={classes.menuItem}
            onClick={() => {
              setLocation(UiLocation.Exchange)
            }}>
            {location === UiLocation.Exchange ? (
              <img src={ExchangeColorIcon} alt="" />
            ) : (
              <img src={ExchangeWhiteIcon} alt="" />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.socialsDiv}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item>
            <img src={TwitterIcon} className={classes.icon} onClick={() => window.open(social.twitter)} alt="" />
          </Grid>
          <Grid item>
            <img src={GithubIcon} className={classes.icon} onClick={() => window.open(social.github)} alt="" />
          </Grid>
          <Grid item>
            <img src={DiscordIcon} className={classes.icon} onClick={() => window.open(social.discord)} alt="" />
          </Grid>
          <Grid item>
            <img src={LinkedinIcFooter} className={classes.icon} onClick={() => window.open(social.linkedin)} alt="" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default SideMenu
