import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'
import useStyles from './style'

export const Footer = () => {
  const classes = useStyles()
  const discord = require('@static/png/discord-circle.png')
  const github = require('@static/png/github-circle.png')
  const linkedin = require('@static/png/linkedin-circle.png')
  const twitter = require('@static/png/twitter-circle.png')

  return (
    <Grid container justify='flex-end' className={classes.container}>
      <Grid item>
        <CardMedia className={classes.socialMedia} image={github} />
      </Grid>
      <Grid item>
        <CardMedia className={classes.socialMedia} image={linkedin} />
      </Grid>
      <Grid item>
        <CardMedia className={classes.socialMedia} image={twitter} />
      </Grid>
      <Grid item>
        <CardMedia className={classes.socialMedia} image={discord} />
      </Grid>
    </Grid>
  )
}

export default Footer
