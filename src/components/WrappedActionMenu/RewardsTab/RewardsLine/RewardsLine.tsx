import React from 'react'
import { transformBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import TimeRemainingTooltip from '@components/WrappedActionMenu/RewardsTab/TimeRemainingTooltip/TimeRemainingTooltip'
import BN from 'bn.js'
import useStyles from './style'
import { Placement } from '@components/MobileTooltip/MobileTooltip'

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
  tooltipPlacement
}) => {
  const classes = useStyles()

  const processedNonBracket = (
    <>
      {nonBracket
        ? (
          <>
            <AnimatedNumber
              value={nonBracketValue ? transformBN(nonBracketValue) : new BN(0)}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(4)}
            />
            {` ${nonBracket}`}
          </>
        )
        : (
          ''
        )
      }
    </>
  )

  const processedBracket = (
    <>
      {bracket
        ? (
          <>
            {' ('}
            <AnimatedNumber
              value={bracketValue ? transformBN(bracketValue) : new BN(0)}
              duration={300}
              formatValue={(value: string) => Number(value).toFixed(4)}
            />
            {` ${bracket})`}
          </>
        )
        : (
          ''
        )
      }
    </>
  )

  return (
    <Grid container alignItems='center' wrap='nowrap'>
      <TimeRemainingTooltip timeRemainingEndSlot={timeRemainingEndSlot} slot={slot} hint={hint} icon={icon} placement={tooltipPlacement} />
      <Grid item style={{ marginLeft: 15 }}>
        <Typography className={classes.text}>
          {name}
          {': '}
          {processedNonBracket}
          {processedBracket}
        </Typography>
      </Grid>
    </Grid>
  )
}
