import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import BurnWarning from './BurnWarning'
import BN from 'bn.js'

storiesOf('Modals/burnWarning', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <BurnWarning
      open={true}
      burnAmount={{
        amount: new BN(312456),
        decimal: 4
      }}
      burnTokenSymbol={'xUSD'}
      rewards={{
        slot: 10000,
        amountToClaim: {
          val: new BN(1000),
          scale: 6
        },
        roundLength: 43242,
        SNYPrice: {
          val: new BN(10000),
          scale: 6
        },
        rounds: {
          next: {
            roundPoints: new BN(100),
            roundAllPoints: new BN(100),
            roundStartSlot: new BN(100),
            roundAmount: {
              val: new BN(100),
              scale: 6
            }
          },
          current: {
            roundPoints: new BN(100),
            roundAllPoints: new BN(100),
            roundStartSlot: new BN(100),
            roundAmount: {
              val: new BN(100),
              scale: 6
            }
          },
          finished: {
            roundPoints: new BN(100),
            roundAllPoints: new BN(100),
            roundStartSlot: new BN(100),
            roundAmount: {
              val: new BN(100),
              scale: 6
            }
          }
        },
        onClaim: () => {},
        onWithdraw: () => {},
        amountPerRoundValue: {
          val: new BN(100),
          scale: 6
        },
        collateralValue: 532,
        userMarinadeAmount: 342,
        stakedUserValue: new BN(100),
        userDebtShares: new BN(100),
        allDebtValue: [
          {
            symbol: 'SNY',
            percent: 5,
            value: 2000
          }
        ]
      }}
      onBurn={(_amount: BN, _decimals: number) => () => {}}
      onCancel={() => {}}
    />
  ))
