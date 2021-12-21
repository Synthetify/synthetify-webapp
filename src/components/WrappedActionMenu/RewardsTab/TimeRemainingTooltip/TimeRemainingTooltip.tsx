/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react'
import BN from 'bn.js'
import { displayDate } from '@consts/utils'
import { useDispatch } from 'react-redux'
import { Typography } from '@material-ui/core'
import { actions } from '@reducers/solanaConnection'
import Clock from '@static/svg/clock.svg'
import { colors } from '@static/theme'
import MobileTooltipRewards, { Placement } from '@components/MobileTooltip/MobileTooltipRewards'
import useStyles from './style'

export interface ITimeRemainingTooltipInterface {
  timeRemainingEndSlot: BN
  slot: number
  hint: string
  icon: string
  placement: Placement
  isPopoverOpen: boolean
  setIsPopoverOpen: (status: boolean) => void
}

export const CountDown: React.FC<
Omit<ITimeRemainingTooltipInterface, 'icon' | 'placement' | 'isPopoverOpen' | 'setIsPopoverOpen'>
> = ({ timeRemainingEndSlot, slot, hint }) => {
  const classes = useStyles()

  const calculateTimeRemaining = (): BN => {
    const slotTime = 0.5
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
      setTimeRemaining(time => {
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
      <Typography className={classes.title}>{displayTimeRemaining()}</Typography>
      <p style={{ margin: 0, color: colors.navy.lightGrey }}>{hint}</p>
    </>
  )
}

export const TimeRemainingTooltip: React.FC<ITimeRemainingTooltipInterface> = ({
  timeRemainingEndSlot,
  slot,
  hint,
  icon,
  placement,
  isPopoverOpen,
  setIsPopoverOpen
}) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  return (
    <MobileTooltipRewards
      onOpen={() => dispatch(actions.updateSlot())}
      hint={<CountDown timeRemainingEndSlot={timeRemainingEndSlot} slot={slot} hint={hint} />}
      anchor={<img src={icon} alt='' className={classes.icon} />}
      mobilePlacement={placement}
      tooltipClasses={{
        tooltipPlacementLeft: classes.tooltipPlacementLeft,
        tooltipPlacementRight: classes.tooltipPlacementRight
      }}
      isPopoverOpen={isPopoverOpen}
      setIsPopoverOpen={setIsPopoverOpen}
    />
  )
}

export default TimeRemainingTooltip
