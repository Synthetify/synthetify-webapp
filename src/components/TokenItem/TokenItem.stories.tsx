import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { IToken, TokenItem } from '@components/TokenItem/TokenItem'
import { BN } from '@project-serum/anchor'

const token: IToken = {
  symbol: '$SNY',
  balance: new BN(562830),
  decimals: 6,
  usdValue: 11.6579
}

storiesOf('Tokens/tokenItem', module)
  .addDecorator(withKnobs)
  .add('Synthetify', () => <TokenItem token={token} />)
