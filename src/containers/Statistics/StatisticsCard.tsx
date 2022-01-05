import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
import { useSelector } from 'react-redux'

import statsSelector from '@selectors/stats'
import {
  getCollateralValue,
  getSyntheticsValue,
  getSwaplineCollateralBalance
} from '@selectors/exchange'
import { getVaultCollateralBalance, getVaultDebtValue } from '@selectors/vault'

export const StatisticsCard: React.FC = () => {
  const statsData = useSelector(statsSelector.last24)
  const synthetics = useSelector(getSyntheticsValue)
  const swaplineCollateralValue = useSelector(getSwaplineCollateralBalance)
  const vaultColllateralValue = useSelector(getVaultCollateralBalance)
  const vaultDebtValue = useSelector(getVaultDebtValue)
  const collateralValue = useSelector(getCollateralValue)
  const syntheticData: Array<{
    value: number
    symbol: string
    scale: number
  }> = Object.values(synthetics).map(item => {
    return {
      value: item.value,
      symbol: item.symbol,
      scale: item.scale
    }
  })
  return (
    <StatisticCardAll
      data={statsData}
      debtCurrent={syntheticData}
      debtVault={vaultDebtValue}
      collateralValue={collateralValue + swaplineCollateralValue + vaultColllateralValue}
    />
  )
}
