import { Fade, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { StatisticsCollateral } from '@containers/Statistics/StatisticsCollateral'
import DeptPoolContainer from '@containers/DebtPoolContainer/DebtPoolContainer'
import useStyles from './style'
import { StatisticsCard } from '@containers/Statistics/StatisticsCard'
import StatisticsLinePlot from '@containers/Statistics/StatisticsLinePlot'

export const StatisticsPage: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Fade in={true}>
        <Grid container classes={{ root: classes.container }} className={classes.slide} justifyContent='center'>
          <Grid item className={classes.innerWrapper}>
            <Typography className={classes.header}>Statistics</Typography>
            <Grid container className={classes.linePlot}>
              <StatisticsLinePlot />
            </Grid>
            <Grid container>
              <StatisticsCard />
            </Grid>
            <Grid container className={classes.gridItem}>
              <DeptPoolContainer />
            </Grid>
            <Grid container classes={{ root: classes.root }}>
              <StatisticsCollateral />
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </>
  )
}
