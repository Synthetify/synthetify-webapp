import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import { social } from '@static/links'
import linkedin from '@static/svg/linkedin-circle.svg'
import github from '@static/svg/github-circle.svg'
import discord from '@static/svg/discord-circle.svg'
import twitter from '@static/svg/twitter-circle.svg'

export const Footer = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item>
        <img
          src={github}
          alt={'github'}
          className={classes.socialMedia}
          onClick={() => window.open(social.github)}
        />
      </Grid>
      <Grid item>
        <img
          src={linkedin}
          alt={'linkedin'}
          className={classes.socialMedia}
          onClick={() => window.open(social.linkedin)}
        />
      </Grid>
      <Grid item>
        <img
          src={twitter}
          alt={'twitter'}
          className={classes.socialMedia}
          onClick={() => window.open(social.twitter)}
        />
      </Grid>
      <Grid item>
        <img
          src={discord}
          alt={'discord'}
          className={classes.socialMedia}
          onClick={() => window.open(social.discord)}
        />
      </Grid>
    </Grid>
  )
}

export default Footer
