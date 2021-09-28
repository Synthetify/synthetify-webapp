import { Container, Fade, Grid, Typography } from '@material-ui/core'
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
        <Container classes={{ root: classes.container }} className={classes.slide}>
          <Typography className={classes.header}>Statistics</Typography>
          <Grid className={classes.linePlot}>
            <StatisticsLinePlot />
          </Grid>
          <Grid className={classes.cardContainer}>
            <StatisticsCard />
          </Grid>
          <Grid item className={classes.gridItem}>
            <DeptPoolContainer />
          </Grid>
          <Grid item classes={{ root: classes.root }}>
            <StatisticsCollateral />
          </Grid>
        </Container>
      </Fade>
    </>
  )
}
