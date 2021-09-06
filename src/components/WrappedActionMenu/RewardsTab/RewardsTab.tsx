import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { divUpNumber } from '@consts/utils'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import BN from 'bn.js'
import useStyles from './style'
import Rewards1 from '@static/svg/rewards1.svg'
import Rewards2 from '@static/svg/rewards2.svg'
import Rewards3 from '@static/svg/rewards3.svg'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { Placement } from '@components/MobileTooltip/MobileTooltip'

export type RoundType = 'next' | 'current' | 'finished'

export type RoundData = {
  [type in RoundType]: {
    roundPoints: BN
    roundAllPoints: BN
    roundStartSlot: BN
  }
}

export interface IRewardsProps {
  slot: number
  amountToClaim: Decimal
  amountPerRound: Decimal
  roundLength: number
  userDebtShares: BN
  rounds: RoundData
  onClaim: () => void
  onWithdraw: () => void
}

export const RewardsTab: React.FC<IRewardsProps> = ({
  slot = 0,
  amountToClaim,
  amountPerRound,
  roundLength,
  userDebtShares,
  rounds,
  onClaim,
  onWithdraw
}) => {
  const classes = useStyles()

  const estimateRounds = (): RoundData => {
    const { current, next } = rounds

    if (next.roundStartSlot.toNumber() >= slot) {
      return rounds
    }
    const slotDiff = slot - next.roundStartSlot.toNumber()
    const roundDiff = divUpNumber(slotDiff, roundLength)

    switch (roundDiff) {
      case 1: {
        return {
          finished: current,
          current: next,
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          }
        }
      }
      case 2: {
        return {
          finished: next,
          current: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          },
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(2))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          }
        }
      }
      default: {
        return {
          finished: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff - 2))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          },
          current: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff - 1))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          },
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares
          }
        }
      }
    }
  }

  const { finished, current, next } = estimateRounds()
  const { roundAllPoints: finishedRoundAllPoints, roundPoints: finishedRoundPoints } = finished
  const {
    roundAllPoints: currentRoundAllPoints,
    roundPoints: currentRoundPoints,
    roundStartSlot: currentRoundStartSlot
  } = current
  const {
    roundAllPoints: nextRoundAllPoints,
    roundPoints: nextRoundPoints,
    roundStartSlot: nextRoundStartSlot
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
      nonBracket: 'points',
      nonBracketValue: nextRoundPoints,
      bracketValue: calculateTokensBasedOnPoints(
        nextRoundPoints,
        nextRoundAllPoints,
        amountPerRound
      ),
      bracket: nextRoundPoints.eqn(0) ? '' : 'SNY',
      hint: 'This round is in the Subscription phase. You will receive or lose points proportionally to the value of your debt when you mint or burn your xUSD.',
      timeRemainingEndSlot: nextRoundStartSlot,
      icon: Rewards1,
      tooltipPlacement: 'left-end'
    },
    {
      name: 'Staking round',
      nonBracketValue: currentRoundPoints,
      nonBracket: 'points',
      bracketValue: calculateTokensBasedOnPoints(
        currentRoundPoints,
        currentRoundAllPoints,
        amountPerRound
      ),
      bracket: currentRoundPoints.eqn(0) ? '' : 'SNY',
      hint: 'This round is in the Staking phase. You entered this round with points from the previous phase. You will lose points when you burn your xUSD.',
      timeRemainingEndSlot: nextRoundStartSlot,
      icon: Rewards2,
      tooltipPlacement: 'left'
    },
    {
      name: 'Claiming round',
      nonBracketValue: finishedRoundPoints,
      nonBracket: 'points',
      bracketValue: calculateTokensBasedOnPoints(
        finishedRoundPoints,
        finishedRoundAllPoints,
        amountPerRound
      ),
      bracket: finishedRoundPoints.eqn(0) ? '' : 'SNY',
      hint: 'This round is in the Claiming phase. You entered this round with points from the previous phase. You can now Claim your reward proportional to the number of points in SNY tokens.',
      timeRemainingEndSlot: nextRoundStartSlot,
      icon: Rewards3,
      tooltipPlacement: 'left-start'
    }
  ]

  const lines = Object.keys(rewardsLines).map((key, index) => {
    const props = rewardsLines[+key]
    return (
      <Grid item key={index} className={classes.line}>
        <RewardsLine {...props} slot={slot} />
        <Divider className={classes.divider} />
      </Grid>
    )
  })

  return (
    <Grid container direction='column' justifyContent='space-around'>
      <Grid item className={classes.amount}>
        <RewardsAmount amountToClaim={amountToClaim} />
      </Grid>
      <Grid item container justifyContent='space-between' direction='column'>
        {lines}
      </Grid>
      <Grid item container alignItems='center' justifyContent='flex-end' wrap='nowrap' className={classes.buttonsWrapper}>
        <Grid item>
          <OutlinedButton
            color='secondary'
            name='Claim'
            disabled={isClaimDisabled()}
            className={classes.button}
            onClick={onClaim}
          />
        </Grid>
        <Grid item style={{ marginLeft: 18 }}>
          <OutlinedButton
            color='primary'
            name='Withdraw'
            disabled={isWithdrawDisabled()}
            className={classes.button}
            onClick={onWithdraw}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RewardsTab
