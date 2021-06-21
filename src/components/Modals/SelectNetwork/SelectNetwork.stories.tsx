import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import SelectNetwork from '@components/Modals/SelectNetwork/SelectNetwork'

const tokens: TokenWithName[] = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(i => {
  return { name: i, publicKey: new PublicKey(0) }
})

storiesOf('modals/selectNetwork', module)
  .add('default', () => (
    <SelectNetwork tokens={tokens} open={true} handleClose={() => {}} onSelect={(k: PublicKey) => action('chosen: ' + k.toString())()} />
  ))
