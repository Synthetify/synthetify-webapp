import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { SelectToken, TokenNameWithIcon } from '@components/Modals/SelectToken/SelectToken'
import { Box } from '@material-ui/core'

const tokens: TokenNameWithIcon[] = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(i => {
  return { name: i }
})

storiesOf('modals/selectModal', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SelectToken tokens={tokens} open={true} handleClose={() => {}} onSelect={() => {}}>
      <Box>Test</Box>
    </SelectToken>
  ))
