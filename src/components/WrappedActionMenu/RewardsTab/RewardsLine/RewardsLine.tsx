import React, { useState } from 'react'
import { transformBN, printBN } from '@consts/utils'
import { ClickAwayListener, Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import TimeRemainingTooltip from '@components/WrappedActionMenu/RewardsTab/TimeRemainingTooltip/TimeRemainingTooltip'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import { Placement } from '@components/MobileTooltip/MobileTooltip'
import icons from '@static/icons'

export interface IRewardsLineProps {
  name: string
  nonBracket: string
  nonBracketValue?: BN
  bracket?: string
  bracketValue?: BN
  hint: string
  bottomHint?: string
  timeRemainingEndSlot: BN
  slot: number
  icon: string
  tooltipPlacement: Placement
  userMarinadeAmount?: number
}

export const RewardsLine: React.FC<IRewardsLineProps> = ({
  name,
  nonBracket,
  nonBracketValue = new BN(0),
  bracket,
  bracketValue = new BN(0),
  timeRemainingEndSlot,
  slot,
  hint,
  icon,
  tooltipPlacement,
  userMarinadeAmount
}) => {
  const classes = useStyles()
  const processedNonBracket = (
    <>
      {nonBracket ? (
        <>
          <AnimatedNumber
            value={nonBracketValue ? transformBN(nonBracketValue) : new BN(0)}
            duration={300}
            formatValue={(value: string) =>
              Number(value) > 1000 ? Number(value).toFixed(1) : Number(value).toFixed(4)
            }
          />
          {` ${nonBracket}`}
        </>
      ) : (
        ''
      )}
    </>
  )

  const processedBracket = (
    <>
      {bracket ? (
        <>
          {' (APY: '}
          {bracketValue.div(new BN(100)).lt(new BN(1000000)) ? (
            <AnimatedNumber
              value={printBN(bracketValue, 2)}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(2)}
            />
          ) : (
            'infinity'
          )}
          {`${bracket})`}
        </>
      ) : (
        ''
      )}
    </>
  )

  const marinade = userMarinadeAmount ? (
    <>
      {' + '}
      <img className={classes.marinadeIcon} src={icons.marinade} />{' '}
      <AnimatedNumber
        value={userMarinadeAmount}
        duration={300}
        formatValue={(value: string) => +Number(value).toFixed(9)}
      />
      {' MNDE'}
    </>
  ) : null

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  return (
    <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
      <div
        style={{ lineHeight: 1 }}
        onClick={() => setIsPopoverOpen(true)}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}>
        <Grid container alignItems='center' wrap='nowrap'>
          <TimeRemainingTooltip
            timeRemainingEndSlot={timeRemainingEndSlot}
            slot={slot}
            hint={hint}
            icon={icon}
            placement={tooltipPlacement}
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
          />
          <Grid item className={classes.textContainer}>
            <Typography className={classes.text}>
              {name}
              {': '}
              {processedNonBracket}
              {processedBracket}
              {marinade}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ClickAwayListener>
  )
}
