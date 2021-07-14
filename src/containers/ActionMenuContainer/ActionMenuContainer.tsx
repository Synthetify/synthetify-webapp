import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { actions } from '@reducers/staking'
import {
  userMaxMintUsd,
  userMaxWithdraw,
  xUSDAddress,
  userStaking,
  staking,
  assets
} from '@selectors/exchange'
import { slot } from '@selectors/solanaConnection'
import { tokenBalance, userMaxBurnToken } from '@selectors/solanaWallet'
import { mint, deposit, withdraw, burn } from '@selectors/staking'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const availableToMint = useSelector(userMaxMintUsd)
  const allAssets = useSelector(assets)

  const snyToken = Object.values(allAssets).find(token => token.symbol === 'SNY')

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
  const slotState = useSelector(slot)

  return (
    <WrappedActionMenu
      onMint={(amount, decimal) => () => {
        dispatch(actions.mint({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onBurn={(amount, decimal) => () => {
        dispatch(actions.burn({
          amount: amount.muln(10 ** 6).divn(10 ** decimal),
          tokenAddress: xUSDTokenAddress
        }))
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
        slot: slotState,
        amountPerRound: stakingState.amountPerRound,
        currentRoundAllPoints: stakingState.currentRound.allPoints,
        finishedRoundAllPoints: stakingState.finishedRound.allPoints,
        roundLength: stakingState.roundLength,
        currentRoundStart: stakingState.currentRound.start,
        onClaim: () => dispatch(actions.claimRewards()),
        onWithdraw: () => dispatch(actions.withdrawRewards())
      }}
    />
  )
}

export default ActionMenuContainer
