import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
import { useSelector } from 'react-redux'

import statsSelector from '@selectors/stats'

export const StatisticsCard: React.FC = () => {
  const statsData = useSelector(statsSelector.last24)

  const updateData = () => {}
  React.useEffect(() => {
    updateData()
  }, [])
  return <StatisticCardAll data={statsData} />
}
