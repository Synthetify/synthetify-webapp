import { storiesOf } from '@storybook/react'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import React from 'react'
import { colors } from '@static/theme'
import { BN } from '@project-serum/anchor'

storiesOf('WrappedActionMenu/Menu', module).add('mock', () => (
  <div style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
    <WrappedActionMenu
      maxWidth={850}
      onMint={(_amount: BN, _decimal: number) => () => {}}
      onBurn={(_amount: BN, _decimal: number) => () => {}}
      onDeposit={(_amount: BN, _decimal: number) => () => {}}
      onWithdraw={(_amount: BN, _decimal: number) => () => {}}
      availableToMint={new BN(198_900_001)}
      availableToDeposit={new BN(900_000)}
      availableToWithdraw={new BN(198_900_001)}
      availableToBurn={new BN(198_900_001)}
      mintState={{ sending: false }}
      withdrawState={{ sending: false }}
      depositState={{ sending: false }}
      burnState={{ sending: false }}
      stakingData={{
        slot: 300000,
        userDebtShares: new BN(1e6),
        roundLength: 160000,
        rounds: {
          finished: {
            roundStartSlot: new BN(1000000),
            roundPoints: new BN(1e6),
            roundAllPoints: new BN(1e9)
          },
          current: {
            roundStartSlot: new BN(1100000),
            roundPoints: new BN(1e6),
            roundAllPoints: new BN(1e9)
          },
          next: {
            roundStartSlot: new BN(1200000),
            roundPoints: new BN(1e6),
            roundAllPoints: new BN(1e9)
          }
        },
        amountPerRound: {
          val: new BN(1e10),
          scale: 0
        },
        amountToClaim: {
          val: new BN(88648),
          scale: 0
        },
        onWithdraw: () => {},
        onClaim: () => {}
      }}
      depositTokens={[]}
      withdrawTokens={[]}
      withdrawCurrency='SNY'
      withdrawDecimal={6}
      depositCurrency='SNY'
      depositDecimal={6}
      walletConnected={true}
      noWalletHandler={() => {}}
      emptyDepositTokensHandler={() => {}}
      emptyWithdrawTokensHandler={() => {}}
    />
  </div>
))
