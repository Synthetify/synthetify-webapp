import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
import { useSelector } from 'react-redux'

import statsSelector from '@selectors/stats'
import { getCollateralValue, getSyntheticsStructure, getSwaplineCollateralBalance } from '@selectors/exchange'

export const StatisticsCard: React.FC = () => {
  const statsData = useSelector(statsSelector.last24)
  const synthetics = useSelector(getSyntheticsStructure)
  const USDBalance = useSelector(getSwaplineCollateralBalance)
  const collateralValue = useSelector(getCollateralValue)

  const syntheticData: Array<{
    id: string
    value: number
    price: number
  }> = Object.values(synthetics).map((item, index) => {
    return {
      id: index.toString(),
      value: item.percent,
      price: item.value
    }
  })

  return <StatisticCardAll data={statsData} debtCurrent={syntheticData} collateralValue={collateralValue + USDBalance} />
}
