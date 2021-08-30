import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import BarChart from '@components/Stats/BarChart'
import useStyles from './style'
import data from '@components/Stats/mockData/exampleDataBar.json'
import pieData from '@components/Stats/mockData/exampleDataPie.json'
import LegendItem from '@components/Stats/LegendItem'
import colors from '@components/Stats/ColorScheme'

export const CollateralStructureComponent: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <Grid className={classes.barRoot} xs={12} sm={12} md={12} lg={12} alignItems='center'>
        <Grid item>
          <Typography className={classes.title}>Collateral Structure</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ height: 100, borderRadius: 10, background: 'black' }}>
          <BarChart data={data} />
        </Grid>
        <Grid container>
          {pieData.map((datum, index) => (
            <LegendItem name={datum.id} color={colors[index]}></LegendItem>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default CollateralStructureComponent
