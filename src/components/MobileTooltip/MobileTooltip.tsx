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
  showOnlyOnClick?: boolean
}

export const MobileTooltip: React.FC<IMobileTooltip> = ({
  hint,
  anchor,
  onOpen,
  mobilePlacement = 'bottom',
  desktopPlacement = 'right',
  tooltipClasses,
  showOnlyOnClick = false
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
      <Hidden mdDown={!showOnlyOnClick} xsUp={showOnlyOnClick}>
        <Icon>
          <Tooltip
            onOpen={onOpen}
            classes={{ ...tooltipClasses, tooltip: classNames(classes.tooltip, tooltipClasses?.tooltip) }}
            title={hint}
            placement={desktopPlacement}
            interactive
          >
            {anchor}
          </Tooltip>
        </Icon>
      </Hidden>
      <Hidden lgUp={!showOnlyOnClick}>
        <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
          <Icon onClick={() => setIsPopoverOpen(true)}>
            <Tooltip
              classes={{ ...tooltipClasses, tooltip: classNames(classes.tooltip, tooltipClasses?.tooltip) }}
              title={hint}
              placement={mobilePlacement}
              open={isPopoverOpen}
              onOpen={onOpen}
              onClose={() => setIsPopoverOpen(false)}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              interactive
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
