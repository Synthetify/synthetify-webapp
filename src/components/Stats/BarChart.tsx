import { ResponsiveBar } from '@nivo/bar'
import { colors } from '@static/theme'
import React from 'react'
export interface IProps {
  data: any
}

export const BarChart: React.FC<IProps> = ({ data }) => {
  const getPercentageValue = (value: number) => `${value}%`
  return (
    <ResponsiveBar
      data={data}
      keys={[
        'xBTC',
        'xETH',
        'xSOL',
        'xBNB',
        'xFTT',
        'xUSD',
        'xSRM',
        'xLTC',
        'xAAVE',
        'xDOGE',
        'xLUNA'
      ]}
      margin={{ top: 7, right: 7, bottom: 7, left: 7 }}
      padding={0}
      colors={({ id, data }) => String(data[`${id}Color`])}
      colorsBy='indexValue'
      innerPadding={0}
      layout='horizontal'
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      label={d => getPercentageValue(d.value)}
      borderRadius={5}
      borderWidth={0.5}
      height={100}
      borderColor={{ from: 'color', modifiers: [['brighter', '3.0']] }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridY={false}
      theme={{
        tooltip: {
          container: {
            color: 'white',
            background: colors.navy.button
          }
        },
        fontSize: 13,
        labels: { text: { fontWeight: 700 } }
      }}
      labelSkipWidth={30}
      labelSkipHeight={5}
      labelTextColor='black'
      legends={[]}
    />
  )
}

export default BarChart
