import React from 'react'
import { StatsCollateralChart } from '@components/Stats/StatsCollateralChart/StatsCollateral'
import { useSelector } from 'react-redux'
import { getCollateralStructure } from '@selectors/exchange'
import { Container } from '@material-ui/core'
import { colors } from '@consts/uiUtils'

export const StatisticsCollateral: React.FC = () => {
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
