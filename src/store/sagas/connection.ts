import { all, call, put, SagaGenerator, select, takeLeading, spawn, delay } from 'typed-redux-saga'

import { actions, Status, PayloadTypes } from '@reducers/solanaConnection'
import { actions as uiActions } from '@reducers/ui'
import { getNetworkFromType, getSolanaConnection } from '@web3/connection'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { network } from '@selectors/solanaConnection'
import { Connection } from '@solana/web3.js'
import { PayloadAction } from '@reduxjs/toolkit'
import { pullExchangeState } from './exchange'
import { initVault } from './vault'
import { initLeveragePairs } from './leverage'

export function* getConnection(): SagaGenerator<Connection> {
  const currentNetwork = yield* select(network)
  const connection = yield* call(getSolanaConnection, getNetworkFromType(currentNetwork))
  return connection
}

export function* initConnection(): Generator {
  try {
    yield* call(getConnection)
    yield* call(pullExchangeState)
    // yield* call(pullUserAccountData)
    // yield* call(init)
    yield* put(
      uiActions.setLoader({
        open: false,
        message: ''
      })
    )
    yield* put(
      snackbarsActions.add({
        message: 'Solana network connected.',
        variant: 'success',
        persist: false
      })
    )
    yield* put(actions.setStatus(Status.Initialized))
    // yield* call(depositCollateral, new BN(4 * 1e8))
    // yield* call(mintUsd, new BN(8 * 1e7))
    // yield* call(handleAirdrop)
    yield* call(initVault)
    yield* call(initLeveragePairs)
  } catch (error) {
    console.log(error)
    yield* put(
      uiActions.setLoader({
        open: false,
        message: ''
      })
    )
    yield* put(actions.setStatus(Status.Error))
    yield put(
      snackbarsActions.add({
        message: 'Failed to connect to Solana network',
        variant: 'error',
        persist: false
      })
    )
  }
}

export function* handleNetworkChange(action: PayloadAction<PayloadTypes['setNetwork']>): Generator {
  yield* put(
    uiActions.setLoader({
      open: true,
      message: `Loading ${action.payload} wallet.`
    })
  )
  yield* delay(1000)
  window.location.reload()
  yield* put(
    snackbarsActions.add({
      message: `You are on ${action.payload} network.`,
      variant: 'info',
      persist: false
    })
  )
}

export function* updateSlot(): Generator {
  const connection = yield* call(getConnection)
  const slot = yield* call([connection, connection.getSlot])
  yield* put(actions.setSlot(slot))
}

export function* updateSlotSaga(): Generator {
  yield takeLeading(actions.updateSlot, updateSlot)
}

export function* networkChangeSaga(): Generator {
  yield takeLeading(actions.setNetwork, handleNetworkChange)
}
export function* initConnectionSaga(): Generator {
  yield takeLeading(actions.initSolanaConnection, initConnection)
}
export function* connectionSaga(): Generator {
  yield* all([networkChangeSaga, initConnectionSaga, updateSlotSaga].map(spawn))
}
