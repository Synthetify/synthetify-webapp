import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { WrappedExchangeComponent } from '@containers/WrappedExchangeComponent/WrappedExchangeComponent'
import { useSelector } from 'react-redux'
import { exchangeTokensWithUserBalance } from '@selectors/solanaWallet'
import useStyles from './style'
import ExchangePlotContainer from '@containers/ExchangePlotContainer/ExchangePlotContainer'

export const ExchangePage: React.FC = () => {
  const classes = useStyles()

  const tokensWithBalance = useSelector(exchangeTokensWithUserBalance)

  const [tokenToIndex, setTokenToIndex] = useState<number | null>(null)

  return (
    <Grid container className={classes.root} justifyContent='center'>
      <Grid item className={classes.exchange}>
        <Typography className={classes.title}>Swap</Typography>
        <WrappedExchangeComponent
          tokensWithBalance={tokensWithBalance}
          onSelectTokenTo={setTokenToIndex}
        />
        <ExchangePlotContainer
          token={tokensWithBalance[tokenToIndex === null ? 0 : tokenToIndex]}
        />
      </Grid>
    </Grid>
  )
}
