import React, { useEffect, useState } from 'react'
import MobileTooltip, { Placement } from '@components/MobileTooltip/MobileTooltip'
import BN from 'bn.js'
import { displayDate } from '@consts/utils'
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import { actions } from '@reducers/solanaConnection'
import Clock from '@static/svg/clock.svg'
import useStyles from './style'

export interface ITimeRemainingTooltipInterface {
  timeRemainingEndSlot: BN
  slot: number
  hint: string
  icon: string,
  placement: Placement
}

export const CountDown: React.FC<Omit<ITimeRemainingTooltipInterface, 'icon' | 'placement'>> = ({
  timeRemainingEndSlot,
  slot,
  hint
}) => {
  const classes = useStyles()

  const calculateTimeRemaining = (): BN => {
    const slotTime = 0.4
    const slotDiff = timeRemainingEndSlot.sub(new BN(slot))
    if (slotDiff.lten(0)) {
      return new BN(0)
    }
    return slotDiff.muln(slotTime)
  }

  const displayTimeRemaining = (): string => {
    return `Time remaining: ${displayDate(timeRemaining.toNumber())}`
  }

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((time) => {
        if (time.eqn(0)) {
          return time
        }
        return time.subn(1)
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setTimeRemaining(calculateTimeRemaining())
  }, [slot])

  return (
    <>
      <img src={Clock} alt='' className={classes.clockIcon} />
      <Typography className={classes.title}>
        {displayTimeRemaining()}
      </Typography>
      {hint}
    </>
  )
}

export const TimeRemainingTooltip: React.FC<ITimeRemainingTooltipInterface> = ({
  timeRemainingEndSlot,
  slot,
  hint,
  icon,
  placement
}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  return (
    <MobileTooltip
      onOpen={() => dispatch(actions.updateSlot())}
      hint={<CountDown timeRemainingEndSlot={timeRemainingEndSlot} slot={slot} hint={hint} />}
      anchor={<img src={icon} alt='' className={classes.icon} />}
      mobilePlacement={placement}
      desktopPlacement={placement}
      tooltipClasses={{
        tooltipPlacementLeft: classes.tooltipPlacementLeft,
        tooltipPlacementRight: classes.tooltipPlacementRight
      }}
    />
  )
}

export default TimeRemainingTooltip
