import { Divider, Grid, Slider, Typography } from '@material-ui/core'
import React from 'react'
import { colors } from '@static/theme'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import classNames from 'classnames'
import { SwitchButton } from '../SwitchButton/SwitchButton'
import { getLeverageLevel } from '@consts/leverageUtils'
import { Progress, ProgressState } from '@components/WrappedActionMenu/Progress/Progress'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import ExclamationMark from '@static/svg/exclamationMark.svg'
import useStyles from './style'
interface IProp {
  onClickSubmitButton: () => void
  onClickResetButton: () => void
  minCRatio: number
  liquidationPriceTo: number
  cRatio: string
  changeCustomCRatio: (value: string) => void
  currentLeverage: string
  action: string
  setLeverageStatus: (value: boolean) => void
  leverageType: string
  blockSubmitButton: boolean
  sending: boolean
  hasError?: boolean
  fee: string
  showWarning: { status: boolean; tokenFrom: string; tokenTo: string }
}
export const LeverageOption: React.FC<IProp> = ({
  onClickSubmitButton,
  onClickResetButton,
  minCRatio,
  liquidationPriceTo,
  cRatio,
  changeCustomCRatio,
  currentLeverage,
  action,
  setLeverageStatus,
  leverageType,
  blockSubmitButton,
  sending,
  hasError,
  fee,
  showWarning
}) => {
  const classes = useStyles()
  const [showOperationProgressFinale, setShowOperationProgressFinale] =
    React.useState<ProgressState>('none')
  const [marks, setMarks] = React.useState<
    Array<{
      value: number
      label: string
    }>
  >([
    {
      value: -600,
      label: '1.25x'
    },
    {
      value: -100,
      label: '100x'
    }
  ])

  React.useEffect(() => {
    const tmp: Array<{
      value: number
      label: string
    }> = []
    for (let step = -600; step < -minCRatio - 50; step = step + 100) {
      tmp.push({ value: step, label: `${getLeverageLevel(step * -1)}x` })
    }
    tmp.push({ value: -minCRatio, label: `${getLeverageLevel(minCRatio)}x` })
    setMarks(tmp)
  }, [minCRatio])
  React.useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale('progress')
      return
    }
    if (hasError) {
      setShowOperationProgressFinale('failed')
      return
    }
    if (!sending && !hasError && minCRatio > 100) {
      setShowOperationProgressFinale('success')
      return
    }
    if (!sending) {
      setShowOperationProgressFinale('none')
    }
  }, [sending, hasError])

  return (
    <Grid className={classNames(classes.wrapperOption, action === 'close' ? classes.blur : null)}>
      <Grid className={classes.root}>
        <Grid className={classes.header}>
          <Typography className={classes.headerTitle}>Adjust your multiply</Typography>
        </Grid>
        <Divider className={classes.divider} style={{ marginBottom: '20px' }} />
        <Grid
          container
          direction='row'
          className={classes.middleGrid}
          justifyContent='space-between'>
          <Grid style={{ display: 'flex' }}>
            <SwitchButton
              setLeverStatus={setLeverageStatus}
              firstOption={'long'}
              secondOption={'short'}
              changeStatus={leverageType === 'long' ? 0 : 1}
            />
          </Grid>
          <Grid className={classes.infoGrid}>
            <Grid className={classes.smallInfoGrid}>
              <Typography className={classes.smallTitle}>C-ratio:</Typography>
              <Typography className={classes.smallValue}>{Number(cRatio).toFixed(0)}%</Typography>
            </Grid>

            <Grid className={classes.smallInfoGrid}>
              <Typography className={classes.smallTitle}>Fee:</Typography>
              <Typography className={classes.smallValue}>${fee}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.sliderContainer}>
          <Grid container justifyContent='space-between'>
            <Grid>
              <Typography className={classes.infoTitle}>Liquidation price</Typography>
              <Typography className={classes.headerTitle}>
                $
                {Number(liquidationPriceTo) > 99999
                  ? Number(Number(liquidationPriceTo).toFixed(0)).toLocaleString('pl-PL')
                  : Number(liquidationPriceTo).toLocaleString('pl-PL').replace(',', '.')}
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
              thumb: classes.sliderThumb,
              markActive: classes.markActive,
              mark: classes.markActive,
              markLabel: classes.markLabel,
              markLabelActive: classes.markLabel
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
            marks={marks}
          />
        </Grid>

        <Divider className={classes.divider} style={{ margin: '10px 0' }} />

        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          style={{ padding: '20px 24px 24px 0px' }}>
          <Progress className={classes.progress} state={showOperationProgressFinale} />
          <OutlinedButton
            name={'Reset all'}
            className={classes.resetButton}
            onClick={() => {
              onClickResetButton()
            }}
            disabled={false}
            fontWeight={900}
          />
          <OutlinedButton
            name={action}
            className={classNames(
              classes.actionButton,
              leverageType === 'long' ? classes.buttonGreen : classes.buttonRed
            )}
            onClick={() => {
              onClickSubmitButton()
            }}
            disabled={blockSubmitButton}
            fontWeight={900}
            startIcon={
              <MobileTooltip
                hint={
                  <>
                    <Typography className={classes.tooltipTitle} style={{ marginBottom: 10 }}>
                      Remember: leverage is a risky tool.
                    </Typography>
                    There is a risk of loss and a possibility of higher profits. Use it responsibly.{' '}
                    {showWarning.status ? (
                      <strong style={{ fontWeight: 900 }}>
                        <br />
                        <br />
                        This pair does not exist. We are going to swap {
                          showWarning.tokenFrom
                        } for {showWarning.tokenTo} from the existing pair.
                      </strong>
                    ) : null}
                  </>
                }
                anchor={
                  <img
                    src={ExclamationMark}
                    alt=''
                    className={classNames(
                      classes.exclamationMark,
                      blockSubmitButton ? classes.disabled : null
                    )}
                  />
                }
              />
            }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
