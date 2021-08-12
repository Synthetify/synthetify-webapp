import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import ValueCard from '@components/Cards/ValueCard'
import { transformBN } from '@consts/utils'
import { collateralValue, stakedValue, userDebtValue, userMaxDebtValue } from '@selectors/exchange'
import ProgressCard from '@components/Cards/ProgressCard'
import AnimatedNumber from '@components/AnimatedNumber'

export const StakingStats: React.FC = () => {
  const classes = useStyles()

  const stakedUserValue = useSelector(stakedValue)
  const collateralUserValue = useSelector(collateralValue)
  const currentDebt = useSelector(userDebtValue)
  const maxDebt = useSelector(userMaxDebtValue)

  return (
    <>
      <Grid className={classes.statsTile} item xs={12} sm={6} md={4} lg={4}>
        <ValueCard
          name='Staked value'
          hint='Amount of money you’ve decided to keep on your virtual wallet.'
          value={transformBN(stakedUserValue)}
          sign={'$'}
        />
      </Grid>
      <Grid className={classes.statsTile} item xs={12} sm={6} md={8} lg={8}>
        <ProgressCard
          name='Debt status'
          hint={(
            <>
              <Typography className={classes.tooltipTitle}>Debt status</Typography> {/* TODO: this title is placeholder to be switched later with interest rate */}
              Current value of your debt in comparison to your collateral value and max borrow
            </>
          )}
          current={+transformBN(currentDebt)}
          sign={'$'}
          max={+transformBN(collateralUserValue)}
          topIndicator={(
            <Typography className={classes.indicator}>
              Current debt:{' '}
              <AnimatedNumber
                value={+transformBN(currentDebt)}
                duration={300}
                formatValue={(value: string) => Number(value).toFixed(2)}
              />
              $
            </Typography>
          )}
          topIndicatorValue={+transformBN(currentDebt)}
          bottomIndicator={(
            <Typography className={classes.indicator}>
              Max borrow:{' '}
              <AnimatedNumber
                value={+transformBN(maxDebt)}
                duration={300}
                formatValue={(value: string) => Number(value).toFixed(2)}
              />
              $
            </Typography>
          )}
          bottomIndicatorValue={+transformBN(maxDebt)}
        />
      </Grid>
    </>
  )
}

export default StakingStats
