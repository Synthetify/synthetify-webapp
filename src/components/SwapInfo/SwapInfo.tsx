import AnimatedNumber from '@components/AnimatedNumber'
import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

interface IProps {
  syntheticName: string
  collateralName: string
  fee: number
  accumulatedFee: number
  balance: number
  limit: number
}
export const SwapInfo: React.FC<IProps> = ({
  syntheticName,
  collateralName,
  fee,
  accumulatedFee,
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
                formatValue={(value: number) => value.toFixed(2)}
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
            <Typography className={classes.positionTitle}>Accumulated Fee:</Typography>
            <Typography className={classes.positionValue}>
              <AnimatedNumber
                value={accumulatedFee}
                duration={300}
                formatValue={(value: number) => value.toFixed(3)}
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
          <Typography className={classes.descTitle}> Lorem impsum itd itp</Typography>
          <Typography className={classes.descText}>
            Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nibh
            dui, tempor eget pharetra vitae, semper a urna. Sed mi augue, molestie et ligula ut,
            ullamcorper pretium purus. Aliquam lacinia placerat diam ut lobortis. Fusce lacinia, sem
            non faucibus aliquam, ipsum quam gravida ligula, ac faucibus justo orci quis.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
