import { SwapInfo } from '@components/SwapInfo/SwapInfo'
import { Fade, Grid } from '@material-ui/core'
import React from 'react'

export const SwapPage: React.FC = () => {
  return (
    <Fade in={true}>
      <Grid>
        <SwapInfo />
      </Grid>
    </Fade>
  )
}
