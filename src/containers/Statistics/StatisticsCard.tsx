import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
interface Props {
  collateral: number
  valume: number
  mint: number
  debt: number
  fee: number
}
const apiURL = 'https://api.synthetify.io/stats/devnet'
export const StatisticsCard: React.FC = () => {
  const [data, setData] = React.useState<Props>({
    collateral: 0,
    valume: 0,
    mint: 0,
    debt: 0,
    fee: 0
  })

  const updateData = async () => {
    await fetch(apiURL)
      .then(async response => await response.json())
      .then(value => {
        const tmp = value[value.length - 1]
        setData(tmp)
      })
  }
  React.useEffect(() => {
    updateData().catch(() => {})
  }, [])
  return <StatisticCardAll data={data} />
}
