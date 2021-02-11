import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'
import { SolanaNetworks } from '@web3/solana/connection'

storiesOf('ui/Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Header onClickLogo={() => {}} network={SolanaNetworks.DEV} onNetworkClick={() => {}} />
  })
  .add('connected', () => {
    return <Header onClickLogo={() => {}} onNetworkClick={() => {}} network={SolanaNetworks.MAIN} />
  })
