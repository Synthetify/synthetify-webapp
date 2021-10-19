import React from 'react'
import { storiesOf } from '@storybook/react'
import { SwapInfo } from './SwapInfo'

storiesOf('Swap/Info', module).add('Info', () => (
  <SwapInfo
    syntheticSymbol={'xBTC'}
    collateralSymbol={'SNY'}
    fee={0.3}
    balance={6234.35}
    limit={345625.39}
  />
))
