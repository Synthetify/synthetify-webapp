import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ConnectWallet from './ConnectWallet'

storiesOf('modals/connectWallet', module).add('default', () => (
  <ConnectWallet
    open={true}
    options={['phantom', 'sollet', 'extension']}
    handleClose={() => {}}
    callDisconect={action('disconnect')}
    onSelect={(wallet: string) => action('chosen: ' + wallet)()}
  />
))
