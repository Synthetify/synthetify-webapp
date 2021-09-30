import React from 'react'
import LinePlotContainer from '@components/LinePlotContainer/LinePlotContainer'
import { useDispatch, useSelector } from 'react-redux'
import { action } from '@reducers/stats'
import statsSelector from '@selectors/stats'
import { getCollateralValue } from '@selectors/exchange'
import { identity } from 'lodash'

export const StatisticsLinePlot: React.FC = () => {
  const dispatch = useDispatch()
  const statsData = useSelector(statsSelector.linePlot)
  const collValLastMinDay = useSelector(statsSelector.tvl)
  const tvlValue = useSelector(getCollateralValue)
  const [tvlData, setTvlData] = React.useState<{ value: number; percent: string }>({
    value: 0,
    percent: '0'
  })
  React.useEffect(() => {
    dispatch(action.updateData())
  }, [])

  React.useEffect(() => {
    let percentTvl
    if (collValLastMinDay.collMinDayAgo !== 0) {
      percentTvl = (
        ((tvlValue - collValLastMinDay.collMinDayAgo) / collValLastMinDay.collMinDayAgo) *
        100
      ).toFixed(2)
    } else {
      percentTvl = '0'
    }

    setTvlData({ ...tvlData, value: tvlValue, percent: percentTvl })
  }, [tvlValue])
  return <LinePlotContainer data={statsData} tvlData={tvlData} />
}
export default StatisticsLinePlot
