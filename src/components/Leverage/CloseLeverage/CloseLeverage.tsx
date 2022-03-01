import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { printBN } from '@consts/utils'
import { Divider, Grid, Popover, Slider, Typography } from '@material-ui/core'
import BN from 'bn.js'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import useStyles from './style'
export interface ICloseLeverage {
  open: boolean
  handleClose: () => void
  tokenFrom: string
  tokenTo: string
  leverage: string
  percent: number
  amount: Decimal
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
            {Number(printBN(amount.val, amount.scale)).toFixed(8)} {tokenTo}
          </Typography>
          <Typography className={classes.smallValue}>
            {percent}% {tokenTo}
          </Typography>
        </Grid>
        <Grid container justifyContent='center' style={{ paddingTop: '16px' }}>
          <OutlinedButton
            className={classes.button}
            name={
              !blockButton ? (
                'Close leverage'
              ) : (
                <>
                  You need a minimum of
                  <br />
                  {Number(
                    printBN(
                      amount.val
                        .mul(new BN(Number(0.2) * 10 ** amount.scale))
                        .div(new BN(10 ** amount.scale)),
                      amount.scale
                    )
                  ).toFixed(6)}{' '}
                  {tokenTo}
                </>
              )
            }
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
