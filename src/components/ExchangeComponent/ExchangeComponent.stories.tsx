import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ExchangeComponent from './ExchangeComponent'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Asset, PriceStatus, Synthetic } from '@synthetify/sdk/lib/exchange'
import { ExchangeTokensWithBalance } from '@selectors/solanaWallet'
import { Swap } from '@reducers/exchange'
import { toBlur } from '@consts/uiUtils'

const swap: Swap = {
  fromToken: new PublicKey(0),
  toToken: new PublicKey(0),
  amount: new BN(0),
  loading: false
}

const defaultSynthetic: Synthetic = {
  assetIndex: 0,
  assetAddress: new PublicKey(0),
  supply: {
    val: new BN(1e6),
    scale: 0
  },
  maxSupply: {
    val: new BN(1e10),
    scale: 0
  },
  settlementSlot: new BN(1)
}

const defaultAsset: Asset = {
  feedAddress: new PublicKey(0),
  lastUpdate: new BN(1),
  price: {
    val: (new BN(1)).mul(new BN(1000000)),
    scale: 0
  },
  confidence: {
    val: new BN(1),
    scale: 0
  },
  twap: {
    val: new BN(1),
    scale: 0
  },
  twac: {
    val: new BN(1),
    scale: 0
  },
  status: PriceStatus.Trading
}

const onSwap = (fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
  console.log(fromToken, toToken, amount)
}

const tokens = 'xUSD Dogecoin SOL FFT ETH 1INCH AAVE AERGO AETH AKRO'
  .split(' ')
  .map((i): ExchangeTokensWithBalance => {
    return { symbol: i, balance: new BN(0), ...defaultAsset, ...defaultSynthetic }
  })
tokens[0].balance = new BN(100).mul(new BN(10000))
tokens[1].balance = new BN(10).mul(new BN(10000))
tokens[1].price = {
  val: (new BN(10)).mul(new BN(1000000)),
  scale: 4
}

storiesOf('ui/exchangeComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 900 }} id={toBlur}>
      <ExchangeComponent
        tokens={tokens}
        swapData={swap}
        onSwap={onSwap}
        fee={{ val: new BN(3), scale: 6 }}
        discountPercent={-10}
        nextDiscountPercent={-12}
        nextDiscountThreshold={2137}
      />
    </div>
  ))
