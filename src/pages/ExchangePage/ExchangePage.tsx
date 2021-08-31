import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { WrappedExchangeComponent } from '@containers/WrappedExchangeComponent/WrappedExchangeComponent'
import useStyles from './style'

export const ExchangePage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justifyContent='center'>
      <Grid item className={classes.exchange}>
        <Typography className={classes.title}>Swap</Typography>
        <WrappedExchangeComponent />
      </Grid>
    </Grid>
  )
}
