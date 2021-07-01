import React from 'react'
import { Grid } from '@material-ui/core'
import { WrappedExchangeComponent } from '@containers/WrappedExchangeComponent/WrappedExchangeComponent'
import useStyles from './style'

export const ExchangePage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} justify='center'>
      <Grid item className={classes.exchange}>
        <WrappedExchangeComponent />
      </Grid>
    </Grid>
  )
}
