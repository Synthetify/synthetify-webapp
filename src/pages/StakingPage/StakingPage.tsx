import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { TokenList } from '@components/TokenList/TokenList'
import { IToken } from '@components/TokenItem/TokenItem'
import StakingStats from '@containers/StakingStats/StakingStats'

export interface IStakingPage {
  tokens: IToken[]
  addAccount: () => void
}

export const StakingPage: React.FC<IStakingPage> = ({
  tokens,
  addAccount
}) => {
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
          <TokenList tokens={tokens} addAccount={addAccount} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default StakingPage
