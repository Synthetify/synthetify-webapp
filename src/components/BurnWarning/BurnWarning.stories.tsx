import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import BurnWarning from './BurnWarning'
import BN from 'bn.js'

storiesOf('Modals/burnWarning', module)
  .addDecorator(withKnobs)
  .add('default', () => <BurnWarning
    burnAmount={{
      amount: new BN(312456),
      decimal: 4
    }}
    burnTokenSymbol={'xUSD'}
    rewardAmount={{
      amount: new BN(312456),
      decimal: 4
    }}
    claimTime={'13:03:22'}
  />)
