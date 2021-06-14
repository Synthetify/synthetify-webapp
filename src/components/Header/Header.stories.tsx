import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'
import { SolanaNetworks } from '#web3/connection'
import { DEFAULT_PUBLICKEY } from '#consts/static'

storiesOf('ui/Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Header
        network={SolanaNetworks.DEV}
        address={DEFAULT_PUBLICKEY.toString()}
        onConnect={() => {}}
        onNetworkClick={() => {}}
      />
    )
  })
  .add('connected', () => {
    return (
      <Header
        onNetworkClick={() => {}}
        address={DEFAULT_PUBLICKEY.toString()}
        onConnect={() => {}}
        network={SolanaNetworks.MAIN}
      />
    )
  })
