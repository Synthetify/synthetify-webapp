import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import RewardsTab from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { colors } from '@static/theme'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/RewardsTab', module)
  .add('rewards tab', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <RewardsTab
        SNYPrice={{
          val: new BN(2000000),
          scale: 6
        }}
        stakedUserValue={new BN(2137)}
        slot={578000}
        userDebtShares={new BN(1e5)}
        roundLength={100000}
        amountToClaim={{
          val: new BN(88648),
          scale: 0
        }}
        rounds={{
          finished: {
            roundStartSlot: new BN(1000000),
            roundPoints: new BN(1e6),
            roundAllPoints: new BN(1e8),
            roundAmount: {
              val: new BN(100000000),
              scale: 0
            }
          },
          current: {
            roundStartSlot: new BN(1100000),
            roundPoints: new BN(1e6),
            roundAllPoints: new BN(1e8),
            roundAmount: {
              val: new BN(100000000),
              scale: 0
            }
          },
          next: {
            roundStartSlot: new BN(1200000),
            roundPoints: new BN(1e6),
            roundAllPoints: new BN(1e8),
            roundAmount: {
              val: new BN(100000000),
              scale: 0
            }
          }
        }}
        onWithdraw={() => action('withdraw')}
        onClaim={() => action('claim')}
      />
    </div>
  ))
