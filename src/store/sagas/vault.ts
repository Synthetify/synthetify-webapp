import { call, put, takeEvery, spawn, all, select } from 'typed-redux-saga'
import { getWallet } from './wallet'
import { getExchangeProgram } from '@web3/programs/exchange'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { actions } from '@reducers/vault'
import { handleAddCollateralVault, handleBorrowedVault, handleRepaySyntheticVault, handleWithdrawCollateralVault } from './exchange'
import { vaultSwap } from '@selectors/vault'
import { actions as snackbarsActions } from '@reducers/snackbars'
function* checkVaultEntry(): Generator {
  const wallet = yield* call(getWallet)
  const exchangeProgram = yield* call(getExchangeProgram)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    yield* call(
      [exchangeProgram, exchangeProgram.getVaultEntryForOwner],
      vaultSwapData.synthetic,
      vaultSwapData.collateral,
      wallet.publicKey
    )
    yield* put(actions.setVaultExist({ vaultEntryExist: true }))
  } catch (error) {
    yield* put(actions.setVaultExist({ vaultEntryExist: false }))
  }
}
function* setVaultAddress(): Generator {
  try {
    const exchangeProgram = yield* call(getExchangeProgram)
    const vaultSwapData = yield* select(vaultSwap)
    const address = yield* call(
      [exchangeProgram, exchangeProgram.getVaultAddress],
      vaultSwapData.synthetic,
      vaultSwapData.collateral
    )
    yield* put(actions.setVaultAddress({ vaultAddress: address.vaultAddress }))
  } catch (error) {
    yield* put(actions.setVaultAddress({ vaultAddress: DEFAULT_PUBLICKEY }))
  }
}
export function* handleAddCollateral(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleAddCollateralVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Collateral deposited successfully.',
        variant: 'success',
        txid: txid,
        persist: false
      })
    )
  } catch (error) {
    yield* put(
      actions.actionFailed({
        error: true
      })
    )
    yield put(
      snackbarsActions.add({
        message: error instanceof Error && error.message === 'failed to send transaction: Transaction simulation failed: Insufficient funds for fee' ? 'Insufficient funds for fee' : 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleBorrow(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleBorrowedVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Synthetic borrowed successfully.',
        variant: 'success',
        txid: txid,
        persist: false
      })
    )
  } catch (error) {
    yield* put(
      actions.actionFailed({
        error: true
      })
    )
    yield put(
      snackbarsActions.add({
        message: error instanceof Error && error.message === 'failed to send transaction: Transaction simulation failed: Insufficient funds for fee' ? 'Insufficient funds for fee' : 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleWithdraw(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleWithdrawCollateralVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Collateral withdrawn successfully.',
        variant: 'success',
        txid: txid,
        persist: false
      })
    )
  } catch (error) {
    yield* put(
      actions.actionFailed({
        error: true
      })
    )
    yield put(
      snackbarsActions.add({
        message: error instanceof Error && error.message === 'failed to send transaction: Transaction simulation failed: Insufficient funds for fee' ? 'Insufficient funds for fee' : 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleRepay(): Generator {
  yield* call(checkVaultEntry)
  yield* call(setVaultAddress)
  const vaultSwapData = yield* select(vaultSwap)
  try {
    const txid = yield* call(handleRepaySyntheticVault, vaultSwapData)
    yield* put(
      actions.actionDone({
        txid: txid
      })
    )
    yield put(
      snackbarsActions.add({
        message: 'Synthetic repay successfully.',
        variant: 'success',
        txid: txid,
        persist: false
      })
    )
  } catch (error) {
    yield* put(
      actions.actionFailed({
        error: true
      })
    )
    yield put(
      snackbarsActions.add({
        message: error instanceof Error && error.message === 'failed to send transaction: Transaction simulation failed: Insufficient funds for fee' ? 'Insufficient funds for fee' : 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
  }
}
export function* vaultCalculateAvailable(): Generator {
  yield* takeEvery(actions.setActualVaultSwap, setVaultAddress)
}

export function* vaultAddHandler(): Generator {
  yield* takeEvery(actions.setVaultSwapAdded, handleAddCollateral)
}

export function* vaultBorrowHandler(): Generator {
  yield* takeEvery(actions.setVaultSwapBorrowed, handleBorrow)
}
export function* vaultWithrawHandler(): Generator {
  yield* takeEvery(actions.setVaultSwapWithdraw, handleWithdraw)
}
export function* vaultRepayHandler(): Generator {
  yield* takeEvery(actions.setVaultSwapRepay, handleRepay)
}

export function* vaultSaga(): Generator {
  yield all([vaultAddHandler, vaultBorrowHandler, vaultWithrawHandler, vaultRepayHandler].map(spawn))
}
