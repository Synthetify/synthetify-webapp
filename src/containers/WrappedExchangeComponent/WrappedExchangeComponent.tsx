import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExchangeTokensWithBalance } from '@selectors/solanaWallet'
import { effectiveFeeData, swap } from '@selectors/exchange'
import { actions } from '@reducers/exchange'
import ExchangeComponent from '@components/ExchangeComponent/ExchangeComponent'

export const WrappedExchangeComponent: React.FC<{
  tokensWithBalance: ExchangeTokensWithBalance[],
  onSelectTokenTo: (index: number | null) => void
}> = ({ tokensWithBalance, onSelectTokenTo }) => {
  const feeData = useSelector(effectiveFeeData)
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
      tokens={tokensWithBalance}
      onSwap={(fromToken: PublicKey, toToken: PublicKey, amount: BN) => {
        dispatch(actions.swap({ toToken, fromToken, amount }))
      }}
      fee={feeData.fee}
      discountPercent={feeData.discountData.discount}
      nextDiscountThreshold={feeData.discountData.nextThreshold}
      onSelectTokenTo={onSelectTokenTo}
    />
  )
}
