import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ExchangeComponent from './ExchangeComponent'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Asset } from '@synthetify/sdk/lib/manager'
import { TokensWithBalance } from '@selectors/solanaWallet'

const defaultAsset: Asset = {
  feedAddress: new PublicKey(0),
  assetAddress: new PublicKey(0),
  price: new BN(1),
  supply: new BN(1e6),
  lastUpdate: new BN(1),
  maxSupply: new BN(1e10),
  settlementSlot: new BN(1),
  decimals: 4
}

const tokens = 'xUSD SNY Dogecoin SOL FFT ETH 1INCH AAVE AERGO AETH AKRO'
  .split(' ')
  .map((i): TokensWithBalance => {
    return { symbol: i, balance: new BN(0), ...defaultAsset}
  })
tokens[0].balance = new BN(100).mul(new BN(10000))
tokens[1].balance = new BN(10).mul(new BN(10000))

storiesOf('ui/exchangeComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ExchangeComponent tokens={tokens} />
  ))
