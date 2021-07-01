import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import React from 'react'
import ExchangeComponent from '@components/ExchangeComponent/ExchangeComponent'

export const WrappedExchangeComponent: React.FC = () => {
  //TODO:  connect store
  return (
    <ExchangeComponent
      tokens={[]}
      onSwap={() => {}}
      swapData={{
        fromToken: new PublicKey(0),
        toToken: new PublicKey(0),
        amount: new BN(0),
        loading: false
      }}
    />
  )
}
