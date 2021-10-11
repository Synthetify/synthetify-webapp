import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { Asset, Collateral, PriceStatus, Synthetic } from '@synthetify/sdk/lib/exchange'
import { toBlur } from '@consts/uiUtils'
import SwaplineComponent from './SwaplineComponent'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens, SwaplinePair } from '../tmpConsts'

const defaultSynthetic: Synthetic = {
  assetIndex: 0,
  assetAddress: new PublicKey(0),
  supply: {
    val: new BN(1e6),
    scale: 6
  },
  maxSupply: {
    val: new BN(1e10),
    scale: 6
  },
  settlementSlot: new BN(1),
  borrowedSupply: {
    val: new BN(1e6),
    scale: 6
  },
  swaplineSupply: {
    val: new BN(1e6),
    scale: 6
  }
}

const defaultCollateral: Collateral = {
  assetIndex: 0,
  collateralAddress: new PublicKey(0),
  reserveAddress: new PublicKey(0),
  liquidationFund: new PublicKey(0),
  reserveBalance: {
    val: new BN(1e6),
    scale: 6
  },
  collateralRatio: {
    val: new BN(30000),
    scale: 6
  },
  maxCollateral: {
    val: new BN(1e6),
    scale: 0
  }
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

const synthetics = 'xUSD xDOGE xSOL xFFT xETH x1INCH xAAVE xAERGO xAETH xAKRO'
  .split(' ')
  .map((i): ExchangeSyntheticTokens => {
    return { symbol: i, balance: new BN(0), ...defaultAsset, ...defaultSynthetic }
  })
synthetics[0].balance = new BN(100).mul(new BN(10000))
synthetics[1].balance = new BN(10).mul(new BN(10000))
synthetics[1].price = {
  val: (new BN(10)).mul(new BN(1000000)),
  scale: 4
}

const collaterals = 'USDC DOGE WSOL FFT ETH 1INCH AAVE AERGO AETH AKRO'
  .split(' ')
  .map((i): ExchangeCollateralTokens => {
    return {
      symbol: i,
      balance: new BN(0),
      ...defaultAsset,
      ...defaultCollateral,
      price: {
        ...defaultAsset.price,
        val: (new BN(3)).mul(new BN(1000))
      }
    }
  })
collaterals[0].balance = new BN(100).mul(new BN(10000))
collaterals[1].balance = new BN(10).mul(new BN(10000))
collaterals[1].price = {
  val: (new BN(10)).mul(new BN(1000000)),
  scale: 4
}

const pairs: SwaplinePair[] = synthetics.map((synth, index) => ({
  syntheticData: synth,
  collateralData: collaterals[index],
  synthetic: new PublicKey(0),
  collateral: new PublicKey(0),
  collateralReserve: new PublicKey(0),
  fee: {
    val: new BN(30000),
    scale: 6
  },
  accumulatedFee: {
    val: new BN(30000),
    scale: 6
  },
  balance: {
    val: new BN(30000),
    scale: 0
  },
  limit: {
    val: new BN(30000),
    scale: 0
  },
  bump: 1,
  halted: false
}))

storiesOf('ui/swaplineComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 900 }} id={toBlur}>
      <SwaplineComponent
        pairs={pairs}
        onSwap={onSwap}
        onSelectPair={() => {}}
      />
    </div>
  ))
