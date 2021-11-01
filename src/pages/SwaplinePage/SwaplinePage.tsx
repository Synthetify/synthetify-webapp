import React, { useState } from 'react'
import { Fade, Grid, Typography } from '@material-ui/core'
import { WrappedSwaplineComponent } from '@containers/WrappedSwaplineComponent/WrappedSwaplineComponent'
import { useSelector } from 'react-redux'
import { swaplinePairs } from '@selectors/solanaWallet'
import useStyles from './style'
import { SwapInfo } from '@components/SwapInfo/SwapInfo'
import { printDecimal } from '@consts/utils'
import BN from 'bn.js'

export const SwaplinePage: React.FC = () => {
  const classes = useStyles()

  const pairs = useSelector(swaplinePairs)

  const [pairIndex, setPairIndex] = useState<number | null>(pairs.length ? 0 : null)

  const decimalZero = {
    val: new BN(0),
    scale: 6
  }

  return (
    <Fade in={true} >
      <Grid container classes={{ root: classes.root }} className={classes.slide} justifyContent='center'>
        <Grid item className={classes.exchange}>
          <Typography className={classes.title}>Swapline</Typography>
          <Grid container className={classes.row}>
            <Grid item className={classes.plotWrapper}>
              <SwapInfo
                syntheticSymbol={pairs[pairIndex === null ? 0 : pairIndex]?.syntheticData?.symbol ?? ''}
                collateralSymbol={pairs[pairIndex === null ? 0 : pairIndex]?.collateralData?.symbol ?? ''}
                fee={+printDecimal(pairs[pairIndex === null ? 0 : pairIndex]?.fee ?? decimalZero)}
                balance={+printDecimal(
                  pairs?.length
                    ? {
                      val: pairs[pairIndex === null ? 0 : pairIndex].balance.val.sub(pairs[pairIndex === null ? 0 : pairIndex].accumulatedFee.val),
                      scale: pairs[pairIndex === null ? 0 : pairIndex].balance.scale
                    }
                    : decimalZero
                )}
                limit={+printDecimal(pairs[pairIndex === null ? 0 : pairIndex]?.limit ?? decimalZero)}
              />
            </Grid>
            <WrappedSwaplineComponent
              pairs={pairs}
              onSelectPair={setPairIndex}
            />
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  )
}
