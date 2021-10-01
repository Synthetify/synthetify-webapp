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
    serieId: 'dafault',
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

  const findEarlierRekord = () => {
    return statsData.find(element => element.id === timeActive.serieId)?.points[
      timeActive.index - 1
    ]?.y
  }
  React.useEffect(() => {
    let percentTmp = '0.00'
    let option
    if (menuOption === 'User count') {
      option = 'userCount'
    } else {
      option = menuOption.toLowerCase()
    }
    if (option !== timeActive.serieId) {
      if (menuOption !== 'User count') {
        const tmp = statsData.find(element => element.id === menuOption.toLowerCase())?.points
        if (tmp !== undefined) {
          if (tmp[tmp.length - 1].y !== 0.0) {
            percentTmp = (
              ((tmp[tmp.length - 1].y - tmp[tmp.length - 2].y) / tmp[tmp.length - 2].y) *
              100
            ).toFixed(2)
            setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
          } else {
            percentTmp = ((tmp[tmp.length - 1].y - tmp[tmp.length - 2].y) / 1).toFixed(2)
            setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
          }
        }
      } else {
        const tmp = statsData.find(element => element.id === 'userCount')?.points
        if (tmp !== undefined) {
          if (tmp[tmp.length - 1].y.toString() !== '0') {
            percentTmp = (
              ((tmp[tmp.length - 1].y - tmp[tmp.length - 2].y) / tmp[tmp.length - 2].y) *
              100
            ).toFixed(2)
            setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
          } else {
            percentTmp = ((tmp[tmp.length - 1].y - tmp[tmp.length - 2].y) / 1).toFixed(2)
            setInfoData({ name: menuOption, value: tmp[tmp.length - 1].y, percent: percentTmp })
          }
        }
      }
    } else {
      const lastCol = findEarlierRekord()
      console.log(lastCol)
      if (lastCol !== undefined) {
        if (menuOption !== 'User count') {
          if (lastCol.toString() !== '0.00') {
            percentTmp = (((timeActive.value - lastCol) / lastCol) * 100).toFixed(2)
          } else {
            percentTmp = ((timeActive.value - lastCol) / 1).toFixed(2)
          }
        } else {
          if (lastCol.toString() !== '0') {
            percentTmp = (((timeActive.value - lastCol) / lastCol) * 100).toFixed(2)
          } else {
            percentTmp = ((timeActive.value - lastCol) / 1).toFixed(2)
          }
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
