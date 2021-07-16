import React, { useState } from 'react'
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
import useStyles, { useProgressStyles } from './style'
import AnimatedNumber from '@components/AnimatedNumber'
export interface IProps {
  name: string
  sign: string
  hint?: string
  onClick?: () => void
  max: number
  current: number
  currentDescription?: string
}
export const ProgressCard: React.FC<IProps> = ({ name, sign, hint, onClick, max, current, currentDescription }) => {
  const classes = useStyles()
  const progressClasses = useProgressStyles({ max, current })
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent className={progressClasses.progressContent}>
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
        <Grid className={progressClasses.progressContainer} container direction='row' alignItems='center'>
          <Typography className={progressClasses.minMaxDebt}>0{sign}</Typography>
          <Grid item style={{ flexGrow: 1, paddingInline: 7 }}>
            <Tooltip
              classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow, popper: progressClasses.popper }}
              title={currentDescription ?? ''}
              placement='top'
              open
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <div style={{ width: 0.1, height: 0.1, marginLeft: `${max !== 0 ? (current / max) * 100 : 0}%` }} />
            </Tooltip>
            <LinearProgress
              classes={{
                root: progressClasses.progressRoot,
                bar: progressClasses.bar
              }}
              variant='determinate'
              value={max !== 0 ? (current / max) * 100 : 0}
            />
            <Tooltip
              classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow, popper: progressClasses.popper }}
              title={currentDescription ?? ''}
              placement='bottom'
              open
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <div style={{ width: 0.1, height: 0.1 }} />
            </Tooltip>
          </Grid>
          <Typography className={progressClasses.minMaxDebt}>
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
