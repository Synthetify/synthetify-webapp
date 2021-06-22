import React from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import useStyles from './style'
import AmountInput from '@components/Input/AmountInput'

export const ExchangeComponent: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction='column' spacing={3}>
      <Grid item>
        <Typography className={classes.title}>Swap</Typography>
        <Divider className={classes.titleDivider} />
      </Grid>
      <Grid item container>
        <Grid item>
          <AmountInput setValue={ () => {} } currency='xUSD'/>
        </Grid>
      </Grid>

    </Grid>
  )
}
export default ExchangeComponent
