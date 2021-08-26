import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import useStyles from '@components/Stats/style'
import LineChart from '@components/Stats/LineChart'
import data from '@components/Stats/mockData/exampleDataChart.json'
import LineChartControllers from '@components/Stats/LineChartControllers'

export const LineChartComponent: React.FC = () => {
  const classes = useStyles()
  const [activeButton, setActiveButton] = useState<string>('day')
  const [activeStat, setActiveStat] = useState<string>('Volument')

  function handleButtonChange(newActiveButton: string): void {
    setActiveButton(newActiveButton)
  }
  function handleStatChange(event: { target: { value: React.SetStateAction<string> } }): void {
    setActiveStat(event.target.value)
  }

  return (
    <>
      <Grid className={classes.root} xs={12} sm={12} md={12} lg={12}>
        <LineChartControllers
          activeButton={activeButton}
          onButtonClick={handleButtonChange}
          onStatChange={handleStatChange}
        />
        <LineChart activeStat={activeStat} data={data}></LineChart>
      </Grid>
    </>
  )
}

export default LineChartComponent
