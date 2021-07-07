import React, { useState } from 'react'
import { Card, CardContent, Typography, Divider, Tooltip, Icon, ClickAwayListener, Hidden } from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import useStyles from './style'

export interface IProps {
  name: string
  value: string
  hint?: string
  onClick?: () => void
}
export const ValueCard: React.FC<IProps> = ({ name, value, hint, onClick }) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent>
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
              <ClickAwayListener onClickAway={() => { setIsPopoverOpen(false) }}>
                <Icon onClick={() => { setIsPopoverOpen(true) }}>
                  <Tooltip
                    classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
                    title={hint}
                    placement='top-end'
                    open={isPopoverOpen}
                    onClose={() => { setIsPopoverOpen(false) }}
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
        <Divider className={classes.divider} />
        <Typography className={classes.valueCardAmount}>{value}</Typography>
      </CardContent>
    </Card>
  )
}
export default ValueCard
