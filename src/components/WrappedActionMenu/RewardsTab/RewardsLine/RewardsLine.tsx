import React, { useState } from 'react'
import { ClickAwayListener, Grid, Hidden, Icon, Tooltip, Typography } from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import { transformBN } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'
import BN from 'bn.js'
import useStyles from './style'

export interface IRewardsLineProps {
  name: string
  nonBracket: string
  nonBracketValue: BN
  bracket?: string
  bracketValue?: BN
  hint: string
  bottomHint?: string
}

export const RewardsLine: React.FC<IRewardsLineProps> = ({
  name,
  nonBracket,
  nonBracketValue,
  bracket,
  bracketValue,
  hint,
  bottomHint
}) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const processedHint = (
    <>
      <Typography className={classes.hint}>{hint}</Typography>
      {bottomHint ? (
        <Typography className={classes.hint} style={{ fontWeight: 700, marginTop: 8 }}>
          {bottomHint}
        </Typography>
      ) : (
        ''
      )}
    </>
  )

  const processedNonBracket = (
    <>
      {nonBracket && nonBracketValue ? (
        <>
          <AnimatedNumber
            value={transformBN(nonBracketValue) || new BN(0)}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(6)}
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
      {bracket && bracketValue ? (
        <>
          {' ('}
          <AnimatedNumber
            value={transformBN(bracketValue) || new BN(0)}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(6)}
          />
          {` ${bracket})`}
        </>
      ) : (
        ''
      )}
    </>
  )

  return (
    <Grid container justifyContent='flex-start' alignItems='center' wrap='nowrap'>
      <Grid item style={{ marginRight: 25 }}>
        <Typography className={classes.text}>
          {name}
          {': '}
          {processedNonBracket}
          {processedBracket}
        </Typography>
      </Grid>
      <Grid item>
        <Hidden mdDown>
          <Icon>
            <Tooltip classes={{ tooltip: classes.tooltip }} title={processedHint} placement='right'>
              <img src={HintIcon} alt='' className={classes.questionMark} />
            </Tooltip>
          </Icon>
        </Hidden>
        <Hidden lgUp>
          <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
            <Icon onClick={() => setIsPopoverOpen(true)}>
              <Tooltip
                classes={{ tooltip: classes.tooltip }}
                title={processedHint}
                placement='bottom'
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
    </Grid>
  )
}
