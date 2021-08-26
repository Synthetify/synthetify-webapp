import React from 'react'
import useStyles from './style'
import { Grid, Typography, Divider, Hidden, IconButton } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'


export const Stats = () => {
  const classes = useStyles()

  return (
    <>
        <Grid container className={classes.container}>
          <h1>test</h1>
        </Grid>
    </>
  )
}

export default Stats
