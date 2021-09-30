import { Grid } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { StatisticsCard } from './StatisticsCard'
interface Props {
  collateral: number
  volume: number
  mint: number
  debt: number
  fee: number
}

interface IProp {
  data: Props
}

export const StatisticCardAll: React.FC<IProp> = ({ data }) => {
  const classes = useStyles()
  return (
    <div className={classes.gridContainer}>
      <Grid container className={classes.container}>
        <Grid id='collateral' item xs={7}>
          <StatisticsCard
            name='Collateral'
            value={data.collateral}
            desc='Total value of tokens deposited'
          />
        </Grid>
        <Grid id='volume' item xs={5}>
          <StatisticsCard
            name='Volume'
            value={data.volume}
            desc='Total value of tokens currently in circulation'
          />
        </Grid>
        <Grid id='mint' item xs>
          <StatisticsCard name='Mint' value={data.mint} desc={'Total value of minted tokens'} />
        </Grid>
        <Grid id='debt' item xs={4} sm={5}>
          <StatisticsCard name='Debt' value={data.debt} desc={'Total debt owed'} />
        </Grid>
        <Grid id='fee' item xs>
          <StatisticsCard name='Fee' value={data.fee} desc={'Total fee collected on trades'} />
        </Grid>
      </Grid>
    </div>
  )
}
