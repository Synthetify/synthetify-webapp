import React, { useState } from 'react'
import { ClickAwayListener, Grid, Hidden, Icon, Tooltip, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import HintIcon from '@static/svg/questionMarkCircle.svg'
import { transformBN } from '@consts/utils'
import BN from 'bn.js'
import useStyles from './style'

interface IRewardsAmountProps {
  amountToClaim: BN
}

export const RewardsAmount: React.FC<IRewardsAmountProps> = ({ amountToClaim }) => {
  const classes = useStyles()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const hint = 'Amount of SNY tokens you can withdraw'

  return (
    <Grid container alignItems='center' className={classes.root}>
      <Grid item style={{ marginRight: 15 }}>
        <Typography className={classes.text}>
          <AnimatedNumber
            value={transformBN(amountToClaim || new BN(0))}
            duration={300}
            formatValue={(value: string) => Number(value).toFixed(4)}
          />{' '}
          SNY
        </Typography>
      </Grid>
      <Grid item>
        <Grid item>
          <Hidden mdDown>
            <Icon>
              <Tooltip classes={{ tooltip: classes.tooltip }} title={hint} placement='bottom'>
                <img src={HintIcon} alt='' className={classes.questionMark} />
              </Tooltip>
            </Icon>
          </Hidden>
          <Hidden lgUp>
            <ClickAwayListener onClickAway={() => setIsPopoverOpen(false)}>
              <Icon onClick={() => setIsPopoverOpen(true)}>
                <Tooltip
                  classes={{ tooltip: classes.tooltip }}
                  title={hint}
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
    </Grid>
  )
}
