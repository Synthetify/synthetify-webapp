import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import {dataPie, IDataPie} from './../../mockedData'

export interface PieProps {
    data:IDataPie[]
}

export const PieDiagram = () => {
    return (
        <div style={{width:"400px", height:"400px",backgroundColor:"#1c1c39",borderRadius:"24px",padding:"12px 18px"}}>
            <div style={{display:"flex",flexDirection:"column",width:"100%", height:"100%",}}>
                <h1 style={{margin:"0",color:"white"}}>Dept pool</h1>
                <p style={{margin:"0",color:"#3f3f71"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <ResponsivePie
                    data={dataPie}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0}
                    padAngle={0.7}
                    cornerRadius={0}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    enableArcLinkLabels={false}
                    enableArcLabels={false}
                    borderColor="white"
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
                    
                    
                />
            </div>
        </div>
    )
}


