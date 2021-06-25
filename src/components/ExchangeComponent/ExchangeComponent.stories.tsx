import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ExchangeComponent from './ExchangeComponent'
import { BN } from '@project-serum/anchor'

const tokens = 'xUSD SNY Dogecoin SOL FFT ETH 1INCH AAVE AERGO AETH AKRO'
  .split(' ')
  .map(i => {
    return { symbol: i, balance: new BN(0) }
  })
tokens[0].balance = new BN(100)
tokens[1].balance = new BN(10)

storiesOf('ui/exchangeComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ExchangeComponent tokens={tokens} />
  ))
