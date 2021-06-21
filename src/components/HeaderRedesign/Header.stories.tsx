import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { storiesOf } from '@storybook/react'

import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('ui/HeaderRedesign', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Header address={DEFAULT_PUBLICKEY} network='Mainnet' current='staking'/>
  })
  .add('connected', () => {
    return <Header address={new PublicKey(42)} typeOfWallet='phantom' current='staking' network='Mainnet'/>
  })
