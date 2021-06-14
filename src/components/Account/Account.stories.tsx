import React from 'react'
import { storiesOf } from '@storybook/react'
import Account from './Account'
import { withKnobs } from '@storybook/addon-knobs'
import { SolanaNetworks } from '#web3/connection'
import { BN } from '@project-serum/anchor'
storiesOf('ui/Account', module)
  .addDecorator(withKnobs)
  .add('mainnet', () => (
    <Account
      balance={new BN(12432352533)}
      address='Ftp4xgTu55MLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      network={SolanaNetworks.MAIN}
      onSend={() => {
        console.log('account send')
      }}
    />
  ))
  .add('testnet', () => (
    <Account
      balance={new BN(12432352533)}
      address='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      network={SolanaNetworks.TEST}
      onSend={() => {
        console.log('account send')
      }}
    />
  ))
