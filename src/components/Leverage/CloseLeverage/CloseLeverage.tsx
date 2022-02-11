import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Divider, Grid, Popover, Slider, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
export interface ICloseLeverage {
  open: boolean
  handleClose: () => void
  tokenFrom: string
  tokenTo: string
  leverage: string
  percent: number
  amount: string
}
export const CloseLeverage: React.FC<ICloseLeverage> = ({
  open,
  handleClose,
  tokenFrom,
  tokenTo,
  leverage,
  percent,
  amount
}) => {
  const classes = useStyles()
  return (
    <Popover open={open} onClose={handleClose} classes={{ paper: classes.popover }}>
      <Grid>
        <Typography className={classes.headerTitle}>Close leverage</Typography>
      </Grid>

      <Divider className={classes.divider} style={{ marginTop: '20px' }} />
      <Grid className={classes.mainGrid}>
        <Grid style={{ paddingBottom: '16px' }}>
          <Grid container justifyContent='space-between'>
            <Typography className={classes.infoTitle}>Pair:</Typography>
            <Typography className={classes.infoValue}>
              {tokenFrom}/{tokenTo}
            </Typography>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Typography className={classes.infoTitle}>Repaying:</Typography>
            <Typography className={classes.infoValue}>xETH</Typography>
          </Grid>
          <Grid container justifyContent='space-between'>
            <Typography className={classes.infoTitle}>Leverage:</Typography>
            <Typography className={classes.infoValue}>{leverage}x</Typography>
          </Grid>
        </Grid>
        <Grid style={{ paddingBottom: '16px' }}>
          <Typography className={classes.infoTitle} style={{ paddingBottom: '16px' }}>
            Amount
          </Typography>

          <Slider
            className={classes.slider}
            classes={{
              rail: classes.sliderRail,
              track: classes.sliderTrack,
              thumb: classes.sliderThumb
            }}
            // onChange={(_event, newValue) => {
            // //   changeCustomCRatio(
            // //     Number(-newValue) > Number(minCRatio.toFixed(2))
            // //       ? (-newValue).toString()
            // //       : minCRatio.toFixed(2)
            // //   )
            // }}
            value={percent}
            defaultValue={50}
            step={2}
            min={0}
            max={100}
          />
        </Grid>
        <Grid container justifyContent='space-between'>
          <Typography className={classes.smallTextHeader}>Amount of tokens</Typography>
          <Typography className={classes.smallTextHeader}>Percent of tokens</Typography>
        </Grid>
        <Grid container justifyContent='space-between'>
          <Typography className={classes.smallValue}>
            {amount} {tokenTo}
          </Typography>
          <Typography className={classes.smallValue}>
            {percent}% {tokenTo}
          </Typography>
        </Grid>
        <Grid container justifyContent='center' style={{ paddingTop: '16px' }}>
          <OutlinedButton
            className={classes.button}
            name={'Close leverage'}
            color='secondary'
            onClick={() => {
              // onClickSubmitButton()
            }}
            disabled={false}
            //   fontWeight={900}
          />
        </Grid>
      </Grid>
    </Popover>
  )
}
