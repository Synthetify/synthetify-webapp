import React from 'react'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { printBN, removeTickerPrefix } from '@consts/utils'
import useStyles from './style'
const modules = import.meta.globEager('../../static/icons/*.svg')
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
  let icon
  try {
    icon = modules[`../../static/icons/${imgName.toLowerCase()}.svg`].default
  } catch (error) {
    icon = modules['../../static/icons/sny.svg'].default
  }
  return (
    <Grid container alignItems='center' style={{ flexWrap: 'nowrap' }}>
      <Grid container item xs={3} alignItems='center'>
        <Grid item>
          <CardMedia style={{ width: 32, height: 32, marginRight: 18 }} image={icon} />
        </Grid>
        <Grid item className={classes.hideOnXs}>
          <Typography variant='h5' color='textPrimary' className={classes.font}>
            {ticker}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Typography variant='h5' color='textPrimary' className={classes.font}>
          {printBN(balance, decimals)}
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
            {printBN(usdValue, 4)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
