import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import { actions } from '@reducers/staking'
import { actions as snackbarActions } from '@reducers/snackbars'
import {
  userMaxMintUsd,
  userMaxWithdraw,
  xUSDAddress,
  userStaking,
  staking,
  userDebtShares
} from '@selectors/exchange'
import { slot } from '@selectors/solanaConnection'
import { collateralAccountsArray, stakedAccountsArray, userMaxBurnToken, userMaxDeposit, status } from '@selectors/solanaWallet'
import { mint, deposit, withdraw, burn } from '@selectors/staking'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Status } from '@reducers/solanaWallet'
import { BN } from '@project-serum/anchor'

export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const [depositIndex, setDepositIndex] = useState(0)
  const [withdrawIndex, setWithdrawIndex] = useState(0)

  const availableToMint = useSelector(userMaxMintUsd)
  const userCollaterals = useSelector(collateralAccountsArray)
  const userStaked = useSelector(stakedAccountsArray)
  const { balance, decimals: depositDecimal } = useSelector(
    userMaxDeposit(userCollaterals[depositIndex]?.programId ?? DEFAULT_PUBLICKEY)
  )
  const availableToWithdraw = useSelector(
    userMaxWithdraw(userStaked[withdrawIndex]?.programId ?? DEFAULT_PUBLICKEY)
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
  const walletStatus = useSelector(status)

  useEffect(() => {
    if (walletStatus === Status.Uninitialized) {
      setDepositIndex(0)
      setWithdrawIndex(0)
    }
  }, [walletStatus])

  useEffect(() => {
    if (userCollaterals.length <= depositIndex) {
      setDepositIndex(0)
    }
  }, [userCollaterals, depositIndex])

  useEffect(() => {
    if (userStaked.length <= withdrawIndex) {
      setWithdrawIndex(0)
    }
  }, [userStaked, withdrawIndex])

  return (
    <WrappedActionMenu
      onMint={(amount, decimal) => () => {
        dispatch(actions.mint({ amount: amount.mul(new BN(10 ** 6)).div(new BN(10 ** decimal)) }))
      }}
      onBurn={(amount, decimal) => () => {
        dispatch(
          actions.burn({
            amount: amount.mul(new BN(10 ** 6)).div(new BN(10 ** decimal)),
            tokenAddress: xUSDTokenAddress
          })
        )
      }}
      onDeposit={(amount, decimal) => () => {
        dispatch(
          actions.deposit({
            amount: amount.mul(new BN(10 ** ((userCollaterals[depositIndex]?.decimals ?? 9) - decimal))),
            tokenAddress: userCollaterals[depositIndex]?.programId ?? DEFAULT_PUBLICKEY
          })
        )
      }}
      onWithdraw={(amount, decimal) => () => {
        dispatch(
          actions.withdraw({
            amount: amount.mul(new BN(10 ** ((userStaked[withdrawIndex]?.decimals ?? 6) - decimal))),
            tokenAddress: userStaked[withdrawIndex]?.programId ?? DEFAULT_PUBLICKEY
          })
        )
      }}
      availableToMint={availableToMint}
      availableToDeposit={balance}
      availableToWithdraw={availableToWithdraw}
      availableToBurn={availableToBurn}
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
      depositTokens={(walletStatus === Status.Initalized) ? userCollaterals : []}
      withdrawTokens={userStaked}
      depositCurrency={(walletStatus === Status.Initalized) ? (userCollaterals[depositIndex]?.symbol ?? 'SNY') : 'SNY'}
      withdrawCurrency={userStaked[withdrawIndex]?.symbol ?? 'SNY'}
      onSelectDepositToken={(chosen) => {
        setDepositIndex(userCollaterals.findIndex(token => token.symbol === chosen))
      }}
      onSelectWithdrawToken={(chosen) => {
        setWithdrawIndex(userStaked.findIndex(token => token.symbol === chosen))
      }}
      depositDecimal={depositDecimal}
      withdrawDecimal={userStaked[withdrawIndex]?.decimals ?? 6}
      walletConnected={walletStatus === Status.Initalized}
      noWalletHandler={() => dispatch(
        snackbarActions.add({
          message: 'Connect your wallet first',
          variant: 'warning',
          persist: false
        })
      )}
      emptyDepositTokensHandler={() => dispatch(
        snackbarActions.add({
          message: 'You have no tokens to deposit',
          variant: 'info',
          persist: false
        })
      )}
      emptyWithdrawTokensHandler={() => dispatch(
        snackbarActions.add({
          message: 'You have no tokens to withdraw',
          variant: 'info',
          persist: false
        })
      )}
    />
  )
}

export default ActionMenuContainer
