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
import { PublicKey } from '@solana/web3.js'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { MAX_U64 } from '@consts/static'
import useStyles from './style'
interface IProps {
  tokenName: string
  supply: Decimal
  maxSupply: Decimal
  assetAddress: PublicKey
  price: Decimal
  data: Array<{ x: number, y: number }>
}

interface IDataItem {
  x: number,
  y: number
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
    await navigator.clipboard.writeText(assetAddress.toString())
  }

  const isDecreasing = () => {
    const firstDataValue: IDataItem = [...data].pop() as IDataItem
    const lastDataValue: IDataItem = [...data].shift() as IDataItem
    return firstDataValue.y >= lastDataValue.y
  }

  const getPlotMin = () => {
    const values = data.map((point) => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    if (minValue === maxValue) {
      return minValue - 1
    }

    return minValue - (maxValue - minValue)
  }

  const getPlotMax = () => {
    const values = data.map((point) => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    if (minValue === maxValue) {
      return minValue + 1
    }

    return maxValue * 1.01
  }

  const getGradientEnd = () => {
    const values = data.map((point) => point.y)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)

    if (minValue === maxValue) {
      return 100
    }

    return (100 - (minValue / maxValue * 100)) * 2
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
                formatValue={(value: string) => Number(value).toFixed(6)}
              />
            </Typography>
          </Grid>

          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Max supply:</Typography>
            <Typography className={classes.positionValue}>
              {
                !(maxSupply.val.eq(MAX_U64))
                  ? (
                    <AnimatedNumber
                      value={printBN(maxSupply.val, maxSupply.scale)}
                      duration={300}
                      formatValue={(value: string) => Number(value).toFixed(6)}
                    />
                  )
                  : '∞'
              }
            </Typography>
          </Grid>

          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Asset address:</Typography>
            <Grid container item direction='row' alignItems='center' className={classes.copy}>
              <img src={Copy} alt='' className={classes.copyIcon} onClick={copyAddress} />
              <Typography className={classes.positionValue}>{assetAddress.toString().substr(0, 8)}...</Typography>
            </Grid>
          </Grid>

          <Grid container item className={classes.infoPosition} justifyContent='space-between' alignItems='center'>
            <Typography className={classes.positionTitle}>Price:</Typography>
            <Typography className={classes.positionValue}>
              $
              <AnimatedNumber
                value={printBN(price.val, price.scale)}
                duration={300}
                formatValue={(value: string) => Number(value).toFixed(6)}
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
          colors={isDecreasing() ? colors.green.main : colors.red.main }
          defs={[
            linearGradientDef(
              'gradientA',
              [
                { offset: 0, color: 'inherit' },
                { offset: getGradientEnd(), color: 'inherit', opacity: 0 }
              ]
            )
          ]}
          fill={[{ match: '*', id: 'gradientA' }]}
          tooltip={({ point: { data: { x, y } } }) => (
            <div className={classes.tooltipRoot}>
              <Typography className={classes.tooltipDate}>{formatDate(x as number)}</Typography>
              <Typography className={classes.tooltipValue} style={{ color: isDecreasing() ? colors.green.main : colors.red.main }}>${(y as number).toFixed(2)}</Typography>
              <FiberManualRecordIcon className={classes.tooltipPoint}/>
            </div>
          )}
          theme={{
            crosshair: {
              line: {
                stroke: colors.white.main,
                strokeDasharray: 'none',
                strokeWidth: 0.5,
                strokeOpacity: 1
              }
            }
          }}
          enableArea={true}
        />
      </Grid>
    </Grid>
  )
}

export default ExchangePlot
