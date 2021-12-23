import { Button, Grid, Typography } from '@material-ui/core'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import React from 'react'
import { printBN } from '@consts/utils'

interface IProps {
  open: boolean
  burnAmount: {
    amount: BN
    decimal: number
  }
  onBurn: (amount: BN, decimal: number) => () => void
  onCancel: (amount: BN, decimal: number) => () => void
  burnTokenSymbol: string
  rewardAmount: {
    amount: BN
    decimal: number
  }
  claimTime: string
}

const BurnWarning: React.FC<IProps> = ({
  burnAmount,
  burnTokenSymbol,
  rewardAmount,
  claimTime,
  onBurn,
  onCancel,
  open
}) => {
  const classes = useStyles()
  return (
    <Grid className={classes.warningContainer} style={{ display: open ? 'flex' : 'none' }}>
      <Grid className={classes.warningCard}>
        <Typography component='h1' className={classes.warningHeader}>
          Are you sure you want to burn {printBN(burnAmount.amount, burnAmount.decimal)}{' '}
          {burnTokenSymbol}?
        </Typography>
        <Typography component='p' className={classes.warningInfo}>
          <span className={classes.infoLosingRewars}>
            It may cause losing your reward - {printBN(rewardAmount.amount, rewardAmount.decimal)}{' '}
            SNY{' '}
          </span>
          ({claimTime} left to claim).
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
          <Button
            className={classes.btnCancel}
            onClick={onCancel(burnAmount.amount, burnAmount.decimal)}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BurnWarning
