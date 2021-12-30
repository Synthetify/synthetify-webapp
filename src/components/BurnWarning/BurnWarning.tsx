import { Button, Grid, Popover, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import React, { useEffect } from 'react'
import { displayDate, divUpNumber, printBN } from '@consts/utils'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import { IRewardsProps, RoundData } from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
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
  const { userDebtShares, roundLength, rounds, slot, amountToClaim } = rewards
  const estimateRounds = (): RoundData => {
    const { current, next } = rounds

    if (next.roundStartSlot.toNumber() >= slot) {
      return rounds
    }
    const slotDiff = slot - next.roundStartSlot.toNumber()
    const roundDiff = divUpNumber(slotDiff, roundLength)

    switch (roundDiff) {
      case 1: {
        return {
          finished: current,
          current: next,
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares,
            roundAmount: next.roundAmount
          }
        }
      }
      case 2: {
        return {
          finished: next,
          current: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength)),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares,
            roundAmount: next.roundAmount
          },
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(2))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares,
            roundAmount: next.roundAmount
          }
        }
      }
      default: {
        return {
          finished: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff - 2))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares,
            roundAmount: next.roundAmount
          },
          current: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff - 1))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares,
            roundAmount: next.roundAmount
          },
          next: {
            roundStartSlot: next.roundStartSlot.add(new BN(roundLength).mul(new BN(roundDiff))),
            roundAllPoints: next.roundAllPoints,
            roundPoints: userDebtShares,
            roundAmount: next.roundAmount
          }
        }
      }
    }
  }
  const { current, next } = estimateRounds()
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

  const calculateTimeRemaining = (): BN => {
    const slotTime = 0.5
    const slotDiff = nextRoundStartSlot.sub(new BN(slot))
    if (slotDiff.lten(0)) {
      return new BN(1)
    }
    return slotDiff.muln(slotTime)
  }
  return (
    <Grid className={classes.warningContainer} style={{ display: open ? 'flex' : 'none' }}>
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
          ({displayDate(calculateTimeRemaining().toNumber())} left to claim).
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
