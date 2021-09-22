import { StatisticCardAll } from '@components/Statistics/StatisticCardAll'
import React from 'react'
import { useSelector } from 'react-redux'
import solanaConnectionSelectors from '@selectors/solanaConnection'
interface Props {
  collateral: number
  volume: number
  mint: number
  debt: number
  fee: number
}

export const StatisticsCard: React.FC = () => {
  const network = useSelector(solanaConnectionSelectors.network)
  const [data, setData] = React.useState<Props>({
    collateral: 0,
    volume: 0,
    mint: 0,
    debt: 0,
    fee: 0
  })

  const updateData = () => {
    fetch(`https://api.synthetify.io/stats/${network.toLowerCase()}`)
      .then(async response => await response.json())
      .then(value => {
        const tmp = value[value.length - 1]
        setData(tmp)
      })
      .catch(error => {
        console.log(error)
      })
  }
  React.useEffect(() => {
    updateData()
  }, [])
  return <StatisticCardAll data={data} />
}
