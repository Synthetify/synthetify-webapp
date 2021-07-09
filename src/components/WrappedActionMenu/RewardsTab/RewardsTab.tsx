import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import BN from 'bn.js'
import useStyles from './style'
import { printBN } from '@consts/utils'

export interface IRewardsProps {
  amountToClaim: BN
  finishedRoundPoints: BN
  currentRoundPoints: BN
  nextRoundPoints: BN
  lastUpdate: BN
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere neque et laoreet sollicitudin.'

export const RewardsTab: React.FC<IRewardsProps> = ({
  amountToClaim,
  nextRoundPoints,
  currentRoundPoints,
  finishedRoundPoints
}) => {
  const classes = useStyles()

  const rewardsLines: { [index: number]: { message: string; hint: string; bottomHint?: string } } =
    [
      {
        message: `Amount per round: ${printBN(nextRoundPoints, 6)} points (SNY)`,
        hint: loremIpsum
      },
      {
        message: `Current round: ${printBN(currentRoundPoints, 6)} points (SNY)`,
        hint: loremIpsum
      },
      {
        message: `Finished round: ${printBN(finishedRoundPoints, 6)} points (SNY)`,
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
            className={classes.button}
            onClick={() => {}}
          />
        </Grid>
        <Grid item style={{ marginLeft: 18 }}>
          <OutlinedButton
            color='primary'
            name='Withdraw'
            className={classes.button}
            onClick={() => {}}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RewardsTab
