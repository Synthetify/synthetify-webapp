import React from 'react'
import { storiesOf } from '@storybook/react'
import Account from './Account'
import { withKnobs } from '@storybook/addon-knobs'
import { SolanaNetworks } from '@web3/solana/connection'
storiesOf('ui/Account', module)
  .addDecorator(withKnobs)
  .add('mainnet', () => (
    <Account
      balance={12432352533}
      address='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      network={SolanaNetworks.MAIN}
      onSend={() => {
        console.log('account send')
      }}
    />
  ))
  .add('testnet', () => (
    <Account
      balance={12432352533}
      address='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      network={SolanaNetworks.TEST}
      onSend={() => {
        console.log('account send')
      }}
    />
  ))
