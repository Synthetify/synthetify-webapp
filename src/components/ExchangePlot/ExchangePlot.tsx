import AnimatedNumber from '@components/AnimatedNumber'
import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import Copy from '@static/svg/copy.svg'
import { ResponsiveLine } from '@nivo/line'
import { colors } from '@static/theme'
import useStyles from './style'

interface IProps {
  tokenName: string
  supply: Decimal
  maxSupply: Decimal
  assetAddress: string
  price: Decimal
  data: any
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

  return (
    <Grid container className={classes.root}>
      <Grid container item direction='column' className={classes.dataWrapper}>
        <Typography className={classes.title}>{tokenName}</Typography>
        <Typography className={classes.description}>Info about token you want to get</Typography>
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
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
          yFormat=" >-.2f"
          curve="basis"
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
            {
              id: 'gradientA',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: 'inherit' },
                { offset: 100, color: 'inherit', opacity: 0 }
              ]
            }
          ]}
          fill={[{ match: '*', id: 'gradientA' }]}
        />
      </Grid>
    </Grid>
  )
}

export default ExchangePlot
