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

  const findEarlierRecord = () => {
    return statsData.find(element => element.id === timeActive.serieId)?.points[
      timeActive.index - 1
    ]?.y
  }
  React.useEffect(() => {
    let percentTmp = '0.00'
    let option: string
    if (menuOption === 'User count') {
      option = 'userCount'
    } else {
      option = menuOption.toLowerCase()
    }
    if (option !== timeActive.serieId) {
      const tmp = statsData.find(element => element.id === option)?.points
      if (tmp) {
        console.log((tmp[tmp.length - 2].y * 1.0).toFixed(1))
        if (tmp[tmp.length - 2].y * 1.0 !== 0.0) {
          percentTmp = (
            ((tmp[tmp.length - 1].y - tmp[tmp.length - 2].y) / tmp[tmp.length - 2].y) *
            100
          ).toFixed(2)
          setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
        } else {
          percentTmp = tmp[tmp.length - 1].y.toFixed(2)
          setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
        }
      }
    } else {
      const lastCol = findEarlierRecord()
      if (lastCol) {
        if (lastCol * 1.0 !== 0.0) {
          percentTmp = (((timeActive.value - lastCol) / lastCol) * 100).toFixed(2)
        } else {
          percentTmp = timeActive.value.toFixed(2)
        }
      } else {
        percentTmp = '0.00'
      }
      setInfoData({ name: menuOption, value: timeActive.value, percent: percentTmp })
    }
  }, [statsData, timeActive, menuOption])
  return (
    <LinePlotContainer
      data={statsData}
      infoData={infoData}
      setTimeActive={setTimeActive}
      menuOption={menuOption}
      setMenuOption={setMenuOption}
    />
  )
}
export default StatisticsLinePlot
