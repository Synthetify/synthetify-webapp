import AnimatedNumber from '@components/AnimatedNumber'
import { descrpitionForSymbol } from '@consts/static'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

interface IProps {
  syntheticSymbol: string
  collateralSymbol: string
  fee: number
  balance: number
  limit: number
}
export const SwapInfo: React.FC<IProps> = ({
  syntheticSymbol,
  collateralSymbol,
  fee,
  balance,
  limit
}) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid container item direction='column' className={classes.dataWrapper}>
        <Typography className={classes.title}>Information</Typography>
        <Typography className={classes.description}>Swapline pool parameters</Typography>
        <Grid container item className={classes.tokenInfo}>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Synthetic:</Typography>
            <Typography className={classes.positionValue}>
              {descrpitionForSymbol[syntheticSymbol] ?? 'Unknown'}
            </Typography>
          </Grid>

          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral:</Typography>
            <Typography className={classes.positionValue}>
              {descrpitionForSymbol[collateralSymbol] ?? 'Unknown'}
            </Typography>
          </Grid>

          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Fee:</Typography>

            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={fee}
                duration={300}
                formatValue={(value: number) => (value * 100).toFixed(2)}
              />
              %
            </Typography>
          </Grid>

          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Balance:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={balance}
                duration={300}
                formatValue={(value: number) => value.toFixed(6)}
              />{' '}
              {collateralSymbol}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Limit:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={limit}
                duration={300}
                formatValue={(value: number) => value.toFixed(6)}
              />{' '}
              {collateralSymbol}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.descWrapper}>
          <Typography className={classes.descTitle}>What is Swapline?</Typography>
          <Typography className={classes.descText}>
            Swapline is a more straightforward way to get synthetic tokens. It exists to keep the
            price of each of the synthetic tokens close to their original counterparts. Tokens can
            be swapped from collateral to synthetic as long as the total swapped amount is below the
            swapline limit. They can also be swapped back from synthetic to collateral, as long as
            there are enough tokens in collateral reserve (balance).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
