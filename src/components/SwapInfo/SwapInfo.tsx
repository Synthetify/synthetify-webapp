import AnimatedNumber from '@components/AnimatedNumber'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

interface IProps {
  syntheticName: string
  collateralName: string
  fee: number
  balance: number
  limit: number
}
export const SwapInfo: React.FC<IProps> = ({
  syntheticName,
  collateralName,
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
            <Typography className={classes.positionValue}>{syntheticName}</Typography>
          </Grid>

          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral:</Typography>
            <Typography className={classes.positionValue}>{collateralName}</Typography>
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
              $
              <AnimatedNumber
                value={balance}
                duration={300}
                formatValue={(value: number) => value.toFixed(2)}
              />
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
              $
              <AnimatedNumber
                value={limit}
                duration={300}
                formatValue={(value: number) => value.toFixed(2)}
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container item className={classes.descWrapper}>
          <Typography className={classes.descTitle}>What is Swapline?</Typography>
          <Typography className={classes.descText}>
          The Swapline is a more straightforward way to get synthetic tokens.
          It exists to keep the price of each of the synthetic tokens close to their original counterparts.
          Moreover, without it, amount of synthetic tokens in circulation would be smaller than debt, due to interest rate.
          The Swapline provides a simple way to counteract that.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
