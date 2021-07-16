import React from 'react'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import ValueCard from '@components/Cards/ValueCard'
import { transformBN } from '@consts/utils'
import { collateralValue, stakedValue, userDebtValue, userMaxDebtValue } from '@selectors/exchange'
import ProgressCard from '@components/Cards/ProgressCard'

export const StakingStats: React.FC = () => {
  const classes = useStyles()

  const stakedUserValue = useSelector(stakedValue)
  const collateralUserValue = useSelector(collateralValue)
  const currentDebt = useSelector(userDebtValue)
  const maxDebt = useSelector(userMaxDebtValue)

  return (
    <>
      <Grid className={classes.statsTile} item xs={12} md={4} lg={4}>
        <ValueCard
          name='Staked value'
          hint='Amount of money you’ve decided to keep on your virtual wallet.'
          value={transformBN(stakedUserValue)}
          sign={'$'}
          decimals={4}
        />
      </Grid>
      <Grid className={classes.statsTile} item xs={12} md={8} lg={8}>
        <ProgressCard
          name='Debt status'
          hint='Current value of your debt in comparison to your collateral value and max borrow'
          current={+transformBN(currentDebt)}
          sign={'$'}
          max={+transformBN(collateralUserValue)}
          currentDescription={ `Current debt: ${transformBN(currentDebt)}$`}
        />
      </Grid>
    </>
  )
}

export default StakingStats
