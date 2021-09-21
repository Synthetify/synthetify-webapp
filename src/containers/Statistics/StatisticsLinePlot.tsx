import React from 'react'
import LinePlotContainer from '@components/LinePlotContainer/LinePlotContainer'
interface Data {
  id: string
  points: Array<{ x: number; y: number }>
}

const apiURL = 'https://api.synthetify.io/stats/devnet'
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
  const updateData = async () => {
    await fetch(apiURL)
      .then(async response => await response.json())
      .then(value => {
        fillDataVolume(value)
        fillDataBurn(value)
        fillDataLiquidation(value)
        fillDataMint(value)
        fillDataUserCount(value)
      })
      .then(() => setStatus(true))
  }
  const fillDataVolume = (value: any[]) => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: '',
      points: []
    }
    for (let i = 0; i < value.length; i++) {
      tmp.id = 'volume'
      tmp.points.push({ x: value[i].timestamp * 1000, y: value[i].volume })
      if (i === value.length - 1) {
        data.push(tmp)
      }
    }
  }
  const fillDataLiquidation = (value: any[]) => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: '',
      points: []
    }
    for (let i = 0; i < value.length; i++) {
      tmp.id = 'liquidation'
      tmp.points.push({ x: value[i].timestamp * 1000, y: value[i].liquidation })
      if (i === value.length - 1) {
        data.push(tmp)
      }
    }
  }
  const fillDataMint = (value: any[]) => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: '',
      points: []
    }
    for (let i = 0; i < value.length; i++) {
      tmp.id = 'mint'
      tmp.points.push({ x: value[i].timestamp * 1000, y: value[i].mint })
      if (i === value.length - 1) {
        data.push(tmp)
      }
    }
  }
  const fillDataBurn = (value: any[]) => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: '',
      points: []
    }
    for (let i = 0; i < value.length; i++) {
      tmp.id = 'burn'
      tmp.points.push({ x: value[i].timestamp * 1000, y: value[i].burn })
      if (i === value.length - 1) {
        data.push(tmp)
      }
    }
  }
  const fillDataUserCount = (value: any[]) => {
    const tmp: { id: string; points: Array<{ x: number; y: number }> } = {
      id: '',
      points: []
    }
    for (let i = 0; i < value.length; i++) {
      tmp.id = 'userCount'
      tmp.points.push({ x: value[i].timestamp * 1000, y: value[i].userCount })
      if (i === value.length - 1) {
        data.push(tmp)
      }
    }
  }

  React.useEffect(() => {
    updateData().catch(() => {})
  }, [])
  return <LinePlotContainer data={data} status={status} />
}
export default StatisticsLinePlot
