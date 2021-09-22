import React from 'react'
import LinePlotContainer from '@components/LinePlotContainer/LinePlotContainer'
import { useSelector } from 'react-redux'
import solanaConnectionSelectors from '@selectors/solanaConnection'

interface Data {
  id: string
  points: Array<{ x: number; y: number }>
}
const timestamp = Date.now()
const data: Data[] = [
  {
    id: 'default',
    points: [
      { x: timestamp, y: 1 },
      { x: timestamp + 5, y: 1 }
    ]
  }
]

export const StatisticsLinePlot: React.FC = () => {
  const [status, setStatus] = React.useState(false)
  const network = useSelector(solanaConnectionSelectors.network)
  const updateData = () => {
    fetch(`https://api.synthetify.io/stats/${network.toLowerCase()}`)
      .then(async response => await response.json())
      .then(value => {
        ;['volume', 'mint', 'burn', 'liquidation', 'userCount'].map(element =>
          fillData(value, element)
        )
      })
      .then(() => {
        setStatus(true)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const fillData = (value: any[], name: string) => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: '',
      points: []
    }
    tmp.id = name
    for (let i = 0; i < value.length; i++) {
      tmp.points.push({ x: value[i].timestamp * 1000, y: value[i][name] })
      if (i === value.length - 1) {
        data.push(tmp)
      }
    }
  }
  React.useEffect(() => {
    updateData()
  }, [])
  return <LinePlotContainer data={data} status={status} />
}
export default StatisticsLinePlot
