import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import SelectToken from '@components/Inputs/SelectToken/SelectToken'

const tokens = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ')

storiesOf('Inputs/selectToken', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectToken current={null} name='Select&nbsp;token' tokens={tokens} onSelect={(chosen: string) => action(`chosen: ${chosen}`)} />
    </div>
  ))
  .add('chosen', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectToken current={'SOL'} name='Select&nbsp;token' tokens={tokens} onSelect={(chosen: string) => action(`chosen: ${chosen}`)} />
    </div>
  ))
