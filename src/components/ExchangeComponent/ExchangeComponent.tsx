import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import useStyles from './style'

export const ExchangeComponent: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction='column' spacing={4}>
      <Grid item>
        <Typography className={classes.title}>Swap</Typography>
        <Divider className={classes.titleDivider} />
      </Grid>
    </Grid>
  )
}
export default ExchangeComponent
