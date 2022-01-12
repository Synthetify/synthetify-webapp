import { Popover, Grid, Typography, Input } from '@material-ui/core'
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
  minCRatio: number
}
export const SliderRatio: React.FC<IProp> = ({
  openOption,
  anchorEl,
  onClosePopover,
  liquidityPrice,
  cRatio,
  changeCustomCRatio,
  minCRatio
}) => {
  const classes = useStyles()
  const [customCRatio, setCustomCRatio] = React.useState(cRatio.toString())
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
            <Typography className={classes.sliderSubTitle} style={{ textAlign: 'end' }}>
              Collateral ratio
            </Typography>
            <Input
              className={classes.sliderNumber}
              classes={{ input: classes.customInput }}
              disableUnderline
              value={customCRatio}
              placeholder={'custom'}
              onChange={event => {
                if (event.currentTarget.value.match(/^\d/)) {
                  setCustomCRatio(event.currentTarget.value)
                }
              }}
              onBlur={() => {
                changeCustomCRatio(
                  Number(customCRatio) <= minCRatio ? minCRatio.toFixed(2) : customCRatio
                )
                setCustomCRatio(minCRatio.toFixed(2))
              }}
            />
            <span className={classes.percentSign}>%</span>
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
            changeCustomCRatio((-newValue).toString())
            setCustomCRatio((-newValue).toString())
          }}
          value={Number(customCRatio) < minCRatio ? -cRatio : -Number(customCRatio)}
          aria-labelledby='input-slider'
          defaultValue={-minCRatio}
          step={-1}
          min={-800}
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
    </Popover>
  )
}
