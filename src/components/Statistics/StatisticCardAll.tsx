import { Grid } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { StatisticsCard } from './StatisticsCard'
interface Props {
  volume: number
  mint: number
  fee: number
}

interface IProp {
  data: Props
  debtCurrent: Array<{
    value: number
    symbol: string
    scale: number
  }>
  collateralValue: number
}

export const StatisticCardAll: React.FC<IProp> = ({ data, debtCurrent, collateralValue }) => {
  const classes = useStyles()
  return (
    <div className={classes.gridContainer}>
      <Grid container className={classes.container}>
        <Grid id='collateral' item xs={12} sm={7}>
          <StatisticsCard
            name='Collateral'
            value={collateralValue}
            desc={'Total value deposited'}
          />
        </Grid>
        <Grid id='debt' item xs={12} sm={5}>
          <StatisticsCard
            name='Debt'
            value={debtCurrent.reduce((a, b) => a + b.value, 0)}
            desc={'Total debt owed'}
          />
        </Grid>
        <Grid id='mint' item xs={12} sm={4}>
          <StatisticsCard name='Mint' value={data.mint} desc={'Value minted'} />
        </Grid>
        <Grid id='volume' item xs={12} sm={5}>
          <StatisticsCard name='Volume' value={data.volume} desc={'Exchange volume'} />
        </Grid>
        <Grid id='fee' item xs={12} sm={3}>
          <StatisticsCard name='Fee' value={data.fee} desc={'Fee collected '} />
        </Grid>
      </Grid>
    </div>
  )
}
