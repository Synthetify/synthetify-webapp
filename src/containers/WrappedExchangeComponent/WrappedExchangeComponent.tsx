import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import React, { useEffect } from 'react'
import ExchangeComponent from '@components/ExchangeComponent/ExchangeComponent'
import { useDispatch, useSelector } from 'react-redux'
import { exchangeTokensWithUserBalance } from '@selectors/solanaWallet'
import { swap } from '@selectors/exchange'
import { actions } from '@reducers/exchange'

export const WrappedExchangeComponent: React.FC = () => {
  const tokensWithBalance = useSelector(exchangeTokensWithUserBalance)
  const swapData = useSelector(swap)
  const dispatch = useDispatch()
  useEffect(() => {
    if (swapData.txid) {
      setTimeout(() => {
        dispatch(actions.swapDone({ txid: '' }))
      }, 1500)
    }
  }, [swapData.txid])
  return (
    <ExchangeComponent
      swapData={swapData}
      tokens={tokensWithBalance}
      onSwap={(fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
        dispatch(actions.swap({ toToken, fromToken, amount }))
      }}
    />
  )
}
