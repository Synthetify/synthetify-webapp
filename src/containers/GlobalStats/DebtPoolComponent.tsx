import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import data from '@components/Stats/mockData/exampleDataPie.json'
import { PieChart } from '@components/Stats/PieChart'
import LegendItem from '@components/Stats/LegendItem'
import statsColors from '@components/Stats/ColorScheme'

export const DebtPoolComponent: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid container justifyContent='space-between'>
      <Grid
        container
        className={classes.pieRoot}
        style={{ height: 450 }}
        xs={12}
        sm={12}
        md={12}
        lg={7}>
        <Grid item>
          <Typography className={classes.title}>Debt Pool</Typography>
        </Grid>
        <PieChart data={data}></PieChart>
      </Grid>
      <Grid className={classes.pieRoot} style={{ height: 400 }} xs={12} sm={12} md={12} lg={4}>
        {data.map((datum, index) => (
          <LegendItem
            name={datum.id}
            percentage={datum.value}
            price={datum.price}
            color={statsColors[index]}></LegendItem>
        ))}
      </Grid>
    </Grid>
  )
}

export default DebtPoolComponent
