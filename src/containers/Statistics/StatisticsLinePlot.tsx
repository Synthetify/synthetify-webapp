import React from 'react'
import LinePlotContainer from '@components/LinePlotContainer/LinePlotContainer'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '@reducers/stats'
import statsSelector from '@selectors/stats'

export const StatisticsLinePlot: React.FC = () => {
  const dispatch = useDispatch()
  const statsData = useSelector(statsSelector.linePlot)
  React.useEffect(() => {
    dispatch(action.updateData())
  }, [])
  return <LinePlotContainer data={statsData} />
}
export default StatisticsLinePlot
