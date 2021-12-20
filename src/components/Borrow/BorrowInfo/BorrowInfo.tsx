import { Grid, Hidden, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import { PublicKey } from '@solana/web3.js'
import { CopyPopover } from '@components/CopyPopover/CopyPopover'
import { formatNumbers, showPrefix } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'
interface IGeneralInfo {
  collateralAmount: string
  debtAmount: string
  collateral: string
  borrowed: string
  limit: number
  liqRatio: number
  collateralAddress: PublicKey
  borrowedAddress: PublicKey
  borrowedSign: string
  amountSign: string
  callPrice: string
  borrPrice: string
  interestRate: string,
  cRatio: number
}

export const BorrowInfo: React.FC<IGeneralInfo> = ({
  collateral,
  collateralAddress,
  collateralAmount,
  borrowed,
  borrowedAddress,
  liqRatio,
  limit,
  debtAmount,
  borrowedSign,
  amountSign,
  callPrice,
  borrPrice,
  interestRate,
  cRatio
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
              <Hidden only={['lg', 'xl']}>Coll. amount</Hidden>:
            </Typography>
            <Typography className={classes.positionValue}>
              {amountSign}{' '}
              <AnimatedNumber value={collateralAmount} formatValue={formatNumbers} duration={300} />
              {showPrefix(Number(collateralAmount))}
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
              {amountSign}{' '}
              <AnimatedNumber value={debtAmount} formatValue={formatNumbers} duration={300} />
              {showPrefix(Number(debtAmount))}
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
            <Typography className={classes.positionTitle}>Coll. price:</Typography>
            <Typography className={classes.positionValue}>
              ${' '}
              <AnimatedNumber
                value={callPrice}
                formatValue={(value: string) => Number(value).toFixed(2)}
              />
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Borr. asset price:</Typography>
            <Typography className={classes.positionValue}>
              ${' '}
              <AnimatedNumber
                value={borrPrice}
                formatValue={(value: string) => Number(value).toFixed(2)}
              />
            </Typography>
          </Grid>

          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Left to borrow:</Typography>
            <Typography className={classes.positionValue}>
              {limit.toFixed(3)} {borrowedSign}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Liquidation ratio:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={liqRatio}
                formatValue={(value: number) => value.toFixed(2)}
                duration={300}
              />
              {showPrefix(Number(liqRatio))} %
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral ratio:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={cRatio}
                formatValue={(value: number) => value.toFixed(2)}
                duration={300}
              />
              {showPrefix(Number(cRatio))} %
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Interest rate:</Typography>
            <Typography className={classes.positionValue}>
              {(Number(interestRate) / 100).toFixed(2)} %
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
