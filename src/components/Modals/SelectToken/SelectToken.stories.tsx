import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { SelectToken, TokenWithName } from '@components/Modals/SelectToken/SelectToken'
import { Box } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import { action } from '@storybook/addon-actions'

const tokens: TokenWithName[] = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(i => {
  return { name: i, publicKey: new PublicKey(0) }
})

storiesOf('modals/selectModal', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectToken tokens={tokens} open={true} handleClose={() => {}} onSelect={(k: PublicKey) => action('chosen: ' + k.toString())()}>
      <Box>Test</Box>
    </SelectToken>
  ))
