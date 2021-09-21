import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
import { useSelector } from 'react-redux'
import solanaConnectionSelectors from '@selectors/solanaConnection'
interface Props {
  collateral: number
  valume: number
  mint: number
  debt: number
  fee: number
}

export const StatisticsCard: React.FC = () => {
  const network = useSelector(solanaConnectionSelectors.network)
  const [data, setData] = React.useState<Props>({
    collateral: 0,
    valume: 0,
    mint: 0,
    debt: 0,
    fee: 0
  })

  const updateData = async () => {
    await fetch(`https://api.synthetify.io/stats/${network.toLowerCase()}`)
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
