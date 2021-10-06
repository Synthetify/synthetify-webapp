import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import SelectToken from '@components/Inputs/Selects/SelectToken/SelectToken'

const tokens = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(symbol => ({ symbol }))

storiesOf('Inputs/selectToken', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectToken current={null} name='Select&nbsp;token' tokens={tokens} onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()} />
    </div>
  ))
  .add('chosen', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <SelectToken current={'SOL'} name='Select&nbsp;token' tokens={tokens} onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()} />
    </div>
  ))
