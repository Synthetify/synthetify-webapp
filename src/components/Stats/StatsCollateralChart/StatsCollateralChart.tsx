import React from 'react'
import useStyles from './style'
import { Grid, Typography, Divider, Hidden, IconButton } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'

export const StatsCollateralChart: React.FC = () => {
  const classes = useStyles()

  const data = [
    {
      name: 'xBTC',
      num: 20,
      color: "#6F7ECA"
    },
    {
      name:'xETH',
      num: 15,
      color: "#40BFA0"
    },
    {
      name:"xSOL",
      num: 10,
      color: "#117098"
    },
    {
      name:"xBNB",
      num: 7,
      color: "#BFB665"},
      
    { name:"xFTT",
      num: 6.8,
      color: "#1F70CF"
    },
    {
      name:"xUSD",
      num: 5,
      color: "#936BC7"},
    {
      name:"xSRM",
      num: 5,
      color: "#39D3F5"},
    {
      name:"xLTC",
      num: 4.5,
      color: "#DADCF1"},
    {
      name:"xAAVE",
      num: 3.3,
      color: "#C76BA2",},

    {
      name:"xDOGE",  
      num: 2.9,
      color: "#D49347",},
    {
      name:"xLUNA",
      num: 2.2,
      color: "#DF3C3C",},
    ]

    const data2 = [
        {
          BTC: 20,
          BTCColor: "#6F7ECA",
          ETH: 15,
          ETHColor: "#40BFA0",
          SOL: 10,
          SOLColor: "#117098",
          BNB: 7,
          BNBColor: "#BFB665",
          FTT: 6.8,
          FTTColor: "#1F70CF",
          USD: 5,
          USDColor: "#936BC7",
          SRM: 5,
          SRMColor: "#39D3F5",
          LTC: 4.5,
          LTCColor: "#DADCF1",
          AAVE: 3.3,
          AAVEColor: "#C76BA2",
          DOGE: 2.9,
          DOGEColor: "#D49347",
          LUNA: 2.2,
          LUNAColor: "#DF3C3C"}]
  return (
    <>
    <div className={classes.chartWrapper}>
    <ResponsiveBar
        data={data2}
        keys={[ 'BTC', 'ETH', 'SOL', 'BNB', 'FTT', 'USD', 'SRM', 'LTC', 'AAVE', 'DOGE', 'LUNA' ]}
        indexBy="country"
        margin={{ top: -4, right: 0, bottom: -4., left: 0 }}
        layout="horizontal"
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        labelTextColor="black"

    />
      <ul className={classes.legendWrapper}>
      {data.map((user) => (
        <li style={{color: user.color}}>{user.name}</li>
      ))}
      </ul>
    </div>
    <div>


    
        
    </div>
    </>
  )
}

export default StatsCollateralChart
