import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
export const SwapInfo: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container direction='column'>
      <Grid>
        <Typography>Informaction</Typography>
        <Typography>Swapline pool parameters</Typography>
      </Grid>
      <Grid container>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography className={classes.leftText}>Synthetic:</Typography>
          <Typography className={classes.rightText}>Name A</Typography>
        </Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography>Synthetic:</Typography>
          <Typography>Name A</Typography>
        </Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography>Synthetic:</Typography>
          <Typography>Name A</Typography>
        </Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography>Synthetic:</Typography>
          <Typography>Name A</Typography>
        </Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography>Synthetic:</Typography>
          <Typography>Name A</Typography>
        </Grid>
        <Grid container direction='row' justifyContent='space-between'>
          <Typography>Synthetic:</Typography>
          <Typography>Name A</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
