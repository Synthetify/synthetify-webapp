import React from 'react'
import { Divider, Grid } from '@material-ui/core'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { RewardsAmount } from '@components/WrappedActionMenu/RewardsTab/RewardsAmount/RewardsAmount'
import useStyles from './style'

export interface IRewardsProps {
  amountPerRound: number
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere neque et laoreet sollicitudin.'

const rewardsLines: { [index: number]: { message: string; hint: string; bottomHint?: string } } = [
  {
    message: 'Amount per round: 9999 points (999 SNY)',
    hint: loremIpsum
  },
  {
    message: 'Current round: 9999 points (999 SNY)',
    hint: loremIpsum
  },
  {
    message: 'Finished round: 9999 points (999 SNY)',
    hint: loremIpsum,
    bottomHint: 'Time remaining: 10:10:10'
  }
]

export const RewardsTab: React.FC = () => {
  const classes = useStyles()

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
    <Grid container direction='column' justify='space-around' className={classes.root}>
      <Grid item>
        <RewardsAmount />
      </Grid>
      <Grid item container justify='space-between' direction='column'>
        {lines}
      </Grid>
      <Grid item container alignItems='center' justify='flex-end' wrap='nowrap'>
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
