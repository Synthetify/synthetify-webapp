import React from 'react'
import { useDispatch } from 'react-redux'
import SwaplineComponent from '@components/Swap/Swapline/SwaplineComponent'
import { SwaplinePair } from '@selectors/solanaWallet'
import { actions } from '@reducers/exchange'

export interface ISwaplineComponent {
  pairs: SwaplinePair[]
  onSelectPair: (index: number | null) => void
}

export const WrappedSwaplineComponent: React.FC<ISwaplineComponent> = ({ pairs, onSelectPair }) => {
  const dispatch = useDispatch()
  return (
    <SwaplineComponent
      pairs={pairs}
      onSelectPair={onSelectPair}
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
