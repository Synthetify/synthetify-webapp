import { Tooltip } from '@material-ui/core'
import classNames from 'classnames'
import React, { ReactChild, ReactElement, useEffect } from 'react'
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
  tooltipClasses?: { [key: string]: string }
  isInteractive?: boolean
  isPopoverOpen: boolean
  setIsPopoverOpen: (status: boolean) => void
}

export const MobileTooltip: React.FC<IMobileTooltip> = ({
  hint,
  anchor,
  onOpen,
  mobilePlacement = 'bottom',
  tooltipClasses,
  isInteractive = true,
  isPopoverOpen,
  setIsPopoverOpen
}) => {
  const classes = useStyles()

  useEffect(() => {
    if (isPopoverOpen && onOpen) {
      onOpen()
    }
  }, [isPopoverOpen])

  return (
    <>
      <Tooltip
        classes={{
          ...tooltipClasses,
          tooltip: classNames(classes.tooltip, tooltipClasses?.tooltip)
        }}
        title={hint}
        placement={mobilePlacement}
        open={isPopoverOpen}
        onOpen={onOpen}
        onClose={() => setIsPopoverOpen(false)}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        interactive={isInteractive}>
        {anchor}
      </Tooltip>
    </>
  )
}

export default MobileTooltip
