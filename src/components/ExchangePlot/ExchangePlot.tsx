import AnimatedNumber from '@components/AnimatedNumber'
import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import Copy from '@static/svg/copy.svg'
import { ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
// @ts-expect-error
import { linearGradientDef } from '@nivo/core' // ignore error, this function exists, probably has no ts definition
import useStyles from './style'

interface IProps {
  tokenName: string
  supply: Decimal
  maxSupply: Decimal
  assetAddress: string
  price: Decimal
  data: Array<{ x: number, y: number }>
}

const ExchangePlot: React.FC<IProps> = ({
  tokenName,
  supply,
  maxSupply,
  assetAddress,
  price,
  data
}) => {
  const classes = useStyles()

  const copyAddress = async () => {
    await navigator.clipboard.writeText(assetAddress)
  }

  const getPlotMin = () => {
    const values = data.map((point) => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    return minValue - (maxValue - minValue)
  }

  const getPlotMax = () => {
    const values = data.map((point) => point.y)
    const maxValue = Math.max(...values)

    return maxValue * 1.01
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)

    return date.toLocaleString('en-GB', { hour12: true, timeStyle: 'short', dateStyle: 'short' })
  }

  return (
    <Grid container className={classes.root}>
      <Grid container item direction='column' className={classes.dataWrapper}>
        <Typography className={classes.title}>{tokenName}</Typography>
        <Typography className={classes.description}>Info about token you want to swap to</Typography>
        <Grid container item className={classes.tokenInfo}>
          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Supply:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={printBN(supply.val, supply.scale)}
                duration={300}
              />
            </Typography>
          </Grid>

          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Max supply:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={printBN(maxSupply.val, maxSupply.scale)}
                duration={300}
              />
            </Typography>
          </Grid>

          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Asset address:</Typography>
            <Grid container item direction='row' alignItems='center' className={classes.copy}>
              <img src={Copy} alt='' className={classes.copyIcon} onClick={copyAddress} />
              <Typography className={classes.positionValue}>{assetAddress.substr(0, 14)}...</Typography>
            </Grid>
          </Grid>

          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Price:</Typography>
            <Typography className={classes.positionValue}>
              $
              <AnimatedNumber
                value={printBN(price.val, price.scale)}
                duration={300}
              />
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container item className={classes.plotWrapper}>
        <ResponsiveLine
          data={[
            {
              id: 'plot',
              data
            }
          ]}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: getPlotMin(),
            max: getPlotMax()
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridX={false}
          enableGridY={false}
          enablePoints={false}
          crosshairType="bottom"
          useMesh={true}
          colors={[colors.green.main]}
          defs={[
            linearGradientDef(
              'plotGradient',
              [
                { offset: 0, color: colors.green.main },
                { offset: 100, color: colors.green.main, opacity: 0 }
              ]
            )
          ]}
          fill={[{ match: '*', id: 'plotGradient' }]}
          tooltip={({ point: { data: { x, y } } }) => (
            <div className={classes.tooltipRoot}>
              <Typography className={classes.tooltipDate}>{formatDate(x as number)}</Typography>
              <Typography className={classes.tooltipValue}>${(y as number).toFixed(2)}</Typography>
            </div>
          )}
          theme={{
            crosshair: {
              line: {
                stroke: colors.white.main,
                strokeDasharray: '0',
                strokeWidth: 0.5,
                strokeOpacity: 1
              }
            }
          }}
        />
      </Grid>
    </Grid>
  )
}

export default ExchangePlot