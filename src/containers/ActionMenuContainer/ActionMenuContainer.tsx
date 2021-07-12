import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { actions } from '@reducers/staking'
import {
  userMaxMintUsd,
  userMaxWithdraw,
  collateralToken,
  userMaxBurnToken,
  xUSDAddress,
  userStaking,
  staking
} from '@selectors/exchange'
import { tokenBalance } from '@selectors/solanaWallet'
import { mint, deposit, withdraw, burn } from '@selectors/staking'

export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const availableToMint = useSelector(userMaxMintUsd)
  const availableToWithdraw = useSelector(userMaxWithdraw)
  const token = useSelector(collateralToken)
  const { balance } = useSelector(tokenBalance(token))
  const tokenAddress = useSelector(xUSDAddress)
  const availableToBurn = useSelector(userMaxBurnToken(tokenAddress))
  const mintState = useSelector(mint)
  const withdrawState = useSelector(withdraw)
  const depositState = useSelector(deposit)
  const burnState = useSelector(burn)
  const userStakingState = useSelector(userStaking)
  const stakingState = useSelector(staking)

  useEffect(() => {
    dispatch(actions.setBurnAddress({ tokenAddress }))
  }, [dispatch, tokenAddress])

  return (
    <WrappedActionMenu
      onMint={(amount, decimal) => () => {
        dispatch(actions.mint({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onBurn={(amount, decimal) => () => {
        dispatch(actions.burn({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onDeposit={(amount, decimal) => () => {
        dispatch(actions.deposit({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onWithdraw={(amount, decimal) => () => {
        dispatch(actions.withdraw({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      availableToMint={availableToMint.muln(0.99)}
      availableToDeposit={balance}
      availableToWithdraw={availableToWithdraw.muln(0.99)}
      availableToBurn={availableToBurn.muln(0.99)}
      mintState={mintState}
      withdrawState={withdrawState}
      depositState={depositState}
      burnState={burnState}
      stakingData={{
        onClaim: () => dispatch(actions.claimRewards()),
        onWithdraw: () => console.log('onWithdraw'), // TODO
        currentRoundAllPoints: stakingState.currentRound.allPoints,
        finishedRoundAllPoints: stakingState.finishedRound.allPoints,
        ...userStakingState,
        ...stakingState
      }}
    />
  )
}

export default ActionMenuContainer
