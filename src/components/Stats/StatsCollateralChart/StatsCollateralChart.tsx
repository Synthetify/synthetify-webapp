import React, { useEffect, useState } from 'react'
import useStyles from './style'
import { Grid, Typography, Divider, Hidden, IconButton, Container } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import { colors } from '@static/theme'

export const StatsCollateralChart: React.FC = () => {
  const classes = useStyles()

  const [layoutVertical, setLayoutVertical] = useState(false)
  const data = [
    {
      name: 'xBTC',
      percent: 20,
      color: '#6F7ECA'
    },
    {
      name: 'xETH',
      percent: 15,
      color: '#40BFA0'
    },
    {
      name: 'xSOL',
      percent: 10,
      color: '#117098'
    },
    {
      name: 'xBNB',
      percent: 7,
      color: '#BFB665'
    },

    {
      name: 'xFTT',
      percent: 6.8,
      color: '#1F70CF'
    },
    {
      name: 'xUSD',
      percent: 5,
      color: '#936BC7'
    },
    {
      name: 'xSRM',
      percent: 5,
      color: '#39D3F5'
    },
    {
      name: 'xLTC',
      percent: 4.5,
      color: '#DADCF1'
    },
    {
      name: 'xAAVE',
      percent: 3.3,
      color: '#C76BA2'
    },

    {
      name: 'xDOGE',
      percent: 2.9,
      color: '#D49347'
    },
    {
      name: 'xLUNA',
      percent: 2.2,
      color: '#DF3C3C'
    }
  ]

  const getNameCoins = (data) => {
    const nameOfCoins = []
    data.map(coin => {
      nameOfCoins.push(coin.name)
    })
    return nameOfCoins
  }

  const getNameAndValue = (data) => {
    const nameAndValue = {}
    for (let i = 0; i <= data.length - 1; i++) {
      nameAndValue[data[i].name] = data[i].percent
    }
    const helperArray = []
    helperArray.push(nameAndValue)
    return helperArray
  }
  const handleMouseEnter = (d: any, e: any) => {
    const fill = e.target.getAttribute('fill')
    const stroke = e.target.getAttribute('stroke')
    let cutStroke = (stroke.slice(4, -1))

    cutStroke = cutStroke.split(',')
    console.log(cutStroke)
    cutStroke = cutStroke.map(x => x - (-12))

    const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
    // e.target.setAttribute('fill', (rgbToHex(cutStroke[0], cutStroke[1], cutStroke[2])))
    //  console.log('rgb(196, 223, 255)')
    // console.log('rgb(208, 235, 267)')
  }

  const colorsToBar = data.map(coin => {
    return (coin.color)
  })

  const returnAllCoin = (data) => {
    data.map((coin) => {
      return coin
    })
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) setLayoutVertical(true)
      if (window.innerWidth >= 600) setLayoutVertical(false)
    }
    window.addEventListener('resize', handleResize)
  })

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.headerWrapper} direction="column">
          <Grid item>
            <Typography className={classes.title}>Collateral structure</Typography>
            <Typography className={classes.subTitle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.statsWrapper}>
          <div className={classes.border}>
            <Grid container className={classes.chartWrapper}>
              { layoutVertical
                ? <ResponsiveBar
                  onMouseEnter={handleMouseEnter}
                  data={getNameAndValue(data)}
                  keys={getNameCoins(data)}
                  colors={colorsToBar}
                  padding={0} // very important without it, bars will not fill whole container!!
                  isInteractive={true}
                  labelSkipHeight={16}
                  layout="vertical"
                  borderWidth={2}
                  reverse={true}
                  borderColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
                  margin={{ top: -2, right: -2, bottom: -2, left: -2 }}
                  tooltip={() => null}
                  theme={{
                    fontSize: 16,
                    textColor: colors.navy.background
                  }}
                  valueFormat={v => `${v}%`}
                />
                : <ResponsiveBar
                  onMouseEnter={handleMouseEnter}
                  data={getNameAndValue(data)}
                  keys={getNameCoins(data)}
                  colors={colorsToBar}
                  padding={0} // very important without it, bars will not fill whole container!!
                  isInteractive={true}
                  labelSkipWidth={40}
                  layout="horizontal"
                  borderWidth={2}
                  borderColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
                  margin={{ top: -2, right: -2, bottom: -2, left: -2 }}
                  tooltip={() => null}
                  theme={{
                    fontSize: 16,
                    textColor: colors.navy.background
                  }}
                  valueFormat={v => `${v}%`}
                />

              }

            </Grid>
          </div>
          {/* <Grid container> */}
            {/* <Grid item> */}
            <ul className={classes.legendWrapper}>
              {data.map((coin) => (
                <li className={classes.legendItem} style={{ color: coin.color }}><span>{coin.name}</span> <span style={{ color: '#ffffff' }}>({coin.percent}%)</span></li>
              ))}
            </ul>
            {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
      </div>
    </>
  )
}

export default StatsCollateralChart
