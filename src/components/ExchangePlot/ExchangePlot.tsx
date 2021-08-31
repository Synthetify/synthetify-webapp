import AnimatedNumber from '@components/AnimatedNumber'
import { printBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import Copy from '@static/svg/copy.svg'
import useStyles from './style'

interface IProps {
  tokenName: string
  supply: Decimal
  maxSupply: Decimal
  assetAddress: string
  price: Decimal
}

const ExchangePlot: React.FC<IProps> = ({
  tokenName,
  supply,
  maxSupply,
  assetAddress,
  price
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
      <Grid container item className={classes.plotWrapper}></Grid>
    </Grid>
  )
}

export default ExchangePlot
