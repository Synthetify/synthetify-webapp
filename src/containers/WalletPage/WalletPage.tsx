import React from 'react'

import AccountWrapper from '@containers/Account/Account'
import useStyles from './style'
import { Grid } from '@material-ui/core'

const WalletPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.contentContainer} justify='center'>
      <Grid item xs={12} className={classes.contentWrapper}>
        <AccountWrapper></AccountWrapper>
      </Grid>
    </Grid>
  )
}

export default WalletPage
