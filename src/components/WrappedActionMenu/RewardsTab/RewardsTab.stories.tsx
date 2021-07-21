import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RewardsTab from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { colors } from '@static/theme'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/RewardsTab', module).add('rewards tab', () => (
  <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
    <RewardsTab
      slot={578000}
      userDebtShares={new BN(1e5)}
      roundLength={100000}
      amountPerRound={new BN(100000000)}
      amountToClaim={new BN(88648)}
      rounds={{
        finished: {
          roundStartSlot: new BN(1000000),
          roundPoints: new BN(1e6),
          roundAllPoints: new BN(1e8)
        },
        current: {
          roundStartSlot: new BN(1100000),
          roundPoints: new BN(1e6),
          roundAllPoints: new BN(1e8)
        },
        next: {
          roundStartSlot: new BN(1200000),
          roundPoints: new BN(1e6),
          roundAllPoints: new BN(1e8)
        }
      }}
      onWithdraw={() => action('withdraw')}
      onClaim={() => action('claim')}
    />
  </div>
))
