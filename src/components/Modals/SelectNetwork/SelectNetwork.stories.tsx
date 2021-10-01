import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectNetwork, { ISelectNetwork } from '@components/Modals/SelectNetwork/SelectNetwork'
import { NetworkType, SolanaNetworks } from '@consts/static'


const networks = [
  { name: 'Mainnet', network: 'https://solana-api.projectserum.com' },
  { name: 'Devnet', network: 'https://api.devnet.solana.com' },
  { name: 'Testnet', network: 'https://api.testnet.solana.com' }
]

storiesOf('modals/selectNetwork', module)
  .add('default', () => (
    <SelectNetwork networks={networks} open={true} handleClose={() => {}} onSelect={(selected: string) => action('chosen: ' + selected)()} anchorEl={null} />
  ))
