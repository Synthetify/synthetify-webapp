/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { actions } from '@reducers/modals'
import { userMaxMintUsd, userMaxWithdraw, collateralToken, userMaxBurnToken, xUSDAddress } from '@selectors/exchange'
import { tokenBalance } from '@selectors/solanaWallet'

export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const availableToMint = useSelector(userMaxMintUsd)
  const availableToWithdraw = useSelector(userMaxWithdraw)
  const token = useSelector(collateralToken)
  const { balance } = useSelector(tokenBalance(token))
  const address = useSelector(xUSDAddress)
  const availableToBurn = useSelector(userMaxBurnToken(address))

  return <WrappedActionMenu
    onMint={(amount) => () => {
        dispatch(actions.mint({ amount }))
    }}
    onBurn={(amount) => () => {
        dispatch(actions.burn({ amount }))
    }}
    onDeposit={(amount) => () => {
        dispatch(actions.deposit({ amount }))
    }}
    onWithdraw={(amount) => () => {
        dispatch(actions.withdraw({ amount }))
    }}
    availableToMint={availableToMint}
    availableToDeposit={balance}
    availableToWithdraw={availableToWithdraw}
    availableToBurn={availableToBurn}
  />
}

export default ActionMenuContainer
