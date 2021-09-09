import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { StatisticsCollateral } from '../../containers/Statistics/StatisticsCollateral'
import { StatisticsSynthetic } from '../../containers/Statistics/StatisticsSynthetics'
import useStyles from './style'

export const StatisticsPage: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Container>
        <h1 className={classes.header}>Statistics</h1>
        <Grid item className={classes.gridItem}>
          <StatisticsSynthetic />
        </Grid>
        <Grid item>
          <StatisticsCollateral />
        </Grid>
      </Container>
    </>
  )
}
