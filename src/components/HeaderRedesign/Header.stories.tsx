import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Header from './Header'

storiesOf('ui/HeaderRedesign', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Header
        address={DEFAULT_PUBLICKEY}
        onNetworkSelect={(chosen: string) => {
          action(`network changed to: ${chosen}`)()
        }}
        onWalletSelect={(chosen: string) => {
          action(`wallet changed to: ${chosen}`)()
        }}
        walletConnected={false}
        landing='staking'
      />
    )
  })
  .add('connected', () => {
    return (
      <Header
        address={new PublicKey(42)}
        onNetworkSelect={(chosen: string) => {
          action(`network changed to: ${chosen}`)()
        }}
        onWalletSelect={(chosen: string) => {
          action(`wallet changed to: ${chosen}`)()
        }}
        walletConnected={true}
        landing='staking'
      />
    )
  })
