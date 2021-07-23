import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { actions } from '@reducers/staking'
import {
  userMaxMintUsd,
  userMaxWithdraw,
  xUSDAddress,
  userStaking,
  staking,
  userDebtShares
} from '@selectors/exchange'
import { slot } from '@selectors/solanaConnection'
import { collateralAccountsArray, userMaxBurnToken, userMaxDeposit } from '@selectors/solanaWallet'
import { mint, deposit, withdraw, burn } from '@selectors/staking'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const [depositIndex, setDepositIndex] = useState(0)
  const [withdrawIndex, setWithdrawIndex] = useState(0)

  const availableToMint = useSelector(userMaxMintUsd)
  const userCollaterals = useSelector(collateralAccountsArray)
  const { balance, decimals: depositDecimal } = useSelector(
    userMaxDeposit(userCollaterals[depositIndex]?.programId ?? DEFAULT_PUBLICKEY)
  )
  const availableToWithdraw = useSelector(
    userMaxWithdraw(userCollaterals[withdrawIndex]?.programId ?? DEFAULT_PUBLICKEY)
  )
  const xUSDTokenAddress = useSelector(xUSDAddress)
  const availableToBurn = useSelector(userMaxBurnToken(xUSDTokenAddress))
  const mintState = useSelector(mint)
  const withdrawState = useSelector(withdraw)
  const depositState = useSelector(deposit)
  const burnState = useSelector(burn)
  const userStakingState = useSelector(userStaking)
  const stakingState = useSelector(staking)
  const userDebtSharesState = useSelector(userDebtShares)
  const slotState = useSelector(slot)

  return (
    <WrappedActionMenu
      onMint={(amount, decimal) => () => {
        dispatch(actions.mint({ amount: amount.muln(10 ** 6).divn(10 ** decimal) }))
      }}
      onBurn={(amount, decimal) => () => {
        dispatch(
          actions.burn({
            amount: amount.muln(10 ** 6).divn(10 ** decimal),
            tokenAddress: xUSDTokenAddress
          })
        )
      }}
      onDeposit={(amount, decimal) => () => {
        dispatch(
          actions.deposit({
            amount: amount.muln(10 ** ((userCollaterals[depositIndex]?.decimals ?? 9) - decimal)),
            tokenAddress: userCollaterals[depositIndex]?.programId ?? DEFAULT_PUBLICKEY
          })
        )
      }}
      onWithdraw={(amount, decimal) => () => {
        dispatch(
          actions.withdraw({
            amount: amount.muln(10 ** ((userCollaterals[withdrawIndex]?.decimals ?? 6) - decimal)),
            tokenAddress: userCollaterals[withdrawIndex]?.programId ?? DEFAULT_PUBLICKEY
          })
        )
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
        roundLength: stakingState.roundLength,
        userDebtShares: userDebtSharesState,
        rounds: {
          next: {
            roundAllPoints: stakingState.nextRound.allPoints,
            roundPoints: userStakingState.nextRoundPoints,
            roundStartSlot: stakingState.nextRound.start
          },
          current: {
            roundAllPoints: stakingState.currentRound.allPoints,
            roundPoints: userStakingState.currentRoundPoints,
            roundStartSlot: stakingState.currentRound.start
          },
          finished: {
            roundAllPoints: stakingState.finishedRound.allPoints,
            roundPoints: userStakingState.finishedRoundPoints,
            roundStartSlot: stakingState.finishedRound.start
          }
        },
        onClaim: () => dispatch(actions.claimRewards()),
        onWithdraw: () => dispatch(actions.withdrawRewards())
      }}
      collaterals={userCollaterals}
      depositCurrency={userCollaterals[depositIndex]?.symbol ?? 'SNY'}
      withdrawCurrency={userCollaterals[withdrawIndex]?.symbol ?? 'SNY'}
      onSelectDepositToken={(chosen) => {
        setDepositIndex(userCollaterals.findIndex(token => token.symbol === chosen))
      }}
      onSelectWithdrawToken={(chosen) => {
        setWithdrawIndex(userCollaterals.findIndex(token => token.symbol === chosen))
      }}
      depositDecimal={depositDecimal}
      withdrawDecimal={userCollaterals[withdrawIndex]?.decimals ?? 6}
    />
  )
}

export default ActionMenuContainer
