import React from 'react'
import LinePlotContainer from '@components/LinePlotContainer/LinePlotContainer'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '@reducers/stats'
import statsSelector from '@selectors/stats'

export const StatisticsLinePlot: React.FC = () => {
  const dispatch = useDispatch()
  const statsData = useSelector(statsSelector.linePlot)
  const [timeActive, setTimeActive] = React.useState<{
    index: number
    serieId: string
    timestamp: number
    value: number
  }>({
    index: 0,
    serieId: 'default',
    timestamp: 0,
    value: 0
  })
  const [menuOption, setMenuOption] = React.useState('Volume')
  const [infoData, setInfoData] = React.useState<{ name: string; value: number; percent: string }>({
    name: menuOption,
    value: 0,
    percent: '0'
  })
  React.useEffect(() => {
    dispatch(action.updateData())
  }, [])
  const changeActiveTime = (index: number, serieId: string, timestamp: number, value: number) => {
    setTimeActive({ index: index, serieId: serieId, timestamp: timestamp, value: value })
  }

  const findEarlierRecord = () => {
    const points = statsData.find(element => element.id === timeActive.serieId)?.points
    const earlierRecord = points?.find(p => p.x === timeActive.timestamp)
    return statsData.find(element => element.id === timeActive.serieId)?.points[
      timeActive.index - 1
    ]?.y
  }
  React.useEffect(() => {
    let percentTmp = '0.00'
    const option: string = menuOption === 'User count' ? 'userCount' : menuOption.toLowerCase()
    if (option !== timeActive.serieId) {
      const tmp = statsData.find(element => element.id === option)?.points
      if (typeof tmp !== 'undefined') {
        if (Number(tmp[tmp.length - 2].y) !== 0) {
          percentTmp = (
            ((tmp[tmp.length - 1].y - tmp[tmp.length - 2].y) / tmp[tmp.length - 2].y) *
            100
          ).toFixed(2)
        } else if (tmp[tmp.length - 1].y) {
          console.log(tmp[tmp.length - 1].y)
          percentTmp = 'NaN'
        }

        setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
      }
    } else {
      const lastCol = findEarlierRecord()
      if (typeof lastCol !== 'undefined') {
        if (Number(lastCol) !== 0) {
          percentTmp = (((timeActive.value - lastCol) / lastCol) * 100).toFixed(2)
        } else if (timeActive.value !== 0) {
          percentTmp = 'NaN'
        }
      }
      setInfoData({ name: menuOption, value: timeActive.value, percent: percentTmp })
    }
    console.log(statsData)
  }, [statsData, timeActive, menuOption])
  return (
    <LinePlotContainer
      data={statsData}
      infoData={infoData}
      setTimeActive={changeActiveTime}
      menuOption={menuOption}
      setMenuOption={setMenuOption}
    />
  )
}
export default StatisticsLinePlot
