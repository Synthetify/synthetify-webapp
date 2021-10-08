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
  debtCurrent: Array<{
    id: string
    value: number
    price: number
  }>
}

export const StatisticCardAll: React.FC<IProp> = ({ data, debtCurrent }) => {
  const classes = useStyles()
  return (
    <div className={classes.gridContainer}>
      <Grid container className={classes.container}>
        <Grid id='collateral' item xs={12} sm={7}>
          <StatisticsCard
            name='Collateral'
            value={data.collateral}
            desc={'Total value deposited'}
          />
        </Grid>
        <Grid id='debt' item xs={12} sm={5}>
          <StatisticsCard
            name='Debt'
            value={debtCurrent.reduce((sum, item) => {
              return sum + item.price
            }, 0)}
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
