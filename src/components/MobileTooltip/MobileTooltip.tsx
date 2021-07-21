import { ClickAwayListener, Grid, Hidden, Icon, Tooltip } from '@material-ui/core'
import HintIcon from '@static/svg/whiteQuestionMarkCircle.svg'
import React, { ReactChild, useEffect, useState } from 'react'
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
  onOpen?: () => void
  mobilePlacement?: Placement
  desktopPlacement?: Placement
}

export const MobileTooltip: React.FC<IMobileTooltip> = ({
  hint,
  onOpen,
  mobilePlacement = 'bottom',
  desktopPlacement = 'right'
}) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  useEffect(() => {
    if (isPopoverOpen && onOpen) {
      onOpen()
    }
  }, [isPopoverOpen])

  return (
    <Grid item>
      <Hidden mdDown>
        <Icon>
          <Tooltip
            onOpen={onOpen}
            classes={{ tooltip: classes.tooltip }}
            title={hint}
            placement={desktopPlacement}>
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
