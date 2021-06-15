import React from 'react'
import { CardMedia, Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { printBN } from '@consts/utils'
import useStyles from './style'

export interface IToken {
  ticker: string
  balance: BN
  decimals: 6
  usdValue: number
}

export interface IProps {
  token: IToken
}

export const TokenItem: React.FC<IProps> = ({ token }) => {
  const classes = useStyles()
  const printUSD = new BN(token.usdValue * 1e4)

  const tickerPrefix = ['x', '$']
  const deleteFirstLatter = tickerPrefix.some(prefix => token.ticker.startsWith(prefix))
  const imgName = deleteFirstLatter ? token.ticker.substr(1) : token.ticker
  let icon
  try {
    icon = require(`@static/icons/${imgName.toLowerCase()}.png`)
  } catch (error) {
    icon = require('@static/icons/sny.png')
  }

  return (
    <Grid item xs={12}>
      <Grid container alignItems='center' style={{ flexWrap: 'nowrap' }}>
        <Grid item xs={4}>
          <Grid container>
            <Grid item>
              <CardMedia style={{ width: 32, height: 32, marginRight: 10 }} image={icon} />
            </Grid>
            <Grid item>
              <Typography variant='h5' color='textPrimary' className={classes.tokenSymbol}>
                {token.ticker}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5' color='textPrimary' className={classes.balance}>
            {printBN(token.balance, token.decimals)}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5' color='textPrimary' className={classes.usdValue}>
            $ {printBN(new BN(printUSD), 4)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
