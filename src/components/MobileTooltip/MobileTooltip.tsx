import { ClickAwayListener, Grid, Hidden, Icon, Tooltip } from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import React, { ReactChild, useState } from 'react'
import useStyles from './style'

type Placement =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'

export interface IMobileTooltip {
  hint: ReactChild
  mobilePlacement?: Placement
  desktopPlacement?: Placement
}

export const MobileTooltip: React.FC<IMobileTooltip> = ({
  hint,
  mobilePlacement = 'bottom',
  desktopPlacement = 'right'
}) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Grid item>
      <Hidden mdDown>
        <Icon>
          <Tooltip classes={{ tooltip: classes.tooltip }} title={hint} placement={desktopPlacement}>
            <img src={HintIcon} alt='' className={classes.questionMark} />
          </Tooltip>
        </Icon>
      </Hidden>
      <Hidden lgUp>
        <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
          <Icon onClick={() => setIsPopoverOpen(true)}>
            <Tooltip
              classes={{ tooltip: classes.tooltip }}
              title={hint}
              placement={mobilePlacement}
              open={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener>
              <img src={HintIcon} alt='' className={classes.questionMark} />
            </Tooltip>
          </Icon>
        </ClickAwayListener>
      </Hidden>
    </Grid>
  )
}

export default MobileTooltip
