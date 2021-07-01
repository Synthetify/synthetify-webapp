import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import ActionMenu, { IActionContents } from '@components/SwitchMenu/ActionMenu'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { BN } from '@project-serum/anchor'
import { MaxWidthProperty } from 'csstype'
import useStyles from './style'

export interface IProps {
  maxWidth?: MaxWidthProperty<number>
  onMint: (amount: BN) => () => void
  onDeposit: (amount: BN) => () => void
  onWithdraw: (amount: BN) => () => void
  onBurn: (amount: BN) => () => void
  availableToMint: BN
  availableToDeposit: BN
  availableToWithdraw: BN
  availableToBurn: BN
}

export const WrappedActionMenu: React.FC<IProps> = ({
  maxWidth,
  onMint,
  onDeposit,
  onWithdraw,
  onBurn,
  availableToMint,
  availableToDeposit,
  availableToWithdraw,
  availableToBurn
}) => {
  const classes = useStyles()

  const actionContents: IActionContents = {
    mint: (
      <ActionTemplate
        action='mint'
        maxAvailable={availableToMint}
        maxDecimal={6}
        onClick={onMint}
      />
    ),
    deposit: (
      <ActionTemplate
        action='deposit'
        maxAvailable={availableToDeposit}
        maxDecimal={6}
        onClick={onDeposit}
      />
    ),
    withdraw: (
      <ActionTemplate
        action='withdraw'
        maxAvailable={availableToWithdraw}
        maxDecimal={6}
        onClick={onWithdraw}
      />
    ),
    burn: (
      <ActionTemplate
        maxAvailable={availableToBurn}
        maxDecimal={6}
        action='burn'
        onClick={onBurn}
      />
    ),
    rewards: 'TODO'
  }

  return (
    <Card className={classes.card} style={{ maxWidth }}>
      <CardContent className={classes.cardContent}>
        <Grid container justify='space-around' alignItems='flex-start' direction='column'>
          <ActionMenu actionContents={actionContents} onChange={() => {}} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WrappedActionMenu
