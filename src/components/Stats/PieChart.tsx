import { ResponsivePie } from '@nivo/pie'
import { colors } from '@static/theme'
import React from 'react'
import statsColors from './ColorScheme'
export interface IProps {
  data: any
}
export const PieChart: React.FC<IProps> = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      height={350}
      colors={statsColors}
      colorBy='index'
      sortByValue={true}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['brighter', '1.1']] }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      theme={{
        tooltip: {
          container: {
            color: 'white',
            background: colors.navy.button
          }
        }
      }}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      legends={[]}
    />
  )
}

export default PieChart
