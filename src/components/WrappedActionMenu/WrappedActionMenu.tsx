import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'
import ActionMenu, { IActionContents } from '@components/SwitchMenu/ActionMenu'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { BN } from '@project-serum/anchor'
import { IBurn, IDeposit, IMint, IWithdraw } from '@reducers/staking'
import RewardsTab, { IRewardsProps } from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { MaxWidthProperty } from 'csstype'
import useStyles from './style'
import { TokenAccounts } from '@selectors/solanaWallet'
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
  stakingData: IRewardsProps
  collaterals: TokenAccounts[]
  staked: TokenAccounts[]
  withdrawCurrency: string
  depositCurrency: string
  onSelectDepositToken?: (chosen: string) => void
  onSelectWithdrawToken?: (chosen: string) => void
  depositDecimal: number
  withdrawDecimal: number
  walletConnected: boolean
  noWalletHandler: () => void
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
  depositState,
  stakingData,
  collaterals,
  staked,
  withdrawCurrency,
  depositCurrency,
  onSelectDepositToken,
  onSelectWithdrawToken,
  depositDecimal,
  withdrawDecimal,
  walletConnected,
  noWalletHandler
}) => {
  const classes = useStyles()

  const actionContents: IActionContents = {
    deposit: (
      <ActionTemplate
        action='deposit'
        maxAvailable={availableToDeposit}
        maxDecimal={depositDecimal}
        onClick={onDeposit}
        currency={depositCurrency}
        sending={depositState.sending}
        hasError={!!depositState.error?.length}
        tokens={collaterals}
        onSelectToken={onSelectDepositToken}
        showArrowInInput
        walletConnected={walletConnected}
        noWalletHandler={noWalletHandler}
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
        formatMaxAvailable={(max) => max.mul(new BN(99)).div(new BN(100))}
      />
    ),
    withdraw: (
      <ActionTemplate
        action='withdraw'
        maxAvailable={availableToWithdraw}
        maxDecimal={withdrawDecimal}
        onClick={onWithdraw}
        currency={withdrawCurrency}
        sending={withdrawState.sending}
        hasError={!!withdrawState.error?.length}
        tokens={staked}
        onSelectToken={onSelectWithdrawToken}
        showArrowInInput
        walletConnected={walletConnected}
        noWalletHandler={noWalletHandler}
        formatMaxAvailable={(max) => max.mul(new BN(99)).div(new BN(100))}
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
        formatMaxAvailable={(max) => max.mul(new BN(99)).div(new BN(100))}
      />
    ),
    rewards: <RewardsTab {...stakingData} />
  }

  return (
    <Card className={classes.card} style={{ maxWidth }}>
      <CardContent className={classes.cardContent}>
        <Grid container justifyContent='space-around' alignItems='flex-start' direction='column'>
          <ActionMenu actionContents={actionContents} onChange={() => {}} />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default WrappedActionMenu
