import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ConnectWallet from './ConnectWallet'

storiesOf('modals/connectWallet', module)
  .add('default', () => (
    <ConnectWallet
      open={true}
      options={['phantom', 'sollet', 'extension']}
      handleClose={() => {}}
      callDisconect={action('disconnect')}
      connected={false}
      anchorEl={null}
      onSelect={(wallet: string) => action('chosen: ' + wallet)()}
    />
  ))
  .add('withDisconnect', () => (
    <ConnectWallet
      open={true}
      options={['phantom', 'sollet', 'extension']}
      handleClose={() => {}}
      callDisconect={action('disconnect')}
      connected={true}
      anchorEl={null}
      onSelect={(wallet: string) => action('chosen: ' + wallet)()}
    />
  ))
