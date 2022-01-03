import { Button, Grid, Popover, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import React, { useEffect } from 'react'
import { calculateTimeRemaining, displayDate, estimateRounds, printBN } from '@consts/utils'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { IRewardsProps } from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { blurContent, unblurContent } from '@consts/uiUtils'

interface IProps {
  open: boolean
  burnAmount: {
    amount: BN
    decimal: number
  }
  onBurn: (amount: BN, decimals: number) => () => void
  onCancel: () => void
  burnTokenSymbol: string
  rewards: IRewardsProps
}

const BurnWarning: React.FC<IProps> = ({
  burnAmount,
  burnTokenSymbol,
  onBurn,
  onCancel,
  open,
  rewards
}) => {
  const classes = useStyles()
  useEffect(() => {
    if (open) {
      blurContent()
    } else {
      unblurContent()
    }
  }, [open])
  const { slot, amountToClaim } = rewards

  const { current, next } = estimateRounds(rewards)
  const {
    roundAllPoints: currentRoundAllPoints,
    roundPoints: currentRoundPoints,
    roundAmount: currentRoundAmount
  } = current
  const { roundStartSlot: nextRoundStartSlot } = next
  const calculateTokensBasedOnPoints = (roundPoints?: BN, allPoints?: BN, amount?: Decimal) => {
    if (!roundPoints || !allPoints || allPoints.eqn(0) || !amount) {
      return new BN(0)
    }
    return roundPoints.mul(amount.val).div(allPoints)
  }
  return (
    <Grid style={{ display: open ? 'flex' : 'none' }}>
      <Popover className={classes.test} open={open} classes={{ paper: classes.warningCard }}>
        <Typography component='h1' className={classes.warningHeader}>
          Are you sure you want to repay {printBN(burnAmount.amount, burnAmount.decimal)}{' '}
          {burnTokenSymbol}?
        </Typography>
        <Typography component='p' className={classes.warningInfo}>
          <span className={classes.infoLosingRewars}>
            It may cause losing your reward -{' '}
            {printBN(
              calculateTokensBasedOnPoints(
                currentRoundPoints,
                currentRoundAllPoints,
                currentRoundAmount
              ),
              amountToClaim.scale
            )}{' '}
            SNY{' '}
          </span>
          ({displayDate(calculateTimeRemaining(slot, nextRoundStartSlot).toNumber())} left to
          claim).
        </Typography>
        <Typography component='p' className={classes.warningConfirm}>
          Do you confirm the action?
        </Typography>
        <Grid className={classes.warninigButtons}>
          <Button
            className={classes.btnBurn}
            onClick={onBurn(burnAmount.amount, burnAmount.decimal)}>
            Repay
          </Button>
          <Button className={classes.btnCancel} onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Popover>
    </Grid>
  )
}

export default BurnWarning
