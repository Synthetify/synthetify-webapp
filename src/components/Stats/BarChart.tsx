import { ResponsiveBar } from '@nivo/bar'
import React from 'react'
import colors from './ColorScheme'

export interface IProps {
  data: any
}

export const BarChart: React.FC<IProps> = ({ data }) => {
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
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      color={colors}
      colorBy='id'
      padding={0}
      innerPadding={1}
      layout='horizontal'
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      valueFormat={{ format: '', enabled: false }}
      borderRadius={5}
      borderWidth={1}
      height={100}
      borderColor={{ from: 'color', modifiers: [['darker', '2.6']] }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={null}
      enableGridY={false}
      labelSkipWidth={5}
      labelSkipHeight={5}
      labelTextColor='black'
      legends={[]}
    />
  )
}

export default BarChart
