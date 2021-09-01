import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ResponsiveBar } from '@nivo/bar'
import { colors } from '@static/theme'
import useStyles from './style'

export const StatsCollateralChart: React.FC = () => {
  const classes = useStyles()

  const [layoutVertical, setLayoutVertical] = useState<boolean>(false)

    interface CoinToChart {
      name: string
      percent: number
      color: string
    }
 

  const data: Array<CoinToChart> = [
    {
      name: 'xBTC',
      percent: 20,
      color: 'rgba(111, 126, 202)'
    },
    {
      name: 'xETH',
      percent: 15,
      color: 'rgba(64, 191, 160)'
    },
    {
      name: 'xSOL',
      percent: 10,
      color: 'rgba(17, 112, 152)'
    },
    {
      name: 'xBNB',
      percent: 7,
      color: 'rgba(191, 182, 101)'
    },

    {
      name: 'xFTT',
      percent: 6.8,
      color: 'rgba(96, 169, 255)'
    },
    {
      name: 'xUSD',
      percent: 5,
      color: 'rgba(204, 175, 241)'
    },
    {
      name: 'xSRM',
      percent: 5,
      color: 'rgba(57, 211, 245)'
    },
    {
      name: 'xLTC',
      percent: 4.5,
      color: 'rgba(218, 220, 241)'
    },
    {
      name: 'xAAVE',
      percent: 3.3,
      color: 'rgba(233, 160, 204)'
    },
    {
      name: 'xDOGE',
      percent: 2.9,
      color: 'rgba(250, 199, 139)'
    },
    {
      name: 'xLUNA',
      percent: 2.2,
      color: 'rgba(223, 60, 60)'
    }
  ]

  const getCoinsName = (data: Array<CoinToChart>) => {
    const nameOfCoins: string[] = []
    data.map(coin => {
      nameOfCoins.push(coin.name)
    })
    return nameOfCoins
  }

  const getNameAndValue = (data: Array<CoinToChart>) => {
    const nameAndValue :{} = {}
    for (let i = 0; i <= data.length - 1; i++) {
      nameAndValue[data[i].name] = data[i].percent
    }
    const helperArray :[] = []
    helperArray.push(nameAndValue)
    return helperArray
  }

  
  const handleMouseEnter = (d: any, e: any) => {
    const fill = e.target.getAttribute('fill')
    let cutStroke = (fill.slice(5, -1))
    cutStroke = cutStroke.split(',')

    cutStroke = cutStroke.map((x: number): number => {
      if (x < 243) {
        return x - (-12)
      } else {
        return x = 255
      }
    })

    const rgbToHex = (r: number, g: number, b: number) :string => '#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
    e.target.setAttribute('fill', (rgbToHex(cutStroke[0], cutStroke[1], cutStroke[2])))
  }

  const handleMouseLeave = (d: any, e: any) => {
    e.target.setAttribute('fill', data.find(x => x.name === d.id).color)
  }

  const colorsToBar = data.map(coin => {
    return (coin.color)
  })


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) setLayoutVertical(true)
      if (window.innerWidth >= 600) setLayoutVertical(false)
    }
    window.addEventListener('resize', handleResize)
  }, [])

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
              { layoutVertical
                ? <ResponsiveBar
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  data={getNameAndValue(data)}
                  keys={getCoinsName(data)}
                  colors={colorsToBar}
                  padding={0} // very important without it, bars will not fill whole container!!
                  isInteractive={true}
                  labelSkipHeight={14}
                  layout="vertical"
                  borderWidth={2}
                  reverse={true}
                  borderColor={{ from: 'color', modifiers: [['brighter', 1.6]] }}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  tooltip={() => null}
                  theme={{
                    fontSize: 10,
                    textColor: colors.navy.background
                  }}
                  valueFormat={v => `${v}%`}
                />
                : <ResponsiveBar
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  data={getNameAndValue(data)}
                  keys={getCoinsName(data)}
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
          <Grid item className={classes.legendWrapper}>
            <ul>
              {data.map((coin) => (
                <li key={coin.name} style={{ color: coin.color }}><span>{coin.name}</span> <span style={{ color: '#ffffff'}}><strong>({coin.percent}%)</strong></span></li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default StatsCollateralChart