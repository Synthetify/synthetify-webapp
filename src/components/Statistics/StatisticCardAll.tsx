import { Grid } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { StatisticsCard } from './StatisticsCard'
interface Props {
  collateral: number
  valume: number
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
            desc='Lorem ipsum dolor sit amet consectetur'
          />
        </Grid>
        <Grid id='valume' item xs={5} >
          <StatisticsCard
            name='Volume'
            value={data.valume}
            desc='Lorem ipsum dolor sit amet, consectetur'
          />
        </Grid>
        <Grid id='mint' item xs>
          <StatisticsCard name='Mint' value={data.mint} desc={'Lorem ipsum dolor sit amet.'} />
        </Grid>
        <Grid id='debt' item xs={4} sm={5}>
          <StatisticsCard
            name='Debt'
            value={data.debt}
            desc={'Lorem ipsum dolor sit amet,consectetur'}
          />
        </Grid>
        <Grid id='fee' item xs>
          <StatisticsCard name='Fee' value={data.fee} desc={'Lorem ipsum dolor sit amet.'} />
        </Grid>
      </Grid>
    </div>
  )
}
