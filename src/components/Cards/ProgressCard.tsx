import React, { ReactChild, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Tooltip,
  Icon,
  ClickAwayListener,
  Hidden,
  LinearProgress,
  Grid
} from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import useStyles, { useStylesWithProps } from './style'
import AnimatedNumber from '@components/AnimatedNumber'
export interface IProps {
  name: string
  sign: string
  hint?: string
  onClick?: () => void
  max: number
  current: number
  topIndicator: string | ReactChild
  topIndicatorValue: number
  bottomIndicator: string | ReactChild
  bottomIndicatorValue: number
}
export const ProgressCard: React.FC<IProps> = ({
  name,
  sign,
  hint,
  onClick,
  max,
  current,
  topIndicator,
  topIndicatorValue,
  bottomIndicator,
  bottomIndicatorValue
}) => {
  const classes = useStyles()
  const proppedClasses = useStylesWithProps({ max, current, topIndicatorValue, bottomIndicatorValue })
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [areIndicatorsOpen, setAreIndicatorsOpen] = useState(false)

  return (
    <Card className={classes.valueCard} onClick={onClick} onMouseEnter={() => setAreIndicatorsOpen(true)} onMouseLeave={() => setAreIndicatorsOpen(false)}>
      <CardContent className={classes.progressContent}>
        {hint ? (
          <>
            <Hidden mdDown>
              <Icon>
                <Tooltip
                  classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
                  title={hint}
                  placement='top-end'
                  arrow>
                  <img src={HintIcon} alt='' className={classes.questionMark} />
                </Tooltip>
              </Icon>
            </Hidden>
            <Hidden lgUp>
              <ClickAwayListener
                onClickAway={() => {
                  setIsPopoverOpen(false)
                }}>
                <Icon
                  onClick={() => {
                    setIsPopoverOpen(true)
                  }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
                    title={hint}
                    placement='top-end'
                    open={isPopoverOpen}
                    onClose={() => {
                      setIsPopoverOpen(false)
                    }}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    arrow>
                    <img src={HintIcon} alt='' className={classes.questionMark} />
                  </Tooltip>
                </Icon>
              </ClickAwayListener>
            </Hidden>
          </>
        ) : null}
        <Typography className={classes.valueCardTitle}>{name}</Typography>
        <Divider className={classes.divider} style={{ marginBottom: 0 }} />
        <Grid className={classes.progressContainer} container direction='row' alignItems='center'>
          <Typography className={classes.minMaxDebt}>0{sign}</Typography>
          <Grid item style={{ flexGrow: 1, paddingInline: 7 }}>
            <Tooltip
              classes={{ tooltip: classes.progressTooltip, arrow: classes.tooltipArrow, popper: classes.popper }}
              title={topIndicator}
              placement='top'
              open={areIndicatorsOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <div className={proppedClasses.topIndicator} />
            </Tooltip>
            <LinearProgress
              classes={{
                root: classes.progressRoot,
                bar: proppedClasses.bar
              }}
              variant='determinate'
              value={max !== 0 ? (current / max) * 100 : 0}
            />
            <Tooltip
              classes={{ tooltip: classes.progressTooltip, arrow: classes.tooltipArrow, popper: classes.popper }}
              title={bottomIndicator}
              placement='bottom'
              open={areIndicatorsOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <div className={proppedClasses.bottomIndicator} />
            </Tooltip>
          </Grid>
          <Typography className={classes.minMaxDebt}>
            <AnimatedNumber
              value={max}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(2)}
            />
            {sign}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default ProgressCard
