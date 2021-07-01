import { storiesOf } from '@storybook/react'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import React from 'react'
import { colors } from '@static/theme'
import { BN } from '@project-serum/anchor'

storiesOf('WrappedActionMenu/Menu', module).add('mint mock', () => (
  <div style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
    <WrappedActionMenu
      maxWidth={850}
      onMint={(_amount: BN) => () => {}}
      onBurn={(_amount: BN) => () => {}}
      onDeposit={(_amount: BN) => () => {}}
      onWithdraw={(_amount: BN) => () => {}}
      availableToMint={new BN(198_900_001)}
      availableToDeposit={new BN(900_000)}
      availableToWithdraw={new BN(198_900_001)}
      availableToBurn={new BN(198_900_001)}
    />
  </div>
))
