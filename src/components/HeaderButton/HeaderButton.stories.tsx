import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { toBlur } from '@consts/uiUtils'
import { Typography } from '@material-ui/core'
import { colors } from '@static/theme'
import HeaderButton from './HeaderButton'
import SelectNetworkButton from './SelectNetworkButton'
import ChangeWalletButton from './ChangeWalletButton'

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

storiesOf('buttons/HeaderButton', module)
  .addDecorator(withKnobs)
  .add('headerDefault', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <HeaderButton name='Click me' onClick={(chosen: string) => action(`chosen: ${chosen}`)} />
    </div>
  ))
  .add('selectWallet', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <ChangeWalletButton options={['phantom', 'sollet', 'extension']} name='Open Dropdown' connected={false} onSelect={(chosen: string) => action(`chosen: ${chosen}`)()}/>
      <br />
      <div id={toBlur} style={{ color: '#00F9BB' }}>
        <Typography variant='body2'>{loremIpsum}</Typography>
      </div>
    </div>
  ))
  .add('withDisconnect', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <ChangeWalletButton options={['phantom', 'sollet', 'extension']} name='Open Dropdown' connected={true} onSelect={(chosen: string) => action(`chosen: ${chosen}`)()}/>
      <br />
      <div id={toBlur} style={{ color: '#00F9BB' }}>
        <Typography variant='body2'>{loremIpsum}</Typography>
      </div>
    </div>
  ))
  .add('selectNetwork', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectNetworkButton
        name='Mainnet'
        networks={[
          { name: 'testnet', network: 'https://api.solana.com/' },
          { name: 'localnet', network: 'https://127.0.0.1:8898/' }
        ]}
        onSelect={(chosen: string) => action(`chosen: ${chosen}`)()}
      />
    </div>
  ))
