import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import List from './List'
import { IToken } from '../Item/Item'
import { BN } from '@project-serum/anchor'

const xSNY: IToken = {
  ticker: '$SNY',
  balance: new BN(562830),
  decimals: 6,
  usdValue: new BN(116579),
  assetDecimals: 6
}

const xBTC: IToken = {
  ticker: '$BTC',
  balance: new BN(1e6),
  decimals: 6,
  usdValue: new BN(391933000),
  assetDecimals: 6
}

const SOL: IToken = {
  ticker: 'SOL',
  balance: new BN(394987483),
  decimals: 6,
  usdValue: new BN(180593500),
  assetDecimals: 6
}

const FTT: IToken = {
  ticker: 'FTT',
  balance: new BN(2 * 1e6),
  decimals: 6,
  usdValue: new BN(341000),
  assetDecimals: 6
}

const tokens = [xSNY, xBTC, SOL, FTT]

storiesOf('Tokens/List', module)
  .addDecorator(withKnobs)
  .add('Example token list', () => <List tokens={tokens} />)
  .add('Empty token list', () => <List tokens={[]} />)
