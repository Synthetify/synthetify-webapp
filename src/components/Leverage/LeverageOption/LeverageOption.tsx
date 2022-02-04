import { Divider, Grid, Slider, Typography } from '@material-ui/core'
import React from 'react'
import { colors } from '@static/theme'
import useStyles from './style'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import classNames from 'classnames'
interface IProp {
  onClickSubmitButton: () => void
  onClickRestartButton: () => void
  minCRatio: number
  liquidationPriceTo: number
  cRatio: string
  changeCustomCRatio: (value: string) => void
  currentLeverage: string

  action: string
  switchButton: React.ReactNode
}
export const LeverageOption: React.FC<IProp> = ({
  onClickSubmitButton,
  onClickRestartButton,
  minCRatio,
  liquidationPriceTo,
  cRatio,
  changeCustomCRatio,
  currentLeverage,
  action,
  switchButton
}) => {
  const classes = useStyles()

  return (
    <Grid className={classNames(classes.wrapperOption, action === 'close' ? classes.blur : null)}>
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
              <Typography className={classes.infoTitle}>Leverage</Typography>
              <Typography className={classes.headerTitle} style={{ textAlign: 'end' }}>
                {currentLeverage}x
              </Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent={'space-between'} alignItems={'center'}>
            <Typography className={classes.sliderRisk} style={{ color: colors.green.button }}>
              Decrease risk
            </Typography>
            <Typography className={classes.sliderRisk} style={{ color: colors.red.error }}>
              Increase risk
            </Typography>
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
        </Grid>

        <Divider className={classes.divider} style={{ margin: '20px 0' }} />
        <Grid
          container
          direction='row'
          style={{ padding: ' 0 24px' }}
          justifyContent='space-between'>
          <Grid alignItems='center' style={{ display: 'flex' }}>
            {switchButton}
          </Grid>
          <Grid>
            <Typography className={classes.infoTitle}>Collateral ratio:</Typography>
            <Typography className={classes.infoValue}>{cRatio}%</Typography>
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
            name={action}
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
