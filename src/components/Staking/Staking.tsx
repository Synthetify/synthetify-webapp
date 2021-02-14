import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import SolanaIcon from '@static/svg/solana.svg'
import CommonButton from '@components/CommonButton/CommonButton'
import { SolanaNetworks } from '@web3/connection'

export interface IStaking {}
export const Stacking: React.FC<IStaking> = () => {
  const classes = useStyles()
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant='h3' className={classes.titleText}>
          Staked value
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='h3' className={classes.titleText}>
          Collateral ratio
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='h3' className={classes.titleText}>
          Current debt
        </Typography>
      </Grid>
    </Grid>
  )
}
export default Stacking
