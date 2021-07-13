import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import BN from 'bn.js'
import useStyles from './style'

export interface IRewardsProps {
  slot?: BN
  amountToClaim: BN
  amountPerRound: BN
  nextRoundStartSlot: BN
  nextRoundPoints: BN
  finishedRoundStartSlot: BN
  finishedRoundPoints: BN
  currentRoundPoints: BN
  nextRoundAllPoints: BN
  currentRoundStartSlot: BN
  currentRoundAllPoints: BN
  finishedRoundAllPoints: BN
  roundLength: number
  onClaim: () => void
  onWithdraw: () => void
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere neque et laoreet sollicitudin.'

export const RewardsTab: React.FC<IRewardsProps> = ({
  slot = new BN(0),
  amountToClaim,
  amountPerRound,
  nextRoundStartSlot,
  nextRoundPoints,
  finishedRoundStartSlot,
  currentRoundPoints,
  finishedRoundPoints,
  nextRoundAllPoints,
  currentRoundAllPoints,
  finishedRoundAllPoints,
  currentRoundStartSlot,
  roundLength,
  onClaim,
  onWithdraw
}) => {
  const classes = useStyles()

  const isClaimDisabled = () => {
    const noPoints = finishedRoundPoints.eqn(0)
    const roundFinishSlot = currentRoundStartSlot.addn(roundLength)
    const roundNotOver = !slot.gt(roundFinishSlot)

    return noPoints && roundNotOver
  }

  const isWithdrawDisabled = () => {
    return amountToClaim.eqn(0)
  }

  const calculateTokensBasedOnPoints = (roundPoints?: BN, allPoints?: BN, amount?: BN) => {
    if (!roundPoints || !allPoints || allPoints.eqn(0) || !amount) {
      return new BN(0)
    }
    return roundPoints.mul(amount).div(allPoints)
  }

  const calculateTimeRemaining = (roundStart: BN) => {
    const slotTime = 0.4
    const roundFinishSlot = roundStart.addn(roundLength)
    const slotDiff = roundFinishSlot.sub(slot)
    if (slotDiff.lten(0)) {
      return new BN(0)
    }
    return slotDiff.muln(slotTime)
  }

  const displayDate = (seconds: number) => {
    return `
    ${(seconds / (24 * 3600)).toFixed(0)}
    :
    ${((seconds / 60) % 60).toFixed(0)}
    :
    ${(seconds % 60).toFixed(0)}`
  }

  const displayTimeRemaining = (roundStart: BN) => {
    const timeRemaining = calculateTimeRemaining(roundStart)
    return `Time remaining: ${displayDate(timeRemaining.toNumber())}`
  }

  const rewardsLines: {
    [index: number]: {
      name: string
      bracket?: string
      bracketValue?: BN
      nonBracket: string
      nonBracketValue: BN
      hint: string
      bottomHint?: string
    }
  } = [
    {
      name: 'Next round',
      nonBracket: 'points',
      nonBracketValue: nextRoundPoints,
      bracketValue: calculateTokensBasedOnPoints(
        nextRoundPoints,
        nextRoundAllPoints,
        amountPerRound
      ),
      bracket: 'SNY',
      hint: loremIpsum,
      bottomHint: displayTimeRemaining(nextRoundStartSlot)
    },
    {
      name: 'Current round',
      nonBracketValue: currentRoundPoints,
      nonBracket: 'points',
      bracketValue: calculateTokensBasedOnPoints(
        currentRoundPoints,
        currentRoundAllPoints,
        amountPerRound
      ),
      bracket: 'SNY',
      hint: loremIpsum,
      bottomHint: displayTimeRemaining(currentRoundStartSlot)
    },
    {
      name: 'Finished round',
      nonBracketValue: finishedRoundPoints,
      nonBracket: 'points',
      bracketValue: calculateTokensBasedOnPoints(
        finishedRoundPoints,
        finishedRoundAllPoints,
        amountPerRound
      ),
      bracket: 'SNY',
      hint: loremIpsum,
      bottomHint: displayTimeRemaining(finishedRoundStartSlot)
    }
  ]

  const lines = Object.keys(rewardsLines).map((key, index) => {
    const props = rewardsLines[+key]
    return (
      <Grid item key={index}>
        <RewardsLine {...props} />
        <Divider className={classes.divider} />
      </Grid>
    )
  })

  return (
    <Grid container direction='column' justifyContent='space-around' className={classes.root}>
      <Grid item>
        <RewardsAmount amountToClaim={amountToClaim} />
      </Grid>
      <Grid item container justifyContent='space-between' direction='column'>
        {lines}
      </Grid>
      <Grid item container alignItems='center' justifyContent='flex-end' wrap='nowrap'>
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
