import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import BN from 'bn.js'
import useStyles from './style'

export interface IRewardsProps {
  slot: BN
  amountToClaim: BN
  amountPerRound: BN
  finishedRoundPoints: BN
  currentRoundPoints: BN
  currentRoundAllPoints: BN
  finishedRoundAllPoints: BN
  onClaim: () => void
  onWithdraw: () => void
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere neque et laoreet sollicitudin.'

export const RewardsTab: React.FC<IRewardsProps> = ({
  amountToClaim,
  amountPerRound,
  currentRoundPoints,
  finishedRoundPoints,
  currentRoundAllPoints,
  finishedRoundAllPoints,
  onClaim,
  onWithdraw
}) => {
  const classes = useStyles()

  const calculateTokensBasedOnPoints = (roundPoints?: BN, allPoints?: BN, amount?: BN) => {
    if (!roundPoints || !allPoints || !amount) {
      return new BN(0)
    }
    return roundPoints.mul(amount).div(allPoints)
  }

  //  TODO: replace amountPerRound
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
      name: 'Amount per round',
      nonBracket: 'points',
      nonBracketValue: amountPerRound,
      bracketValue: calculateTokensBasedOnPoints(
        currentRoundAllPoints,
        currentRoundAllPoints,
        amountPerRound
      ),
      bracket: 'SNY',
      hint: loremIpsum
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
      hint: loremIpsum
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
      bottomHint: 'Time remaining: 10:10:10'
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
            disabled={!!finishedRoundPoints}
            className={classes.button}
            onClick={onClaim}
          />
        </Grid>
        <Grid item style={{ marginLeft: 18 }}>
          <OutlinedButton
            color='primary'
            name='Withdraw'
            className={classes.button}
            onClick={onWithdraw}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RewardsTab
