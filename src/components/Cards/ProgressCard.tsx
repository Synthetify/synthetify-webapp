import React, { ReactChild, useState } from 'react'
import { Card, CardContent, Typography, Tooltip, LinearProgress, Grid } from '@material-ui/core'
import HintIcon from '@static/svg/questionMark.svg'
import AnimatedNumber from '@components/AnimatedNumber'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import useStyles, { useStylesWithProps } from './style'
import { formatNumbers, showPrefix } from '@consts/utils'
import classNames from 'classnames'

export interface IProps {
  name: string
  sign: string
  hint?: string | ReactChild
  onClick?: () => void
  max: number
  current: number
  topIndicator: string | ReactChild
  topIndicatorValue: number
  bottomIndicator: string | ReactChild
  bottomIndicatorValue: number,
  leftSideDesc?: string
  rightSideDesc?: string
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
  bottomIndicatorValue,
  leftSideDesc = '',
  rightSideDesc = ''
}) => {
  const classes = useStyles()
  const proppedClasses = useStylesWithProps({
    max,
    current,
    topIndicatorValue,
    bottomIndicatorValue
  })
  const [areIndicatorsOpen, setAreIndicatorsOpen] = useState(false)

  return (
    <Card
      className={classes.valueCard}
      onClick={onClick}
      onMouseEnter={() => setAreIndicatorsOpen(true)}
      onMouseLeave={() => setAreIndicatorsOpen(false)}>
      <CardContent className={classNames(classes.cardContent, classes.progressCardContent)}>
        {hint ? (
          <MobileTooltip
            hint={hint}
            anchor={<img src={HintIcon} alt='' className={classes.questionMark} />}
            mobilePlacement='top-end'
            desktopPlacement='top-end'
          />
        ) : null}
        <Typography className={classes.valueCardTitle}>{name}</Typography>
        <Grid className={classes.progressContainer} container direction='row' alignItems='center'>
          <Typography className={classes.minMaxDebt}>0{sign}</Typography>
          <Grid item style={{ flexGrow: 1, paddingInline: 9 }}>
            <Tooltip
              classes={{
                tooltip: classes.progressTooltip,
                arrow: classes.tooltipArrow,
                popper: classes.popper
              }}
              title={topIndicator}
              placement='top'
              open={areIndicatorsOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow>
              <div className={proppedClasses.topIndicator} />
            </Tooltip>
            <LinearProgress
              classes={{
                root: classes.progressRoot,
                bar: proppedClasses.bar
              }}
              variant='determinate'
              value={max !== 0 ? Math.min((current / max) * 100, 100) : 0}
            />
            <Tooltip
              classes={{
                tooltip: classes.progressTooltip,
                arrow: classes.tooltipArrow,
                popper: classes.popper
              }}
              title={bottomIndicator}
              placement='bottom'
              open={areIndicatorsOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow>
              <div className={proppedClasses.bottomIndicator} />
            </Tooltip>
          </Grid>
          <Typography className={classes.minMaxDebt}>
            <AnimatedNumber value={max} duration={300} formatValue={formatNumbers} />
            {showPrefix(max)}
            {sign}
          </Typography>
        </Grid>
        <Grid container justifyContent='space-between'>
          <Typography className={classes.bottomText}>{leftSideDesc}</Typography>
          <Typography className={classes.bottomText}>{rightSideDesc}</Typography>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default ProgressCard
