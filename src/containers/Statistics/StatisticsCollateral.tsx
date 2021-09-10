import React from 'react'
import { StatsCollateralChart } from '@components/Stats/StatsCollateralChart/StatsCollateral'
import { useSelector } from 'react-redux'
import { getCollateralStructure } from '@selectors/exchange'
import { colors } from '@consts/uiUtils'

export const StatisticsCollateral: React.FC = () => {
  const collaterals = useSelector(getCollateralStructure)
  const CollateralData = Object.values(collaterals).map((item, index) => {
    return {
      name: item.symbol,
      percent: item.percent,
      color: colors[index]
    }
  })

  return (
    <>
      <StatsCollateralChart data={CollateralData}/>
    </>
  )
}
