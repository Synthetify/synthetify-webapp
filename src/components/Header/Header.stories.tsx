import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'
import { SolanaNetworks } from '@web3/connection'

storiesOf('ui/Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Header network={SolanaNetworks.DEV} onNetworkClick={() => {}} />
  })
  .add('connected', () => {
    return <Header onNetworkClick={() => {}} network={SolanaNetworks.MAIN} />
  })
