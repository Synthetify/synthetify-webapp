import { all, call, put, SagaGenerator, select, takeLeading, spawn } from 'typed-redux-saga'

import { actions, Status, PayloadTypes } from '@reducers/solanaConnection'
import { actions as solanaWalletActions } from '@reducers/solanaWallet'
import { actions as uiActions } from '@reducers/ui'
import { getSolanaConnection, networkToName } from '@web3/connection'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { network } from '@selectors/solanaConnection'
import { Connection } from '@solana/web3.js'
import { PayloadAction } from '@reduxjs/toolkit'
import { init, handleAirdrop } from './wallet'
import { depositCollateral, pullExchangeState, mintUsd, pullUserAccountData } from './exchange'
import BN from 'bn.js'

export function* getConnection(): SagaGenerator<Connection> {
  const currentNetwork = yield* select(network)
  const connection = yield* call(getSolanaConnection, currentNetwork)
  return connection
}

export function* initConnection(): Generator {
  try {
    yield* call(getConnection)

    yield* call(pullExchangeState)
    yield* call(pullUserAccountData)
    yield* call(init)
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
    yield* put(actions.setStatus(Status.Initalized))
    // yield* call(depositCollateral, new BN(4 * 1e8))
    // yield* call(mintUsd, new BN(8 * 1e7))
    yield* call(handleAirdrop)
  } catch (error) {
    console.log(error)
    yield put(actions.setStatus(Status.Error))
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
      message: `Loading ${networkToName(action.payload)} wallet.`
    })
  )
  yield* put(solanaWalletActions.resetState())
  yield* call(init)
  yield* put(
    uiActions.setLoader({
      open: false,
      message: ''
    })
  )
  yield* put(
    snackbarsActions.add({
      message: `You are on ${networkToName(action.payload)} network.`,
      variant: 'info',
      persist: false
    })
  )
}

export function* networkChangeSaga(): Generator {
  yield takeLeading(actions.setNetwork, handleNetworkChange)
}
export function* initConnectionSaga(): Generator {
  yield takeLeading(actions.initSolanaConnection, initConnection)
}
export function* connectionSaga(): Generator {
  yield* all([networkChangeSaga, initConnectionSaga].map(spawn))
}
