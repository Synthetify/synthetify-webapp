import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { StatisticsCollateral } from '../../containers/Statistics/StatisticsCollateral'
import DeptPoolContainer from '@containers/DebtPoolContainer/DebtPoolContainer'
import useStyles from './style'

export const StatisticsPage: React.FC = () => {
  const classes = useStyles()
  return (
    <>
      <Container>
        <h1 className={classes.header}>Statistics</h1>
        <Grid item className={classes.gridItem}>
          <DeptPoolContainer />
        </Grid>
        <Grid item>
          <StatisticsCollateral />
        </Grid>
      </Container>
    </>
  )
}
