import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectNetwork, { ISelectNetwork } from '@components/Modals/SelectNetwork/SelectNetwork'
import { NetworkType, SolanaNetworks } from '@consts/static'


const networks = [
  { name: 'mainnet', network: 'https://solana-api.projectserum.com' },
  { name: 'devnet', network: 'https://api.devnet.solana.com' },
  { name: 'testnet', network: 'https://api.testnet.solana.com' }
]

storiesOf('modals/selectNetwork', module)
  .add('default', () => (
    <SelectNetwork networks={networks} open={true} handleClose={() => {}} onSelect={(selected: string) => action('chosen: ' + selected)()} anchorEl={null} />
  ))
