import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
import { useSelector } from 'react-redux'

import statsSelector from '@selectors/stats'
import { getSyntheticsStructure } from '@selectors/exchange'

export const StatisticsCard: React.FC = () => {
  const statsData = useSelector(statsSelector.last24)
  const synthetics = useSelector(getSyntheticsStructure)

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

  return <StatisticCardAll data={statsData} debtCurrent={syntheticData} />
}
