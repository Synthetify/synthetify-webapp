import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { TokenList } from '@components/TokenList/TokenList'
import { IToken } from '@components/TokenItem/TokenItem'
import { BN } from '@project-serum/anchor'
import { action } from '@storybook/addon-actions'

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

storiesOf('Tokens/tokenList', module)
  .addDecorator(withKnobs)
  .add('Example token list', () => <TokenList tokens={tokens} addAccount={action('addAccount')} />)
  .add('Empty token list', () => <TokenList tokens={[]} addAccount={action('addAccount')} />)
