import { call, put, takeEvery, spawn, all, select } from 'typed-redux-saga'

import { actions } from '@reducers/staking'
import {
  deposit,
  mint,
  withdraw,
  burn,
  createAccount as createAccountRedux
} from '@selectors/staking'
import { actions as snackbarsActions } from '@reducers/snackbars'
import {
  depositCollateral,
  mintUsd,
  withdrawCollateral,
  burnToken,
  claimRewards,
  withdrawRewards
} from './exchange'
import { createAccount } from './wallet'

export function* handleCreateAccount(): Generator {
  const createAccountData = yield* select(createAccountRedux)

  try {
    const accountAddress = yield* call(createAccount, createAccountData.tokenAddress)
    yield* put(
      actions.createAccountDone({
        txid: accountAddress.toString()
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* handleDeposit(): Generator {
  const depositData = yield* select(deposit)
  try {
    const txid = yield* call(depositCollateral, depositData.amount, depositData.tokenAddress)
    yield* put(
      actions.depositDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Succesfully deposited collateral.',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    console.log(error)
    yield* put(actions.depositFailed({ error: error?.message ?? 'Unknown error' }))
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* handleMint(): Generator {
  const mintData = yield* select(mint)
  try {
    yield* call(mintUsd, mintData.amount)
    yield* put(actions.mintDone())

    yield put(
      snackbarsActions.add({
        message: 'Succesfully minted xUSD.',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    console.log(error)
    yield* put(actions.mintFailed({ error: error?.message ?? 'Unknown error' }))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* handleWithdraw(): Generator {
  const withdrawData = yield* select(withdraw)
  try {
    const txid = yield* call(withdrawCollateral, withdrawData.amount, withdrawData.tokenAddress)
    yield* put(actions.withdrawDone({ txid: txid }))
    yield put(
      snackbarsActions.add({
        message: 'Succesfully withdraw collateral.',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    yield* put(actions.withdrawFailed({ error: error?.message ?? 'Unknown error' }))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* handleBurn(): Generator {
  const burnData = yield* select(burn)
  try {
    const txid = yield* call(burnToken, burnData.amount, burnData.tokenAddress)
    yield* put(actions.burnDone({ txid: txid }))
    yield put(
      snackbarsActions.add({
        message: 'Succesfully burned token.',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    yield* put(actions.burnFailed({ error: error?.message ?? 'Unknown error' }))
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleClaimRewards(): Generator {
  try {
    const txid = yield* call(claimRewards)
    yield* put(actions.claimRewardsDone({ txid }))

    yield put(
      snackbarsActions.add({
        message: 'Successfully claimed rewards',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    yield* put(actions.claimRewardsFailed({ error: error?.message ?? 'Unknown error' }))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleWithdrawRewards(): Generator {
  try {
    const txid = yield* call(withdrawRewards)
    yield* put(actions.withdrawRewardsDone({ txid }))

    yield put(
      snackbarsActions.add({
        message: 'Successfully withdrawn rewards',
        variant: 'success',
        persist: false
      })
    )
  } catch (error) {
    yield* put(actions.withdrawRewardsFailed({ error: error?.message ?? 'Unknown error' }))

    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* depositHandler(): Generator {
  yield takeEvery(actions.deposit, handleDeposit)
}
export function* mintHandler(): Generator {
  yield takeEvery(actions.mint, handleMint)
}
export function* withdrawHandler(): Generator {
  yield takeEvery(actions.withdraw, handleWithdraw)
}
export function* burnHandler(): Generator {
  yield takeEvery(actions.burn, handleBurn)
}
export function* claimRewardsHandler(): Generator {
  yield takeEvery(actions.claimRewards, handleClaimRewards)
}
export function* withdrawRewardsHandler(): Generator {
  yield takeEvery(actions.withdrawRewards, handleWithdrawRewards)
}
export function* createAccountHanlder(): Generator {
  yield takeEvery(actions.createAccount, handleCreateAccount)
}

export function* stakingSaga(): Generator {
  yield all(
    [
      depositHandler,
      mintHandler,
      withdrawHandler,
      burnHandler,
      claimRewardsHandler,
      withdrawRewardsHandler,
      createAccountHanlder
    ].map(spawn)
  )
}
