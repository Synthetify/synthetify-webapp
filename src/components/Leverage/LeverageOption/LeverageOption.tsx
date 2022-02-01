import { Divider, Grid, Slider, Typography } from '@material-ui/core'
import React from 'react'
import { colors } from '@static/theme'

import useStyles from './style'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'

interface IProp {
  onClickSubmitButton: () => void
  onClickRestartButton: () => void
  minCRatio: number
  liquidationPriceTo: number
  cRatio: string
  changeCustomCRatio: (value: string) => void
  currentLeverage: string
  maxLeverage: string
}
export const LeverageOption: React.FC<IProp> = ({
  onClickSubmitButton,
  onClickRestartButton,
  minCRatio,
  liquidationPriceTo,
  cRatio,
  changeCustomCRatio,
  currentLeverage,
  maxLeverage
}) => {
  const classes = useStyles()
  return (
    <Grid style={{ width: '50%' }}>
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.headerTitle}>Adjust your multiply</Typography>
        </Grid>
        <Divider className={classes.divider} style={{ marginBottom: '20px' }} />
        <Grid className={classes.sliderContainer}>
          <Grid container justifyContent='space-between'>
            <Grid>
              <Typography className={classes.infoTitle}>Liquidation price</Typography>
              <Typography className={classes.headerTitle}>
                ${liquidationPriceTo.toFixed(3)}
              </Typography>
            </Grid>
            <Grid>
              <Typography className={classes.infoTitle}>Collateral ratio</Typography>
              <Typography className={classes.headerTitle} style={{ textAlign: 'end' }}>
                {cRatio}%
              </Typography>
            </Grid>
          </Grid>

          <Slider
            className={classes.slider}
            classes={{
              rail: classes.sliderRail,
              track: classes.sliderTrack,
              thumb: classes.sliderThumb
            }}
            onChange={(_event, newValue) => {
              changeCustomCRatio(
                Number(-newValue) > Number(minCRatio.toFixed(2))
                  ? (-newValue).toString()
                  : minCRatio.toFixed(2)
              )
            }}
            value={-cRatio}
            defaultValue={-minCRatio}
            step={-2}
            min={-600}
            max={-minCRatio}
          />
          <Grid container item justifyContent={'space-between'}>
            <Typography className={classes.sliderRisk} style={{ color: colors.green.button }}>
              Decrease risk
            </Typography>
            <Typography className={classes.sliderRisk} style={{ color: colors.red.error }}>
              Increase risk
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} style={{ margin: '20px 0' }} />
        <Grid
          container
          direction='row'
          style={{ padding: ' 0 24px' }}
          justifyContent='space-between'>
          <Grid>
            <Typography className={classes.infoTitle}>Leverage:</Typography>
            <Typography className={classes.infoValue}>{currentLeverage}x</Typography>
          </Grid>
          <Grid>
            <Typography className={classes.infoTitle}>Max leverage:</Typography>
            <Typography className={classes.infoValue}> {maxLeverage}x</Typography>
          </Grid>
          <Grid>
            <Typography className={classes.infoTitle}>Slippage limit:</Typography>
            <Typography className={classes.infoValue}>0.50%</Typography>
          </Grid>
          <Grid>
            <Typography className={classes.infoTitle}>Fee:</Typography>
            <Typography className={classes.infoValue}>$30.5</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          style={{ padding: '20px 24px 24px 0px' }}>
          <OutlinedButton
            name={'Reset all'}
            className={classes.resetButton}
            onClick={() => {
              onClickRestartButton()
            }}
            disabled={false}
            fontWeight={900}
          />
          <OutlinedButton
            name={'Long'}
            className={classes.actionButton}
            color='secondary'
            onClick={() => {
              onClickSubmitButton()
            }}
            disabled={false}
            fontWeight={900}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
