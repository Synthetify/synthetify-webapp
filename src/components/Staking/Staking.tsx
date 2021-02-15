import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import SolanaIcon from '@static/svg/solana.svg'
import CommonButton from '@components/CommonButton/CommonButton'
import { SolanaNetworks } from '@web3/connection'
import BN from 'bn.js'
import { transformBN } from '@consts/utils'

export interface IStaking {
  stakedValue: BN
  collateralRatio: BN
  debt: BN
}
export const Stacking: React.FC<IStaking> = ({ debt, collateralRatio, stakedValue }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} justify='center'>
      <Grid item xs={12} className={classes.userStats}>
        <Grid container style={{ width: '100%' }}>
          <Grid item xs={4}>
            <Typography variant='h3' className={classes.titleText}>
              Staked value
            </Typography>
            <Typography variant='h2' className={classes.titleValueText}>
              {transformBN(stakedValue)}$
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h3' className={classes.titleText}>
              Collateral ratio
            </Typography>
            <Typography variant='h2' className={classes.titleValueText}>
              {collateralRatio.toString()}%
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h3' className={classes.titleText}>
              Current debt
            </Typography>
            <Typography variant='h2' className={classes.titleValueText}>
              {transformBN(debt)}$
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Stacking
