import React from 'react'
import { ResponsiveLine} from '@nivo/line'
import {ScaleSpec} from '@nivo/scales'
import {AxisProps} from '@nivo/axes'
import {Idata, data} from './mockedData'

export interface Props {
    data:Idata[]
}

export const LineDiagram = () => {

    const margin = {
        top: 50,
        right: 110,
        bottom: 50,
        left: 60
    };

    const xScale:ScaleSpec = {
        type:"point",
    }

    const yScale:ScaleSpec = {
        type:"linear",
        min:'auto',
        max:'auto',
        stacked:true,
        reverse:false
    }

    const axisBottom:AxisProps = {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
    }
    const axisLeft:AxisProps = {
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
    }

    return (
        <div style={{width:"100%", height:"300px"}}>
            <ResponsiveLine
                data={data}
                margin={margin}
                curve="natural"
                yFormat=">-.2f"
                yScale={yScale}
                xScale={xScale}
                axisTop={null}
                axisRight={null}
                axisBottom={axisBottom}
                axisLeft={axisLeft}
                pointSize={4}
                enableArea={true}
                areaOpacity={1}
                pointColor="#ffffff"
                pointBorderWidth={0}
                crosshairType="bottom"
                pointBorderColor="#ffffff"
                pointLabelYOffset={-12}
                useMesh={true}
                enableGridX={false}
                enableGridY={false}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 116,
                        translateY: -5,
                        itemsSpacing: 6,
                        itemDirection: 'left-to-right',
                        itemWidth: 78,
                        itemHeight: 23,
                        itemOpacity: 0.75,
                        symbolSize: 15,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
        
    )
}
