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
  onChange: (value: number) => void
  onSubmitButton: () => void
  blockButton: boolean
}
export const CloseLeverage: React.FC<ICloseLeverage> = ({
  open,
  handleClose,
  tokenFrom,
  tokenTo,
  leverage,
  percent,
  amount,
  onChange,
  onSubmitButton,
  blockButton
}) => {
  const classes = useStyles()
  const marks: Array<{
    value: number
    label: string
  }> = [
    {
      value: 10,
      label: '10%'
    },
    {
      value: 25,
      label: '25%'
    },
    {
      value: 50,
      label: '50%'
    },
    {
      value: 75,
      label: '75%'
    },
    {
      value: 100,
      label: '100%'
    }
  ]

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
            <Typography className={classes.infoValue}>{tokenTo}</Typography>
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
              thumb: classes.sliderThumb,
              markActive: classes.markActive,
              mark: classes.markActive,
              markLabel: classes.markLabel,
              markLabelActive: classes.markLabel
            }}
            onChange={(_event, newValue) => {
              onChange(Number(newValue))
            }}
            value={percent}
            defaultValue={50}
            step={5}
            min={10}
            max={100}
            marks={marks}
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
            name={!blockButton ? 'Close leverage' : "You don't have enough token to close"}
            color='secondary'
            onClick={() => {
              onSubmitButton()
            }}
            disabled={blockButton}
          />
        </Grid>
      </Grid>
    </Popover>
  )
}
