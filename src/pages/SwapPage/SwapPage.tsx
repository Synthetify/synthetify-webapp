import { SwapInfo } from '@components/SwapInfo/SwapInfo'
import { Fade, Grid } from '@material-ui/core'
import React from 'react'

export const SwapPage: React.FC = () => {
  return (
    <Fade in={true}>
      <Grid>
        <SwapInfo
          syntheticName={'SNY'}
          collateralName={'xBTC'}
          fee={0.3}
          accumulatedFee={0.003}
          balance={6234.35}
          limit={345625.39}
        />
      </Grid>
    </Fade>
  )
}
