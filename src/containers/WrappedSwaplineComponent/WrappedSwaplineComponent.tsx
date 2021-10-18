import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SwaplineComponent from '@components/Swap/Swapline/SwaplineComponent'
import { swaplinePairs } from '@selectors/solanaWallet'
import { actions } from '@reducers/exchange'

export const WrappedSwaplineComponent: React.FC = () => {
  const dispatch = useDispatch()

  const pairs = useSelector(swaplinePairs)
  return (
    <SwaplineComponent
      pairs={pairs}
      onSelectPair={() => {}}
      onSwap={(collateral, synthetic, amount, swapType) => {
        dispatch(actions.swaplineSwap({
          collateral,
          synthetic,
          amount,
          swapType
        }))
      }}
    />
  )
}

export default WrappedSwaplineComponent
