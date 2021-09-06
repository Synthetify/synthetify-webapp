import { ClickAwayListener, Hidden, Tooltip } from '@material-ui/core'
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
  isInteractive?: boolean
}

export const MobileTooltip: React.FC<IMobileTooltip> = ({
  hint,
  anchor,
  onOpen,
  mobilePlacement = 'bottom',
  desktopPlacement = 'right',
  tooltipClasses,
  isInteractive = false
}) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  useEffect(() => {
    if (isPopoverOpen && onOpen) {
      onOpen()
    }
  }, [isPopoverOpen])

  return (
    <>
      <Hidden mdDown>
        <Tooltip
          onOpen={onOpen}
          classes={{ ...tooltipClasses, tooltip: classNames(classes.tooltip, tooltipClasses?.tooltip) }}
          title={hint}
          placement={desktopPlacement}
          interactive={isInteractive}
        >
          {anchor}
        </Tooltip>
      </Hidden>
      <Hidden lgUp>
        <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
          <div style={{ lineHeight: 1 }} onClick={() => setIsPopoverOpen(true)}>
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
              interactive={isInteractive}
            >
              {anchor}
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Hidden>
    </>
  )
}

export default MobileTooltip
