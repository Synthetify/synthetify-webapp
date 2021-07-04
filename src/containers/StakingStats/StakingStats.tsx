import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import ValueCard from '@components/Cards/ValueCard'
import { transformBN } from '@consts/utils'
import { stakedValue, userDebtValue, userCollateralRatio } from '@selectors/exchange'

export const StakingStats: React.FC = () => {
  const classes = useStyles()

  const stakedUserValue = useSelector(stakedValue)
  const currentDebt = useSelector(userDebtValue)
  const collateralRatio = useSelector(userCollateralRatio)

  return (
    <>
      <Grid className={classes.statsTile} item xs={12} lg={4}>
        <ValueCard
          name="Staked Value"
          hint="Amount of money you’ve decided to keep on your virtual wallet."
          value={`${transformBN(stakedUserValue)}$`}
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
          value={`${collateralRatio.toString()}%`}
        />
      </Grid>
    </>
  )
}

export default StakingStats
