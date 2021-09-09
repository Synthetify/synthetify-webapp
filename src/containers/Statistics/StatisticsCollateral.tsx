import React from 'react'
import { StatsCollateralChart } from '@components/Stats/StatsCollateralChart/StatsCollateral'
import { useSelector } from 'react-redux'
import { getCollateralStructure } from '@selectors/exchange'
import { Container } from '@material-ui/core'

export const StatisticsCollateral: React.FC = () => {
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
  const collaterals = useSelector(getCollateralStructure)
  const CollateralData = Object.values(collaterals).map((item, index) => {
    return {
      name: item.symbol,
      percent: item.percent.toFixed(0),
      color: colors[index]
    }
  })

  return (
    <Container >
      <StatsCollateralChart data={CollateralData}/>
    </Container>
  )
}
