import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import Select from '@components/Inputs/Select/Select'

const tokens = 'SNY Dogecoin SOL USD FFT ETH 1INCH AAVE AERGO AETH AKRO'.split(' ').map(symbol => ({ symbol }))
const pairs = [
  {
    symbol1: 'xUSD',
    symbol2: 'USDC'
  },
  {
    symbol1: 'xSOL',
    symbol2: 'WSOL'
  }
]

storiesOf('Inputs/select', module)
  .addDecorator(withKnobs)
  .add('default - token', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <Select current={null} name='Select&nbsp;token' tokens={tokens} onSelect={(chosen: number) => action(`chosen index: ${chosen}`)()} />
    </div>
  ))
  .add('chosen - token', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <Select current={'SOL'} name='Select&nbsp;token' tokens={tokens} onSelect={(chosen: number) => action(`chosen index: ${chosen}`)()} />
    </div>
  ))
  .add('default - pair', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <Select current={null} name='Select&nbsp;pair' pairs={pairs} onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()} />
    </div>
  ))
  .add('chosen - pair', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <Select current={'USDC'} name='Select&nbsp;pair' pairs={pairs} onSelect={(chosen: number) => action(`chosen pair index: ${chosen}`)()} />
    </div>
  ))
