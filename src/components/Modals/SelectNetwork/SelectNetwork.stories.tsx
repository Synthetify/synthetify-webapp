import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectNetwork from '@components/Modals/SelectNetwork/SelectNetwork'

const networks = [
  { name: 'testnet', network: 'https://api.solana.com/' },
  { name: 'localnet', network: 'https://127.0.0.1:8898/' }
]

storiesOf('modals/selectNetwork', module)
  .add('default', () => (
    <SelectNetwork networks={networks} open={true} handleClose={() => {}} onSelect={(selected: string) => action('chosen: ' + selected)()} anchorEl={null} />
  ))
