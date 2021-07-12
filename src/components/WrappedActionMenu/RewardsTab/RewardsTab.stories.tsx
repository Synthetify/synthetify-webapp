import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RewardsTab from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { colors } from '@static/theme'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/RewardsTab', module).add('rewards tab', () => (
  <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
    <RewardsTab
      amountPerRound={new BN(100000000)}
      amountToClaim={new BN(88648)}
      currentRoundPoints={new BN(45415301)}
      finishedRoundPoints={new BN(599353037)}
      currentRoundAllPoints={new BN(1e10)}
      finishedRoundAllPoints={new BN(1e10)}
      onWithdraw={() => action('withdraw')}
      onClaim={() => action('claim')}
    />
  </div>
))
