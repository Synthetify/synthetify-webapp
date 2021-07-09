import { storiesOf } from '@storybook/react'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import React from 'react'
import { colors } from '@static/theme'
import { BN } from '@project-serum/anchor'

storiesOf('WrappedActionMenu/Menu', module).add('mint mock', () => (
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
        nextRoundPoints: new BN(100000000),
        amountToClaim: new BN(88648),
        currentRoundPoints: new BN(45415301),
        finishedRoundPoints: new BN(599353037),
        lastUpdate: new BN(100000000)
      }}
    />
  </div>
))
