import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'

export const Footer = () => {
  const discord = require('@static/png/discord-circle.png')
  const github = require('@static/png/github-circle.png')
  const linkedin = require('@static/png/linkedin-circle.png')
  const twitter = require('@static/png/twitter-circle.png')

  return (
    <Grid container justify='flex-end'>
      <Grid item>
        <CardMedia style={{ width: 32, height: 32 }} image={github} />
      </Grid>
      <Grid item>
        <CardMedia style={{ width: 32, height: 32 }} image={linkedin} />
      </Grid>
      <Grid item>
        <CardMedia style={{ width: 32, height: 32 }} image={twitter} />
      </Grid>
      <Grid item>
        <CardMedia style={{ width: 32, height: 32 }} image={discord} />
      </Grid>
    </Grid>
  )
}

export default Footer
