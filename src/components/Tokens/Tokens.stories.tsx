import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { Tokens } from './Tokens'
import { IToken } from './Item/Item'
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

const synthetic = [xSNY, xBTC]
const staked = [SOL, FTT]

storiesOf('Tokens/Tokens', module)
  .addDecorator(withKnobs)
  .add('Example token list', () => <Tokens synthetic={synthetic} staked={staked} addAccount={action('addAccount')} />)
  .add('Empty token list', () => <Tokens synthetic={[]} staked={[]} addAccount={action('addAccount')} />)
