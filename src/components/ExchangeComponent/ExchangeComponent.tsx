import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'

export const ExchangeComponent: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Grid containter className={classes.root} spacing={10}>
      <Grid item>Exchange</Grid>
    </Grid>
  )
}
export default ExchangeComponent
