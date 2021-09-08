import React from 'react'
import { StatsCollateralChart } from './../../components/Stats/StatsCollateralChart/StatsCollateral'
import { DebtPoolContainer } from './../DebtPoolContainer/DebtPoolContainer'
import { useSelector } from 'react-redux'
import { getCollateralStructure, getSyntheticsStructure } from './../../store/selectors/exchange'
import { Container, Grid } from '@material-ui/core'
import useStyles from './style'

export const Statistics: React.FC = () => {
  const colors = [
    '#FF9494',
    '#6372BE',
    '#40BFA0',
    '#117098',
    '#BFB665',
    '#1F70CF',
    '#936BC7',
    '#39D3F5',
    '#DADCF1',
    '#C76BA2',
    '#D49347'
  ]
  const getCollaterals = useSelector(getCollateralStructure)
  const getSynthetics = useSelector(getSyntheticsStructure)
  const classes = useStyles()
  const CollateralData = Object.values(getCollaterals).map((item, index) => {
    return {
      name: item.symbol,
      percent: item.percent.toFixed(0),
      color: colors[index]
    }
  })
  const SyntheticData = Object.values(getSynthetics).map((item, index) => {
    return {
      id: index.toString(),
      label: item.symbol,
      value: item.percent,
      color: colors[index],
      price: item.price,
      percent: item.percent.toFixed(0)
    }
  })
  return (
    <Container className={classes.container}>
      <h1 className={classes.header}>Statistics</h1>
      <Grid item className={classes.gridItem}>
        <DebtPoolContainer data={SyntheticData} />
      </Grid>
      <Grid item>
        <StatsCollateralChart data={CollateralData}/>
      </Grid>
    </Container>
  )
}
