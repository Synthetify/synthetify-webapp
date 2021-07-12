import React from 'react'
import { transformBN } from '@consts/utils'
import { Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
import BN from 'bn.js'
import useStyles from './style'

export interface IRewardsLineProps {
  name: string
  nonBracket: string
  nonBracketValue?: BN
  bracket?: string
  bracketValue?: BN
  hint: string
  bottomHint?: string
}

export const RewardsLine: React.FC<IRewardsLineProps> = ({
  name,
  nonBracket,
  nonBracketValue = new BN(0),
  bracket,
  bracketValue = new BN(0),
  hint,
  bottomHint
}) => {
  const classes = useStyles()
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
      {nonBracket ? (
        <>
          <AnimatedNumber
            value={nonBracketValue ? transformBN(nonBracketValue) : new BN(0)}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(4)}
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
          {' ('}
          <AnimatedNumber
            value={bracketValue ? transformBN(bracketValue) : new BN(0)}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(4)}
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
      <MobileTooltip hint={processedHint} />
    </Grid>
  )
}
