import React from 'react'
import { storiesOf } from '@storybook/react'
import ExchangeAmountInput from './ExchangeAmountInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'
import { action } from '@storybook/addon-actions'

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

storiesOf('inputs/exchangeAmount', module)
  .addDecorator(withKnobs)
  .add('token', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ExchangeAmountInput setValue={() => {}} placeholder={'0.0'} onMaxClick={() => {}} tokens={tokens} current={'SOL'} onSelect={(chosen: number) => action(`chosen: ${chosen}`)} />
    </div>
  ))
  .add('pair', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <ExchangeAmountInput setValue={() => {}} placeholder={'0.0'} onMaxClick={() => {}} pairs={pairs} current={'USDC'} onSelect={(chosen: number) => action(`chosen pair: ${chosen}`)} />
    </div>
  ))
