import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import ValueCard from '@components/Cards/ValueCard'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { TokenList } from '@components/TokenList/TokenList'
import { IToken } from '@components/TokenItem/TokenItem'
import BN from 'bn.js'
import { transformBN } from '@consts/utils'

export interface IStakingPage {
  stakedValue: BN
  currentDebt: BN
  collateralRatio: number
  tokens: IToken[]
  addAccount: () => void
}

export const StakingPage: React.FC<IStakingPage> = ({
  stakedValue,
  currentDebt,
  collateralRatio,
  tokens,
  addAccount
}) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} item xs={12} justify="center">
      <Grid container className={classes.innerWrapper}>
        <Grid container className={classes.pageRow} item xs={12}>
          <Grid className={classes.statsTile} item xs={12} lg={4}>
            <ValueCard
              name="Staked Value"
              hint="Amount of money you’ve deciced to keep on your virtual wallet."
              value={`${transformBN(stakedValue)}$`}
            />
          </Grid>
          <Grid className={classes.statsTile} item xs={12} lg={4}>
            <ValueCard
              name="Current debt"
              hint="Lorem ipsum"
              value={`${transformBN(currentDebt)}$`}
            />
          </Grid>
          <Grid className={classes.statsTile} item xs={12} lg={4}>
            <ValueCard
              name="Collateral Ratio"
              hint="Lorem ipsum"
              value={`${collateralRatio.toFixed(1)}%`}
            />
          </Grid>
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
