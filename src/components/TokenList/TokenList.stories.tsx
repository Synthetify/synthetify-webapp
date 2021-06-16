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
  usdValue: 11.6579
}

const xBTC: IToken = {
  ticker: '$BTC',
  balance: new BN(1e6),
  decimals: 6,
  usdValue: 39193.3
}

const SOL: IToken = {
  ticker: 'SOL',
  balance: new BN(394987483),
  decimals: 6,
  usdValue: 18059.35
}

const FTT: IToken = {
  ticker: 'FTT',
  balance: new BN(2 * 1e6),
  decimals: 6,
  usdValue: 34.1
}

const tokens = [xSNY, xBTC, SOL, FTT]

storiesOf('Tokens/tokenList', module)
  .addDecorator(withKnobs)
  .add('Token list example', () => <TokenList tokens={tokens} addAccount={action('addAccount')} />)
