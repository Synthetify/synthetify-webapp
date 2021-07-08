import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import ActionMenu, { IActionContents } from '@components/SwitchMenu/ActionMenu'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { BN } from '@project-serum/anchor'
import { IBurn, IDeposit, IMint, IWithdraw } from '@reducers/staking'
import { MaxWidthProperty } from 'csstype'
import useStyles from './style'
import RewardsMock from '@components/WrappedActionMenu/RewardsMock'
import RewardsTab from '@components/WrappedActionMenu/RewardsTab/RewardsTab'

export interface IProps {
  maxWidth?: MaxWidthProperty<number>
  onMint: (amount: BN, decimals: number) => () => void
  onDeposit: (amount: BN, decimals: number) => () => void
  onWithdraw: (amount: BN, decimals: number) => () => void
  onBurn: (amount: BN, decimals: number) => () => void
  availableToMint: BN
  availableToDeposit: BN
  availableToWithdraw: BN
  availableToBurn: BN
  mintState: Pick<IMint, 'sending' | 'error'>
  withdrawState: Pick<IWithdraw, 'sending' | 'error'>
  depositState: Pick<IDeposit, 'sending' | 'error'>
  burnState: Pick<IBurn, 'sending' | 'error'>
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
  availableToBurn,
  mintState,
  withdrawState,
  burnState,
  depositState
}) => {
  const classes = useStyles()

  const actionContents: IActionContents = {
    deposit: (
      <ActionTemplate
        action='deposit'
        maxAvailable={availableToDeposit}
        maxDecimal={6}
        onClick={onDeposit}
        currency='SNY'
        sending={depositState.sending}
        hasError={!!depositState.error?.length}
      />
    ),
    mint: (
      <ActionTemplate
        action='mint'
        maxAvailable={availableToMint}
        maxDecimal={6}
        onClick={onMint}
        currency='xUSD'
        sending={mintState.sending}
        hasError={!!mintState.error?.length}
      />
    ),
    withdraw: (
      <ActionTemplate
        action='withdraw'
        maxAvailable={availableToWithdraw}
        maxDecimal={6}
        onClick={onWithdraw}
        currency='SNY'
        sending={withdrawState.sending}
        hasError={!!withdrawState.error?.length}
      />
    ),
    burn: (
      <ActionTemplate
        maxAvailable={availableToBurn}
        maxDecimal={6}
        action='burn'
        onClick={onBurn}
        currency='xUSD'
        sending={burnState.sending}
        hasError={!!burnState.error?.length}
      />
    ),
    rewards: <RewardsTab />
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
