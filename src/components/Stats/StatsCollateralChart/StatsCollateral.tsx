import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { colors, theme } from '@static/theme'
import { Grid, Typography } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useStyles from './style'

export interface CoinToChart {
  // [index: number]: {
  name: string
  percent: number
  color: string
  // }
}
export interface IProps {
  data: CoinToChart[]
}

export const StatsCollateralChart: React.FC<IProps> = ({ data }) => {
  const classes = useStyles()

  const getCoinsName = (data: CoinToChart[]) => {
    return data.map(coin => coin.name)
  }

  const getNameAndValue = (data: CoinToChart[]) => {
    return [data.reduce((object, { name, percent }) => ({
      [name]: percent.toFixed(2),
      ...object
    }), {})]
  }

  const handleMouseEnter = (_d: any, e: any) => {
    const fill = e.target.getAttribute('fill')
    function hex2rgb(hex: string) {
      const validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as RegExpExecArray
      if (!validHEXInput) {
        return []
      }
      const output = [
        parseInt(validHEXInput[1], 16),
        parseInt(validHEXInput[2], 16),
        parseInt(validHEXInput[3], 16)
      ]
      return output
    }

    const finalColor = hex2rgb(fill).map((x: number): number => {
      return Math.min(x + 12, 255)
    })
    e.target.setAttribute('fill', `rgba(${finalColor[0]},${finalColor[1]},${finalColor[2]})`)
  }

  const handleMouseLeave = (d: any, e: any) => {
    e.target.setAttribute('fill', data.find(x => x.name === d.id)?.color ?? '#ffffff')
  }

  const colorsToBar = data.map(coin => {
    return (coin.color)
  })

  const layoutVertical = !useMediaQuery(theme.breakpoints.down('xs')) // under 600px return false

  return (
    <>
      <Grid container className={classes.root}>
        <Grid container className={classes.headerWrapper} direction="column">
          <Grid item>
            <Typography className={classes.title}>Collateral structure</Typography>
            <Typography className={classes.subTitle}>Chart of total deposit's percentage share for each available collateral</Typography>
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
                labelSkipWidth={35}
                labelSkipHeight={14}
                layout={layoutVertical ? 'horizontal' : 'vertical'}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['brighter', 1.9]] }}
                tooltip={() => null}
                reverse={!layoutVertical}
                theme={{
                  fontSize: layoutVertical ? 14 : 10,
                  textColor: colors.navy.background
                }}
                valueFormat={v => `${v}%`}
              />
            </Grid>
          </div>
          <Grid item className={classes.legendWrapper}>
            <ul className={classes.legendList}>
              {data.map((coin) => (
                <li className={classes.legendItem} key={coin.name} style={{ color: coin.color }}><span>{coin.name}</span> <span style={{ color: '#ffffff' }}><strong>({coin.percent.toFixed(2)}%)</strong></span></li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default StatsCollateralChart
