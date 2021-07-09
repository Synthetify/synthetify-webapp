import React from 'react'
import { storiesOf } from '@storybook/react'
import RewardsTab from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { colors } from '@static/theme'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/RewardsTab', module).add('rewards tab', () => (
  <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
    <RewardsTab
      nextRoundPoints={new BN(100000000)}
      amountToClaim={new BN(88648)}
      currentRoundPoints={new BN(45415301)}
      finishedRoundPoints={new BN(599353037)}
      lastUpdate={new BN(100000000)}
    />
  </div>
))
