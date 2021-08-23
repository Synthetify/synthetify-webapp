import { ClickAwayListener, Grid, Hidden, Icon, Tooltip } from '@material-ui/core'
import classNames from 'classnames'
import React, { ReactChild, ReactElement, useEffect, useState } from 'react'
import useStyles from './style'

export type Placement =
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
  anchor: ReactElement
  onOpen?: () => void
  mobilePlacement?: Placement
  desktopPlacement?: Placement
  tooltipClasses?: { [key: string]: string }
}

export const MobileTooltip: React.FC<IMobileTooltip> = ({
  hint,
  anchor,
  onOpen,
  mobilePlacement = 'bottom',
  desktopPlacement = 'right',
  tooltipClasses
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
            classes={{ ...tooltipClasses, tooltip: classNames(classes.tooltip, tooltipClasses?.tooltip) }}
            title={hint}
            placement={desktopPlacement}
          >
            {anchor}
          </Tooltip>
        </Icon>
      </Hidden>
      <Hidden lgUp>
        <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
          <Icon onClick={() => setIsPopoverOpen(true)}>
            <Tooltip
              classes={{ ...tooltipClasses, tooltip: classNames(classes.tooltip, tooltipClasses?.tooltip) }}
              title={hint}
              placement={mobilePlacement}
              open={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              {anchor}
            </Tooltip>
          </Icon>
        </ClickAwayListener>
      </Hidden>
    </Grid>
  )
}

export default MobileTooltip
