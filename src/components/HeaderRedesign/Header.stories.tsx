import React from 'react'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Header from './Header'

storiesOf('ui/HeaderRedesign', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Header address={DEFAULT_PUBLICKEY} network='Mainnet' landing='staking' />
  })
  .add('connected', () => {
    return (
      <Header
        address={new PublicKey(42)}
        typeOfWallet='phantom'
        landing='staking'
        network='Mainnet'
      />
    )
  })

