import React from 'react'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { Grid, Typography, withWidth } from '@material-ui/core'
import { colors } from '@static/theme'

const RewardsMock = ({ width }: { width: Breakpoint }) => {
  let minHeight = 200
  if (width === 'sm' || width === 'xs') {
    minHeight = 320
  }

  return (
    <Grid container alignItems='center' justify='center' style={{ minHeight: minHeight }}>
      <Grid item>
        <Typography
          style={{
            color: colors.gray.light,
            transform: 'rotate(-5deg)',
            fontSize: 32
          }}>
          Available soon!
        </Typography>
      </Grid>
    </Grid>
  )
}

export default withWidth()(RewardsMock)
