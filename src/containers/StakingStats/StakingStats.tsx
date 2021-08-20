import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import Star from '@static/svg/star.svg'
import Percent from '@static/svg/percent.svg'
import ValueCard from '@components/Cards/ValueCard'
import { printBN, transformBN } from '@consts/utils'
import { collateralValue, debtInterestRate, stakedValue, userDebtValue, userMaxDebtValue } from '@selectors/exchange'
import ProgressCard from '@components/Cards/ProgressCard'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles from './style'

export const StakingStats: React.FC = () => {
  const classes = useStyles()

  const stakedUserValue = useSelector(stakedValue)
  const collateralUserValue = useSelector(collateralValue)
  const currentDebt = useSelector(userDebtValue)
  const maxDebt = useSelector(userMaxDebtValue)
  const intrestRate = useSelector(debtInterestRate)

  return (
    <>
      <Grid className={classes.statsTile} item xs={12} sm={6} md={4} lg={4}>
        <ValueCard
          name='Staked value'
          hint={(
            <>
              <img src={Star} alt='' className={classes.tooltipIcon} />
              <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>Staked value</Typography>
              Your current USD denominated value of all deposited collaterals. Prices of collaterals are provided by decentralized Pyth oracles.
            </>
          )}
          value={transformBN(stakedUserValue)}
          sign={'$'}
        />
      </Grid>
      <Grid className={classes.statsTile} item xs={12} sm={6} md={8} lg={8}>
        <ProgressCard
          name='Debt status'
          hint={(
            <>
              <img src={Percent} alt='' className={classes.tooltipIcon} />
              <Typography className={classes.tooltipTitle}>Debt status</Typography>
              <p style={{ marginBlock: 10 }}>Current value of your debt based on the debt of the platform. Max borrow represents the maximal debt that you can mint. Value at the end of the bar is your liquidation threshold - if your debt increases beyond this value, your position can be liquidated.</p>
              <p style={{ marginBlock: 10 }}>Debt is subject to interest rate</p>
              <b>Intrest rate: {Number(printBN(intrestRate.val, intrestRate.scale))}%</b>
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
