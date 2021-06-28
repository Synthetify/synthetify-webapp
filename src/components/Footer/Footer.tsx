import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'
import useStyles from './style'
import { social } from '@static/links'

export const Footer = () => {
  const classes = useStyles()
  const discord = require('@static/png/discord-circle.png')
  const github = require('@static/png/github-circle.png')
  const linkedin = require('@static/png/linkedin-circle.png')
  const twitter = require('@static/png/twitter-circle.png')

  return (
    <Grid container justify='flex-end' className={classes.container}>
      <Grid item>
        <CardMedia
          className={classes.socialMedia}
          image={github}
          onClick={() => window.open(social.github)}
        />
      </Grid>
      <Grid item>
        <CardMedia
          className={classes.socialMedia}
          image={linkedin}
          onClick={() => window.open(social.linkedin)}
        />
      </Grid>
      <Grid item>
        <CardMedia
          className={classes.socialMedia}
          image={twitter}
          onClick={() => window.open(social.twitter)}
        />
      </Grid>
      <Grid item>
        <CardMedia
          className={classes.socialMedia}
          image={discord}
          onClick={() => window.open(social.discord)}
        />
      </Grid>
    </Grid>
  )
}

export default Footer
