/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import {
  calculateTimeRemaining,
  displayDate,
  estimateRounds,
  printBN,
  transformBN
} from '@consts/utils'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import BN from 'bn.js'

import Rewards1 from '@static/svg/rewards1.svg'
import Rewards2 from '@static/svg/rewards2.svg'
import Rewards3 from '@static/svg/rewards3.svg'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { Placement } from '@components/MobileTooltip/MobileTooltip'
import Clock from '@static/svg/clock.svg'
import useStyles from './style'
import { AverageAPY } from './AverageAPY/AverageAPY'
import { Marinade } from './Marinade/Marinade'
import { AVERAGE_MNDE_APY } from '@consts/static'
export type RoundType = 'next' | 'current' | 'finished'

export type RoundData = {
  [type in RoundType]: {
    roundPoints: BN
    roundAllPoints: BN
    roundStartSlot: BN
    roundAmount: Decimal
  }
}

export interface IRewardsProps {
  slot: number
  amountToClaim: Decimal
  roundLength: number
  stakedUserValue: BN
  SNYPrice: Decimal
  allDebtValue: Array<{ symbol: string; percent: number; value: number }>
  userDebtShares: BN
  rounds: RoundData
  onClaim: () => void
  onWithdraw: () => void
  amountPerRoundValue: Decimal
  collateralValue: number
  userMarinadeAmount: number
}

