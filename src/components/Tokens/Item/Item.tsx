import React from 'react'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { printBN, showMorK } from '@consts/utils'
import useStyles from './style'
import icons from '@static/icons'
import AnimatedNumber from '@components/AnimatedNumber'

export interface IToken {
  ticker: string
  balance: BN
  decimals: number
  usdValue: BN,
  assetDecimals: number
}

export const Item: React.FC<IToken> = ({ ticker, balance, decimals, usdValue, assetDecimals }) => {
  const classes = useStyles()

  const formatNumbers = (value: string) => {
    const num = Number(value)

    if (num < 10) {
      return num.toFixed(6)
    }

    if (num < 1000) {
      return num.toFixed(4)
    }

    if (num < 10000) {
      return num.toFixed(2)
    }

    if (num < 1000000) {
      return (num / 1000).toFixed(2)
    }

    return (num / 1000000).toFixed(2)
  }

  return (
    <Grid container className={classes.row} alignItems='center' wrap='nowrap' justifyContent='space-between'>
      <Grid className={classes.column} container item alignItems='center'>
        <CardMedia className={classes.icon} image={icons[ticker] ?? icons.SNY} />
        <Typography className={classes.font}>
          {ticker}
        </Typography>
      </Grid>
      <Grid className={classes.column} container item alignItems='center'>
        <Typography className={classes.font}>
          <AnimatedNumber value={printBN(balance, assetDecimals)} duration={300} formatValue={formatNumbers}/>
          {showMorK(+printBN(balance, assetDecimals))}
        </Typography>
      </Grid>
      <Grid className={classes.column} container item alignItems='center'>
        <Typography className={classes.font}>
          $ <AnimatedNumber value={printBN(usdValue, decimals)} duration={300} formatValue={formatNumbers}/>
          {showMorK(+printBN(usdValue, decimals))}
        </Typography>
      </Grid>
    </Grid>
  )
}
