import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import useStyles from './style'

const STEP_VALUES = 2

interface Data {
  id: string
  data: Array<{ x: number; y: number }>
}

interface IProps {
  data: Data
  sign: string
}
export const LinePlot: React.FC<IProps> = ({ data, sign }) => {
  const classes = useStyles()
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)

    return date.toLocaleString('en-GB', { hour12: true, timeStyle: 'short', dateStyle: 'short' })
  }

  const getPlotMax = () => {
    const values = data.data.map(point => point.y)
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
        data={[{ id: data.id, data: data.data }]}
        margin={{ top: 10, right: 15, bottom: 30, left: 15 }}
        xScale={{
          type: 'point'
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
          tickValues: 2,

          format: tick => {
            const data = new Date(tick)
            if (data.getDate() % STEP_VALUES === 0) {
              return `${('0' + data.getDate().toString()).slice(-2)}/${(
                '0' + (data.getMonth() + 1).toString()
              ).slice(-2)}`
            } else {
              return ''
            }
          }
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
            { offset: 100, color: 'inherit', opacity: 0 }
          ])
        ]}
        tooltip={({
          point: {
            data: { x, y }
          }
        }) => (
          <div className={classes.tooltipRoot}>
            <Typography className={classes.tooltipDate}>{formatDate(x as number)}</Typography>
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
      />
    </Grid>
  )
}
export default LinePlot
