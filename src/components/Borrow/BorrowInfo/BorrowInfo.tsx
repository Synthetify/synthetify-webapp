import { Grid, Hidden, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { PublicKey } from '@solana/web3.js'
import { CopyPopover } from '@components/CopyPopover/CopyPopover'
interface IGeneralInfo {
  collateralAmount: number
  debtAmount: number
  collateral: string
  borrowed: string
  limit: number
  reserve: number
  collateralAddress: PublicKey
  borrowedAddress: PublicKey
  collateralSign: string
  borrowedSign: string
  amountSign: string
}

export const BorrowInfo: React.FC<IGeneralInfo> = ({
  collateral,
  collateralAddress,
  collateralAmount,
  borrowed,
  borrowedAddress,
  reserve,
  limit,
  debtAmount,
  collateralSign,
  borrowedSign,
  amountSign
}) => {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Grid className={classes.wrapper}>
        <Typography className={classes.infoTitle}>Totals</Typography>
        <Grid container item className={classes.infoWrapper}>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>
              <Hidden mdDown>Collateral amount</Hidden>{' '}
              <Hidden only={['lg', 'xl']}>Coll. amount</Hidden>({collateral}):
            </Typography>
            <Typography className={classes.positionValue}>{collateralAmount.toFixed(3)}</Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Debt amount:</Typography>
            <Typography className={classes.positionValue}>
              {amountSign} {debtAmount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.wrapper}>
        <Typography className={classes.infoTitle}> General info</Typography>
        <Grid className={classes.infoWrapper}>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral:</Typography>
            <Typography className={classes.positionValue}>{collateral}</Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Borrowed asset:</Typography>
            <Typography className={classes.positionValue}>{borrowed}</Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Limit:</Typography>
            <Typography className={classes.positionValue}>
              {limit} {borrowedSign}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Reserve:</Typography>
            <Typography className={classes.positionValue}>
              {reserve} {collateralSign}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>
              <Hidden mdDown>Collateral address:</Hidden>{' '}
              <Hidden only={['lg', 'xl']}>Coll. address:</Hidden>
            </Typography>
            <Grid container style={{ width: 'max-content' }}>
              <CopyPopover address={collateralAddress} />
              <Typography className={classes.positionValue}>
                {collateralAddress.toString().substr(0, 6)}...
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>
              <Hidden mdDown>Borrowed asset address:</Hidden>
              <Hidden only={['lg', 'xl']}>Borr. address:</Hidden>
            </Typography>
            <Grid container style={{ width: 'max-content' }}>
              <CopyPopover address={borrowedAddress} />
              <Typography className={classes.positionValue}>
                {borrowedAddress.toString().substr(0, 6)}...
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
