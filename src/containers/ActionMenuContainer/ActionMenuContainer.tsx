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
  userDebtShares,
  stakedValue,
  getSNYPrice,
  getCollateralValue,
  getSyntheticsStructure,
  getMSolTvl,
  getstSolTvl
} from '@selectors/exchange'
import { slot } from '@selectors/solanaConnection'
import {
  collateralAccountsArray,
  stakedAccountsArray,
  userMaxBurnToken,
  userMaxDeposit,
  status,
  userMarinadeRewardAmount,
  tokenBalance,
  userLidoRewardAmount
} from '@selectors/solanaWallet'
import { mint, deposit, withdraw, burn } from '@selectors/staking'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Status } from '@reducers/solanaWallet'
import { BN } from '@project-serum/anchor'
import BurnWarning from '@components/BurnWarning/BurnWarning'
import { XUSD_DECIMALS } from '@synthetify/sdk/lib/utils'
import { getMndePrice, getLidoPrice, printBNtoBN } from '@consts/utils'
export const ActionMenuContainer: React.FC = () => {
  const dispatch = useDispatch()

  const [depositIndex, setDepositIndex] = useState(0)
  const [withdrawIndex, setWithdrawIndex] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [burnAmount, setBurnAmount] = useState(new BN(0))

  const availableToMint = useSelector(userMaxMintUsd)
  const userCollaterals = useSelector(collateralAccountsArray)
  const userStaked = useSelector(stakedAccountsArray)
  const { maxDeposit, decimals: depositDecimal } = useSelector(
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
  const allDebtValue = useSelector(getSyntheticsStructure)
  const stakingState = useSelector(staking)
  const userDebtSharesState = useSelector(userDebtShares)
  const slotState = useSelector(slot)
  const walletStatus = useSelector(status)
  const stakedUserValue = useSelector(stakedValue)
  const SNYPrice = useSelector(getSNYPrice)
  const collateralValue = useSelector(getCollateralValue)
  const userMarinadeAmount = useSelector(userMarinadeRewardAmount)
  const userLidoAmount = useSelector(userLidoRewardAmount)
  const xUSDBalance = useSelector(tokenBalance(xUSDTokenAddress))
  const mSolTvl = useSelector(getMSolTvl)
  const stSolTvl = useSelector(getstSolTvl)

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

  const [mndePrice, setMndePrice] = useState(0)
  const [lidoPrice, setLidoPrice] = useState(0)

  useEffect(() => {
    getMndePrice()
      .then(val => {
        setMndePrice(val)
      })
      .catch(error => {
        console.log(error)
      })
    getLidoPrice()
      .then(val => {
        setLidoPrice(val)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const estimateUserDebtShares = () => {
    if (stakingState.currentRound.start.toNumber() <= userStakingState.lastUpdate.toNumber()) {
      return {
        nextShares: userStakingState.nextRoundPoints,
        currentShares: userStakingState.currentRoundPoints,
        finishedShares: userStakingState.finishedRoundPoints
      }
    }

    if (stakingState.finishedRound.start.toNumber() <= userStakingState.lastUpdate.toNumber()) {
      return {
        nextShares: userDebtSharesState,
        currentShares: userStakingState.nextRoundPoints,
        finishedShares: userStakingState.currentRoundPoints
      }
    }

    if (
      stakingState.finishedRound.start.toNumber() - stakingState.roundLength <=
      userStakingState.lastUpdate.toNumber()
    ) {
      return {
        nextShares: userDebtSharesState,
        currentShares: userDebtSharesState,
        finishedShares: userStakingState.nextRoundPoints
      }
    }

    return {
      nextShares: userDebtSharesState,
      currentShares: userDebtSharesState,
      finishedShares: userDebtSharesState
    }
  }

  const { nextShares, currentShares, finishedShares } = estimateUserDebtShares()

  return (
    <>
      <BurnWarning
        open={showWarning}
        burnAmount={{
          amount: burnAmount,
          decimal: XUSD_DECIMALS
        }}
        onBurn={(amount, decimal) => () => {
          setShowWarning(false)
          dispatch(
            actions.burn({
              amount: amount.mul(new BN(10 ** 6)).div(new BN(10 ** decimal)),
              tokenAddress: xUSDTokenAddress
            })
          )
        }}
        onCancel={() => {
          setShowWarning(false)
        }}
        burnTokenSymbol={'xUSD'}
        rewards={{
          ...userStakingState,
          slot: slotState,
          roundLength: stakingState.roundLength,
          userDebtShares: userDebtSharesState,
          rounds: {
            next: {
              roundAllPoints: stakingState.nextRound.allPoints,
              roundPoints: nextShares,
              roundStartSlot: stakingState.nextRound.start,
              roundAmount: stakingState.nextRound.amount
            },
            current: {
              roundAllPoints: stakingState.currentRound.allPoints,
              roundPoints: currentShares,
              roundStartSlot: stakingState.currentRound.start,
              roundAmount: stakingState.currentRound.amount
            },
            finished: {
              roundAllPoints: stakingState.finishedRound.allPoints,
              roundPoints: finishedShares,
              roundStartSlot: stakingState.finishedRound.start,
              roundAmount: stakingState.finishedRound.amount
            }
          }
        }}
      />
      <WrappedActionMenu
        onMint={(amount, decimal) => () => {
          dispatch(actions.mint({ amount: amount.mul(new BN(10 ** 6)).div(new BN(10 ** decimal)) }))
        }}
        onBurn={(amount: BN, decimals: number) => () => {
          setShowWarning(true)
          setBurnAmount(printBNtoBN(amount.toString(), XUSD_DECIMALS - decimals))
        }}
        onDeposit={(amount, decimal) => () => {
          dispatch(
            actions.deposit({
              amount: amount.mul(
                new BN(10 ** ((userCollaterals[depositIndex]?.decimals ?? 9) - decimal))
              ),
              tokenAddress: userCollaterals[depositIndex]?.programId ?? DEFAULT_PUBLICKEY
            })
          )
        }}
        onWithdraw={(amount, decimal) => () => {
          dispatch(
            actions.withdraw({
              amount: amount.mul(
                new BN(10 ** ((userStaked[withdrawIndex]?.decimals ?? 6) - decimal))
              ),
              tokenAddress: userStaked[withdrawIndex]?.programId ?? DEFAULT_PUBLICKEY
            })
          )
        }}
        availableToMint={availableToMint}
        availableToDeposit={userCollaterals.length ? maxDeposit : new BN(0)}
        availableToWithdraw={availableToWithdraw}
        availableToBurn={availableToBurn}
        mintState={mintState}
        withdrawState={withdrawState}
        depositState={depositState}
        burnState={burnState}
        xUSDBalance={xUSDTokenAddress.equals(DEFAULT_PUBLICKEY) ? new BN(0) : xUSDBalance.balance}
        stakingData={{
          ...userStakingState,
          stakedUserValue: stakedUserValue,
          SNYPrice: SNYPrice,
          allDebtValue: allDebtValue,
          userMarinadeAmount: userMarinadeAmount,
          userLidoAmount: userLidoAmount,
          slot: slotState,
          roundLength: stakingState.roundLength,
          userDebtShares: userDebtSharesState,
          rounds: {
            next: {
              roundAllPoints: stakingState.nextRound.allPoints,
              roundPoints: nextShares,
              roundStartSlot: stakingState.nextRound.start,
              roundAmount: stakingState.nextRound.amount
            },
            current: {
              roundAllPoints: stakingState.currentRound.allPoints,
              roundPoints: currentShares,
              roundStartSlot: stakingState.currentRound.start,
              roundAmount: stakingState.currentRound.amount
            },
            finished: {
              roundAllPoints: stakingState.finishedRound.allPoints,
              roundPoints: finishedShares,
              roundStartSlot: stakingState.finishedRound.start,
              roundAmount: stakingState.finishedRound.amount
            }
          },
          onClaim: () => dispatch(actions.claimRewards()),
          onWithdraw: () => dispatch(actions.withdrawRewards()),
          amountPerRoundValue: stakingState.amountPerRound,
          collateralValue: collateralValue,
          mSolTvl,
          stSolTvl,
          mndePrice,
          lidoPrice
        }}
        depositTokens={walletStatus === Status.Initialized ? userCollaterals : []}
        withdrawTokens={userStaked}
        depositCurrency={
          walletStatus === Status.Initialized
            ? userCollaterals[depositIndex]?.symbol ?? 'SNY'
            : 'SNY'
        }
        withdrawCurrency={userStaked[withdrawIndex]?.symbol ?? 'SNY'}
        onSelectDepositToken={chosen => {
          setDepositIndex(chosen)
        }}
        onSelectWithdrawToken={chosen => {
          setWithdrawIndex(chosen)
        }}
        depositDecimal={depositDecimal}
        withdrawDecimal={userStaked[withdrawIndex]?.decimals ?? 6}
        walletConnected={walletStatus === Status.Initialized}
        noWalletHandler={() =>
          dispatch(
            snackbarActions.add({
              message: 'Connect your wallet first',
              variant: 'warning',
              persist: false
            })
          )
        }
        emptyDepositTokensHandler={() =>
          dispatch(
            snackbarActions.add({
              message: 'You have no tokens to deposit',
              variant: 'info',
              persist: false
            })
          )
        }
        emptyWithdrawTokensHandler={() =>
          dispatch(
            snackbarActions.add({
              message: 'You have no tokens to withdraw',
              variant: 'info',
              persist: false
            })
          )
        }
      />
    </>
  )
}

export default ActionMenuContainer