const Timer: React.FC<{ timeRemainingEndSlot: BN; slot: number }> = ({
  timeRemainingEndSlot,
  slot
}) => {
  const classes = useStyles()

  const [timeRemaining, setTimeRemaining] = React.useState(
    calculateTimeRemaining(slot, timeRemainingEndSlot)
  )
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(time => {
        if (time.eqn(0)) {
          return time
        }
        return time.subn(1)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    setTimeRemaining(calculateTimeRemaining(slot, timeRemainingEndSlot))
  }, [slot])
  return (
    <Grid className={classes.rootTimer}>
      <img src={Clock} alt='' className={classes.clockIcon} />
      <Typography className={classes.time}>{displayDate(timeRemaining.toNumber())}</Typography>
    </Grid>
  )
}
export const RewardsTab: React.FC<IRewardsProps> = ({
  slot = 0,
  amountToClaim,
  roundLength,
  SNYPrice,
  userDebtShares,
  rounds,
  onClaim,
  onWithdraw,
  amountPerRoundValue,
  allDebtValue,
  userMarinadeAmount
}) => {
  const classes = useStyles()

  const { finished, current, next } = estimateRounds({
    slot,
    amountToClaim,
    rounds,
    roundLength,
    userDebtShares
  })
  const {
    roundAllPoints: finishedRoundAllPoints,
    roundPoints: finishedRoundPoints,
    roundAmount: finishedRoundAmount
  } = finished
  const {
    roundAllPoints: currentRoundAllPoints,
    roundPoints: currentRoundPoints,
    roundStartSlot: currentRoundStartSlot,
    roundAmount: currentRoundAmount
  } = current
  const {
    roundAllPoints: nextRoundAllPoints,
    roundPoints: nextRoundPoints,
    roundStartSlot: nextRoundStartSlot,
    roundAmount: nextRoundAmount
  } = next

  const isClaimDisabled = () => {
    const noPoints = finishedRoundPoints.eqn(0)
    const finishedRoundOver = currentRoundStartSlot.gtn(slot)

    return noPoints || !finishedRoundOver
  }

  const isWithdrawDisabled = () => {
    return amountToClaim.val.eq(new BN(0))
  }

  const calculateTokensBasedOnPoints = (roundPoints?: BN, allPoints?: BN, amount?: Decimal) => {
    if (!roundPoints || !allPoints || allPoints.eqn(0) || !amount) {
      return new BN(0)
    }
    return roundPoints.mul(amount.val).div(allPoints)
  }

  const aprValue = (roundPoints?: BN, roundAllPoints?: BN, roundAmount?: Decimal): BN => {
    return !userDebtShares.eq(new BN(0))
      ? calculateTokensBasedOnPoints(roundPoints, roundAllPoints, roundAmount)
          .mul(SNYPrice.val)
          .mul(new BN(52))
          .div(userDebtShares)
      : new BN(0)
  }
  const apyValue = (roundPoints?: BN, roundAllPoints?: BN, roundAmount?: Decimal): BN => {
    const apr = aprValue(roundPoints, roundAllPoints, roundAmount)
    return !userDebtShares.eq(new BN(0))
      ? new BN((Math.pow(+transformBN(apr) / 100 / 52 + 1, 52) - 1) * 10000)
      : new BN(0)
  }

  const avgAPR = new BN(transformBN(amountPerRoundValue.val))
    .mul(SNYPrice.val)
    .div(new BN(allDebtValue.reduce((a, b) => a + b.value, 0)))
    .mul(new BN(52))
    .div(new BN(100))
  const avgAPY = new BN((Math.pow(+transformBN(avgAPR) / 52 + 1, 52) - 1) * 10000)

  const rewardsLines: {
    [index: number]: {
      name: string
      bracket?: string
      bracketValue?: BN
      nonBracket: string
      nonBracketValue: BN
      hint: string
      timeRemainingEndSlot: BN
      icon: string
      tooltipPlacement: Placement
    }
  } = [
    {
      name: 'Subscription round',
      nonBracket: 'SNY',
      nonBracketValue: calculateTokensBasedOnPoints(
        nextRoundPoints,
        nextRoundAllPoints,
        nextRoundAmount
      ),
      bracketValue: apyValue(nextRoundPoints, nextRoundAllPoints, nextRoundAmount),
      bracket: nextRoundPoints.eqn(0) ? '' : '%',
      hint: 'In this round you receive or lose pro rata shares proportionally to the value of your debt when you mint or burn your xUSD.',
      timeRemainingEndSlot: nextRoundStartSlot,
      icon: Rewards1,
      tooltipPlacement: 'left-end'
    },
    {
      name: 'Staking round',
      nonBracketValue: calculateTokensBasedOnPoints(
        currentRoundPoints,
        currentRoundAllPoints,
        currentRoundAmount
      ),
      nonBracket: 'SNY',
      bracketValue: apyValue(currentRoundPoints, currentRoundAllPoints, currentRoundAmount),
      bracket: currentRoundPoints.eqn(0) ? '' : '%',
      hint: 'In this round you join with the pro rata shares from the previous round. You will lose those when you burn your xUSD.',
      timeRemainingEndSlot: nextRoundStartSlot,
      icon: Rewards2,
      tooltipPlacement: 'left'
    },
    {
      name: 'Claiming round',
      nonBracketValue: calculateTokensBasedOnPoints(
        finishedRoundPoints,
        finishedRoundAllPoints,
        finishedRoundAmount
      ),
      nonBracket: 'SNY',
      bracketValue: apyValue(finishedRoundPoints, finishedRoundAllPoints, finishedRoundAmount),
      bracket: finishedRoundPoints.eqn(0) ? '' : '%',
      hint: 'In this round you join with the pro rata shares from the previous phase. You can now claim your reward in SNY tokens, being proportional to the number of your shares.',
      timeRemainingEndSlot: nextRoundStartSlot,
      icon: Rewards3,
      tooltipPlacement: 'left-start'
    }
  ]

  const lines = Object.keys(rewardsLines).map((key, index) => {
    const props = rewardsLines[+key]
    return (
      <Grid item key={index} className={classes.line}>
        <RewardsLine
          {...props}
          slot={slot}
          userMarinadeAmount={index === 1 ? userMarinadeAmount : undefined}
        />
        <Divider className={classes.divider} />
      </Grid>
    )
  })

  return (
    <Grid container direction='column' justifyContent='space-around'>
      <Grid item className={classes.amount} justifyContent='space-between'>
        <Timer timeRemainingEndSlot={rewardsLines[0].timeRemainingEndSlot} slot={slot} />
        <AverageAPY avgAPY={(+printBN(avgAPY, 2)).toFixed(2)} />
        <Marinade marinade={AVERAGE_MNDE_APY.toFixed(2)} />

        <RewardsAmount amountToClaim={amountToClaim} />
      </Grid>
      <Grid
        item
        container
        justifyContent='space-between'
        direction='column'
        style={{ marginTop: 18 }}>
        {lines}
      </Grid>
      <Grid
        item
        container
        alignItems='center'
        justifyContent='flex-end'
        wrap='nowrap'
        className={classes.buttonsWrapper}>
        <Grid item>
          <OutlinedButton
            color='secondary'
            name='Claim'
            disabled={isClaimDisabled()}
            className={classes.button}
            onClick={onClaim}
            labelClassName={classes.label}
          />
        </Grid>
        <Grid item style={{ marginLeft: 18 }}>
          <OutlinedButton
            color='primary'
            name='Withdraw'
            disabled={isWithdrawDisabled()}
            className={classes.button}
            onClick={onWithdraw}
            labelClassName={classes.label}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RewardsTab
