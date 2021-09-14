import React, { useState } from 'react'
import { Fade, Grid, Typography } from '@material-ui/core'
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
    <Fade in={true} >
      <Grid container classes={{ root: classes.root }} className={classes.slide} justifyContent='center'>
        <Grid item className={classes.exchange}>
          <Typography className={classes.title}>Swap</Typography>
          <Grid container direction='row' className={classes.row}>
            <WrappedExchangeComponent
              tokensWithBalance={tokensWithBalance}
              onSelectTokenTo={setTokenToIndex}
            />
            <Grid item className={classes.plotWrapper}>
              <ExchangePlotContainer
                token={tokensWithBalance[tokenToIndex === null ? 0 : tokenToIndex]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  )
}
