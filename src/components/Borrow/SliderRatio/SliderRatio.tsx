import { Popover, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Slider from '@material-ui/core/Slider'
import { colors } from '@static/theme'

import useStyles from './style'
interface IProp {
  openOption: boolean
  anchorEl: HTMLButtonElement | null
  onClosePopover: () => void
  liquidityPrice: number
  cRatio: number
  changeCustomCRatio: (value: string) => void
}
export const SliderRatio: React.FC<IProp> = ({
  openOption,
  anchorEl,
  onClosePopover,
  liquidityPrice,
  cRatio,
  changeCustomCRatio
}) => {
  const classes = useStyles()
  return (
    <Popover
      classes={{ paper: classes.popover }}
      open={openOption}
      anchorEl={anchorEl}
      onClose={onClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <Grid className={classes.popoverBack}>
        <Typography className={classes.sliderTitle}>Adjust your multiply</Typography>
        <Grid container direction={'row'} justifyContent='space-between'>
          <Grid>
            <Typography className={classes.sliderSubTitle}>Liquidation price</Typography>
            <Typography className={classes.sliderNumber}>${liquidityPrice.toFixed(3)}</Typography>
          </Grid>
          <Grid>
            <Typography className={classes.sliderSubTitle}>Collateral ratio</Typography>
            <Typography className={classes.sliderNumber}>{cRatio}%</Typography>
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
            changeCustomCRatio(newValue.toString())
          }}
          defaultValue={300}
          step={10}
          min={100}
          max={500}
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
    </Popover>
  )
}
