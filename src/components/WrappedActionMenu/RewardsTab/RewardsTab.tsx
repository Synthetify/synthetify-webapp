import React from 'react'
import { Grid } from '@material-ui/core'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'

export interface IRewardsProps {
  amountPerRound: number
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere neque et laoreet sollicitudin. Donec augue risus, dapibus eu nunc lobortis, condimentum pharetra nisl'

const rewardsLines: { [index: number]: { message: string; hint: string } } = [
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
    hint: loremIpsum
  }
]

export const RewardsTab: React.FC = () => {
  const lines = Object.keys(rewardsLines).map((key, index) => {
    const { message, hint } = rewardsLines[+key]
    return (
      <Grid item>
        <RewardsLine key={index} message={message} hint={hint} />
      </Grid>
    )
  })

  return (
    <Grid container direction='column'>
      {lines}
    </Grid>
  )
}

export default RewardsTab
