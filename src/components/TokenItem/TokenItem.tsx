import React from 'react'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { printBN, removeTickerPrefix } from '@consts/utils'
import useStyles from './style'
import icons from '@static/icons'
import AnimatedNumber from '@components/AnimatedNumber'

export interface IToken {
  ticker: string
  balance: BN
  decimals: number
  usdValue: BN
}

export interface IProps {
  token: IToken
}

export const TokenItem: React.FC<IProps> = ({ token }) => {
  const classes = useStyles()

  const { ticker, balance, decimals, usdValue } = token
  const imgName = removeTickerPrefix(ticker)
  return (
    <Grid container alignItems='center' style={{ flexWrap: 'nowrap' }}>
      <Grid container item xs={4} sm={3} alignItems='center'>
        <Grid item>
          <CardMedia style={{ width: 32, height: 32, marginRight: 18 }} image={icons[imgName] ?? icons.SNY} />
        </Grid>
        <Grid item>
          <Typography variant='h5' color='textPrimary' className={classes.font}>
            {ticker}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4} sm={5}>
        <Typography variant='h5' color='textPrimary' className={classes.font}>
          <AnimatedNumber value={printBN(balance, decimals)} duration={300} formatValue={(value: string) => Number(value).toFixed(decimals)}/>
        </Typography>
      </Grid>
      <Grid container item xs={4} wrap='nowrap'>
        <Grid item style={{ marginRight: 10 }}>
          <Typography variant='h5' color='textPrimary' className={classes.font}>
            $
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='h5' color='textPrimary' className={classes.font}>
            <AnimatedNumber value={printBN(usdValue, 4)} duration={300} formatValue={(value: string) => Number(value).toFixed(4)}/>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
