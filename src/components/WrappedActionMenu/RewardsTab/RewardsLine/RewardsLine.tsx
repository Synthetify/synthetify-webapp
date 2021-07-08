import React, { useState } from 'react'
import { ClickAwayListener, Grid, Hidden, Icon, Tooltip, Typography } from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
// import useStyles from './style'

export interface IRewardsLineProps {
  message: string
  hint: string
}

export const RewardsLine: React.FC<IRewardsLineProps> = ({ message, hint }) => {
  // const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Grid container justify='flex-start' alignItems='center'>
      <Grid item style={{ marginRight: 25 }}>
        <Typography>{message}</Typography>
      </Grid>
      <Grid item>
        <Hidden mdDown>
          <Icon>
            <Tooltip
              // classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
              title={hint}
              placement='top-end'
              arrow>
              <img
                src={HintIcon}
                alt=''
                // className={classes.questionMark}
              />
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
                // classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
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
                <img
                  src={HintIcon}
                  alt=''
                  // className={classes.questionMark}
                />
              </Tooltip>
            </Icon>
          </ClickAwayListener>
        </Hidden>
      </Grid>
    </Grid>
  )
}
