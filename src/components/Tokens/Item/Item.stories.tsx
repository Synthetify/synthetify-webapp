import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IToken, Item } from './Item'
import { BN } from '@project-serum/anchor'

const xSNY: IToken = {
  ticker: '$SNY',
  balance: new BN(562830),
  decimals: 6,
  usdValue: new BN(116579),
  assetDecimals: 6
}

const xBTC: IToken = {
  ticker: 'xBTC',
  balance: new BN(1e6),
  decimals: 6,
  usdValue: new BN(391933000),
  assetDecimals: 6
}

storiesOf('Tokens/Item', module)
  .addDecorator(withKnobs)
  .add('Synthetify', () => <Item {...xSNY} />)
  .add('xBTC', () => <Item {...xBTC} />)
