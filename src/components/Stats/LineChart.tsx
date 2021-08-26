import { ResponsiveLine } from '@nivo/line'
import React from 'react'
import { linearGradientDef } from '@nivo/core'
import { colors } from '@static/theme'
export interface IProps {
  activeStat: string,
  data: any
}

export const LineChart: React.FC<IProps> = ({ activeStat, data }) => {
  return (
    <>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 10, bottom: 70, left: 10 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve='basis'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 3,
          tickPadding: 0,
          tickRotation: 0
        }}
        defs={[
          linearGradientDef('gradientA', [
            { offset: 0, color: 'inherit' },
            { offset: 100, color: 'inherit', opacity: 0 }
          ])
        ]}
        axisLeft={null}
        colors='#43E7B9'
        enableGridX={false}
        enableGridY={false}
        lineWidth={1}
        enablePoints={false}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaBlendMode='normal'
        fill={[{ match: '*', id: 'gradientA' }]}
        areaOpacity={0.2}
        enableSlices='x'
        crosshairType='y'
        legends={[]}
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: colors.navy.button,
                padding: '5px',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
              <div style={{ color: 'white' }}>{slice.x0}</div>
              {slice.points.map(point => (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0'
                  }}>
                  {`$${point.data.yFormatted}`}
                </div>
              ))}
            </div>
          )
        }}
      />
    </>
  )
}

export default LineChart
