import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { printBN } from '@consts/utils'
import useStyles from './style'

export interface IToken {
  symbol: string
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

  return (
    <Grid item xs={12}>
      <Grid container alignItems='center' style={{ flexWrap: 'nowrap' }}>
        <Grid item xs={4}>
          {/*  TODO: ICON*/}
          <Typography variant='h5' color='textPrimary' className={classes.tokenSymbol}>
            {token.symbol}
          </Typography>
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
