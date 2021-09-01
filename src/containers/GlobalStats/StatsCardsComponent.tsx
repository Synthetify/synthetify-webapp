import React from 'react'
import { Grid } from '@material-ui/core'
import StatsCard from '@components/stats/StatsCard'

export const StatsCardsComponent: React.FC = () => {
  return (
    <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
      <Grid item xs={12} sm={6} md={4} lg>
        <StatsCard name='Volument' value='450456'></StatsCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg>
        <StatsCard name='Debt' value='4456'></StatsCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg>
        <StatsCard name='Fee' value='1450456'></StatsCard>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg>
        <StatsCard name='Mint' value='450'></StatsCard>
      </Grid>
      <Grid item xs={12} md={6} lg>
        <StatsCard name='Burn' value='45456'></StatsCard>
      </Grid>
    </Grid>
  )
}

export default StatsCardsComponent
