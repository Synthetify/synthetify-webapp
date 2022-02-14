import React from 'react'
import { storiesOf } from '@storybook/react'
import { OpenLeverage } from './OpenLeverage'
import { BN } from '@project-serum/anchor'

storiesOf('Leverage', module).add('open leverage', () => (
  <OpenLeverage
    action={'Open'}
    liquidationPriceTo={0.85}
    allSynthetic={[]}
    sending={false}
    pairIndex={null}
    setPairIndex={() => {
      console.log('change Pair index')
    }}
    vaultAmount={{
      collateralAmount: { val: new BN(0), scale: 0 },
      borrowAmount: { val: new BN(0), scale: 0 }
    }}
    walletStatus={true}
    noWalletHandler={() => {
      console.log('change wallet')
    }}
    leveragePairs={[]}
    leverageIndex={null}
    setLeverageIndex={(nr: number) => {
      console.log('change leverage index', nr)
    }}
    currentLeverage={'2.5'}
    setLiquidationPriceTo={(nr: number) => {
      console.log('change liquidation price', nr)
    }}
    cRatio={'400'}
    leverageType={'short'}
    amountToken={new BN(5000000)}
    setAmountToken={(nr: BN) => {
      console.log('change amount', nr)
    }}
    price={{
      collateralPrice: { val: new BN(0), scale: 0 },
      syntheticPrice: { val: new BN(0), scale: 0 }
    }}
  />
))
