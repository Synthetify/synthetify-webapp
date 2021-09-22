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
}
export const LinePlot: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)

    return date.toLocaleString('en-GB', { hour12: true, timeStyle: 'short', dateStyle: 'short' })
  }
  const getPlotMin = () => {
    const values = data.data.map(point => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    if (minValue === maxValue) {
      return minValue - 1
    }

    return minValue - (maxValue - minValue)
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
  const getGradientEnd = () => {
    const values = data.data.map(point => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    if (minValue === maxValue) {
      return 100
    }

    return (100 - (minValue / maxValue) * 100) * 2
  }

  return (
    <Grid className={classes.linePlot}>
      <ResponsiveLine
        data={[{ id: data.id, data: data.data }]}
        margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: getPlotMin(),
          max: getPlotMax()
        }}
        yFormat=' >-.2f'
        curve='catmullRom'
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
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
            { offset: getGradientEnd(), color: 'inherit', opacity: 0 }
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
              {data.id !== 'userCount'
                ? `$ ${(y as number).toFixed(2)}`
                : `${(y as number).toFixed(0)}`}
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
