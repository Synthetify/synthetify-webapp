import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { colors } from '@static/theme'
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useStyles from './style'

export const StatsCollateralChart: React.FC = () => {
  const classes = useStyles()

  interface CoinToChart {
    name: string
    percent: number
    color: string
  }

  const data: CoinToChart[] = [
    {
      name: 'xBTC',
      percent: 20,
      color: '#6372BE'
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

  const getCoinsName = (data: CoinToChart[]) => {
    const nameOfCoins: string[] = []
    data.map(coin => {
      nameOfCoins.push(coin.name)
    })
    return nameOfCoins
  }

  const getNameAndValue = (data: CoinToChart[]) => {
    const nameAndValue: {[key: string]: number} = {}
    for (let i = 0; i <= data.length - 1; i++) {
      nameAndValue[data[i].name] = data[i].percent
    }
    const helperArray: Array<{[key: string]: number}> = []
    helperArray.push(nameAndValue)
    return helperArray
  }

  const handleMouseEnter = (d: any, e: any) => {
    const fill = e.target.getAttribute('fill')
    function hex2rgb(hex: string) {
      const validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      if (!validHEXInput) {
        return false
      }
      const output = [
        parseInt(validHEXInput[1], 16),
        parseInt(validHEXInput[2], 16),
        parseInt(validHEXInput[3], 16)
      ]
      return output
    }

    const finalColor = hex2rgb(fill).map((x: number): number => {
      if (x < 243) {
        return x - (-12)
      } else {
        return x = 255
      }
    })
    e.target.setAttribute('fill', `rgba(${finalColor[0]},${finalColor[1]},${finalColor[2]})`)
  }

  const handleMouseLeave = (d: any, e: any) => {
    e.target.setAttribute('fill', data.find(x => x.name === d.id).color)
  }

  const colorsToBar = data.map(coin => {
    return (coin.color)
  })

  const layoutVertical = useMediaQuery('(min-width:600px)') // under 600px return false
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
            <Grid item className={classes.chartWrapper}>
              <ResponsiveBar
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data={getNameAndValue(data)}
                keys={getCoinsName(data)}
                colors={colorsToBar}
                padding={0}
                margin={{ top: -2, right: -2, bottom: -2, left: -2 }} // very important without it, bars will not fill whole container!!
                isInteractive={true}
                labelSkipWidth={layoutVertical && 35 }
                labelSkipHeight={!layoutVertical && 14}
                layout={layoutVertical ? 'horizontal' : 'vertical'}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['brighter', 1.9]] }}
                tooltip={() => null}
                reverse={!layoutVertical && true}
                theme={{
                  fontSize: 14,
                  textColor: colors.navy.background
                }}
                valueFormat={v => `${v}%`}
              />
            </Grid>
          </div>
          <Grid item className={classes.legendWrapper}>
            <ul className={classes.legendList}>
              {data.map((coin) => (
                <li className={classes.legendItem} key={coin.name} style={{ color: coin.color }}><span>{coin.name}</span> <span style={{ color: '#ffffff' }}><strong>({coin.percent}%)</strong></span></li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default StatsCollateralChart
