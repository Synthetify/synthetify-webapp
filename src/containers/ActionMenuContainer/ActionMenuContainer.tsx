import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { actions } from '@reducers/staking'
import {
  userMaxMintUsd,
  userMaxWithdraw,
  xUSDAddress,
  tokenForSymbol,
  userStaking,
  staking
} from '@selectors/exchange'
import { tokenBalance, userMaxBurnToken } from '@selectors/solanaWallet'
import { mint, deposit, withdraw, burn } from '@selectors/staking'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const availableToMint = useSelector(userMaxMintUsd)
  const snyToken = useSelector(tokenForSymbol('SNY'))
  const { balance } = useSelector(tokenBalance(snyToken?.collateral.collateralAddress ?? DEFAULT_PUBLICKEY))
  const availableToWithdraw = useSelector(userMaxWithdraw(snyToken?.collateral.collateralAddress ?? DEFAULT_PUBLICKEY))
  const xUSDTokenAddress = useSelector(xUSDAddress)
  const availableToBurn = useSelector(userMaxBurnToken(xUSDTokenAddress))
  const mintState = useSelector(mint)
  const withdrawState = useSelector(withdraw)
  const depositState = useSelector(deposit)
  const burnState = useSelector(burn)
  const userStakingState = useSelector(userStaking)
  const stakingState = useSelector(staking)

  useEffect(() => {
    dispatch(actions.setBurnAddress({ tokenAddress: xUSDTokenAddress }))
  }, [dispatch, xUSDTokenAddress])

  return (
    <WrappedActionMenu
      onMint={(amount, decimal) => () => {
        dispatch(actions.mint({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onBurn={(amount, decimal) => () => {
        dispatch(actions.burn({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onDeposit={(amount, decimal) => () => {
        dispatch(actions.deposit({
          amount: amount.muln(10 ** 6).divn(10 ** decimal),
          tokenAddress: snyToken?.collateral.collateralAddress ?? DEFAULT_PUBLICKEY
        }))
      }}
      onWithdraw={(amount, decimal) => () => {
        dispatch(actions.withdraw({
          amount: amount.muln(10 ** 6).divn(10 ** decimal),
          tokenAddress: snyToken?.collateral.collateralAddress ?? DEFAULT_PUBLICKEY
        }))
      }}
      availableToMint={availableToMint.muln(99).divn(100)}
      availableToDeposit={balance}
      availableToWithdraw={availableToWithdraw.muln(99).divn(100)}
      availableToBurn={availableToBurn.muln(99).divn(100)}
      mintState={mintState}
      withdrawState={withdrawState}
      depositState={depositState}
      burnState={burnState}
      stakingData={{
        ...userStakingState,
        amountPerRound: stakingState.amountPerRound,
        currentRoundAllPoints: stakingState.currentRound.allPoints,
        finishedRoundAllPoints: stakingState.finishedRound.allPoints,
        onClaim: () => dispatch(actions.claimRewards()),
        onWithdraw: () => console.log('onWithdraw') // TODO
      }}
    />
  )
}

export default ActionMenuContainer
