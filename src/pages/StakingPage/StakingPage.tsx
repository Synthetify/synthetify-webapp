import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import StakingStats from '@containers/StakingStats/StakingStats'
import TokenListWrapper from '@containers/TokenListWrapper/TokenListWrapper'

export const StakingPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} item xs={12} justify="center">
      <Grid container className={classes.innerWrapper}>
        <Grid container className={classes.pageRow} item xs={12}>
          <StakingStats />
        </Grid>
        <Grid item className={classes.pageRow} xs={12}>
          <WrappedActionMenu />
        </Grid>
        <Grid item className={classes.pageRow} xs={12}>
          <TokenListWrapper />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StakingPage
