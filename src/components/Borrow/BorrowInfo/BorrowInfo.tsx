import { Grid, Typography } from '@material-ui/core'
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
              Collateral amount ({collateral}):
            </Typography>
            <Typography className={classes.positionValue}>
              {amountSign} {collateralAmount}
            </Typography>
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
              {borrowedSign} {limit}
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
              {collateralSign} {reserve}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral address:</Typography>
            <CopyPopover address={collateralAddress} />
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Borrowed asset address:</Typography>
            <CopyPopover address={borrowedAddress} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
