import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import LineChartComponent from '@containers/GlobalStats/LineChartComponent'
import StatsCardsComponent from '@containers/GlobalStats/StatsCardsComponent'
import DebtPoolComponent from '@containers/GlobalStats/DebtPoolComponent'
import CollateralStructureComponent from '@containers/GlobalStats/CollateralStructureComponent'

export const StatsPage: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.root} item xs={12} justifyContent="center">
      <Grid container className={classes.innerWrapper}>
        <Grid container className={classes.pageRow} item xs={12}>
          <LineChartComponent />
        </Grid>
        <Grid item className={classes.pageRow} xs={12}>
          <StatsCardsComponent/>
        </Grid>
        <Grid container item className={classes.pageRow} xs={12}>
          <DebtPoolComponent/>
        </Grid>
        <Grid container item className={classes.pageRow} xs={12}>
          <CollateralStructureComponent/>
        </Grid>
      </Grid>
    </Grid>
  )
}
