import React, { useState } from 'react'
import { ClickAwayListener, Grid, Hidden, Icon, Tooltip, Typography } from '@material-ui/core'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import useStyles from './style'
import BN from 'bn.js'
import { transformBN } from '@consts/utils'
import AnimatedNumber from '@components/AnimatedNumber'

export interface IRewardsLineProps {
  name: string
  points: BN
  hint: string
  bottomHint?: string
}

export const RewardsLine: React.FC<IRewardsLineProps> = ({ name, points, hint, bottomHint }) => {
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

  return (
    <Grid container justifyContent='flex-start' alignItems='center' wrap='nowrap'>
      <Grid item style={{ marginRight: 25 }}>
        <Typography className={classes.text}>
          {name}:{' '}
          <AnimatedNumber
            value={transformBN(points)}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(6)}
          />
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
