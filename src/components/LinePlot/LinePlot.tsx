import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import useStyles from './style'

interface Data {
  id: string
  data: Array<{ x: number; y: number }>
}

interface IProps {
  data: Data
  sign: string
  setTimeActive: (index: number, serieId: string, timestamp: number, value: number) => void
}
export const LinePlot: React.FC<IProps> = ({ data, sign, setTimeActive }) => {
  const classes = useStyles()
  const fullDateData: Array<{ x: Date; y: number }> = data.data
    .slice(0)
    .slice(-30)
    .map(({ x, y }) => ({ x: new Date(x), y }))
  const onlyDaysData: Array<{ x: Date; y: number }> = data.data
    .slice(0)
    .slice(-30)
    .map(({ x, y }) => ({ x: new Date(x - (x % (1000 * 60 * 60 * 24))), y }))
  const formatDate = (index: number) =>
    fullDateData[index].x.toLocaleString('en-GB', {
      hour12: true,
      timeStyle: 'short',
      dateStyle: 'short'
    })

  const getPlotMax = () => {
    const values = fullDateData.map(point => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    if (minValue === maxValue) {
      return minValue + 1
    }
    return maxValue * 1.01
  }

  return (
    <Grid className={classes.linePlot}>
      <ResponsiveLine
        data={[{ id: data.id, data: onlyDaysData }]}
        margin={{ top: 10, right: 20, bottom: 35, left: 20 }}
        xScale={{
          type: 'time',
          format: 'native',
          precision: 'day',
          useUTC: true
        }}
        yScale={{
          type: 'linear',
          min: 0,
          max: getPlotMax()
        }}
        yFormat='>-.2f'
        curve='monotoneX'
        axisTop={null}
        axisLeft={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 3,
          tickRotation: 0,
          tickValues: 'every 2 days',
          format: '%d/%m'
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        colors={colors.green.main}
        crosshairType='bottom'
        enableArea={true}
        useMesh={true}
        legends={[]}
        fill={[{ match: '*', id: 'gradient' }]}
        defs={[
          linearGradientDef('gradient', [
            { offset: 0, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0.2 }
          ])
        ]}
        tooltip={({
          point: {
            data: { y },
            index
          }
        }) => (
          <div className={classes.tooltipRoot}>
            <Typography className={classes.tooltipDate}>{formatDate(index)}</Typography>
            <Typography className={classes.tooltipValue}>
              {sign}
              {y as number}
            </Typography>
            <FiberManualRecordIcon className={classes.tooltipPoint} />
          </div>
        )}
        theme={{
          crosshair: {
            line: {
              stroke: colors.white.main,
              strokeDasharray: 'none',
              strokeWidth: 0.5,
              strokeOpacity: 1
            }
          }
        }}
        onMouseMove={event => {
          setTimeActive(
            data.data.length - 30 + event.index,
            event.serieId.toString(),
            Number(event.data.x),
            Number(event.data.y)
          )
        }}
      />
    </Grid>
  )
}
export default LinePlot
