import React from 'react'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { printBN } from '@consts/utils'
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

  return (
    <Grid container className={classes.row} alignItems='center' wrap='nowrap'>
      <Grid container item xs={4} alignItems='center'>
        <CardMedia className={classes.icon} image={icons[ticker] ?? icons.SNY} />
        <Typography className={classes.font}>
          {ticker}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.font}>
          <AnimatedNumber value={printBN(balance, assetDecimals)} duration={300} formatValue={(value: string) => Number(value).toFixed(assetDecimals)}/>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.font}>
          $ <AnimatedNumber value={printBN(usdValue, decimals)} duration={300} formatValue={(value: string) => Number(value).toFixed(4)}/>
        </Typography>
      </Grid>
    </Grid>
  )
}
