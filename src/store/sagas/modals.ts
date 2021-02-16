import { call, put, takeEvery, spawn, all, select } from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/modals'
import { send } from '@selectors/modals'
import walletSelectors from '@selectors/solanaWallet'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { getConnection } from './solana/connection'
import { getWallet, sendSol, sendToken } from './solana/wallet'
import { tokenBalance } from '@selectors/solanaWallet'
import { BN } from '@project-serum/anchor'
import { Transaction, SystemProgram } from '@solana/web3.js'

// export function* handleCreateAccount(
//   action: PayloadAction<PayloadTypes['createAccount']>
// ): Generator {
//   try {
//     const accountAddress = yield* call(createAccount, action.payload.tokenAddress)
//     yield* put(
//       actions.accountCreated({
//         accountAddress: accountAddress
//       })
//     )
//   } catch (error) {
//     yield put(
//       snackbarsActions.add({
//         message: 'Failed to send. Please try again.',
//         variant: 'error',
//         persist: false
//       })
//     )
//     yield put(
//       actions.accountCreatedError({
//         error: error
//       })
//     )
//   }
// }
export function* handleSendToken(): Generator {
  const connection = yield* call(getConnection)
  const sendData = yield* select(send)
  console.log(sendData)
  try {
    if (sendData.tokenAddress.equals(DEFAULT_PUBLICKEY)) {
      const blockHash = yield* call([connection, connection.getRecentBlockhash])
      const myBalance = yield* select(tokenBalance(sendData.tokenAddress))
      const transferFee = new BN(blockHash.feeCalculator.lamportsPerSignature)
      let amountToSend: BN
      if (sendData.amount.add(transferFee).gt(myBalance.balance)) {
        amountToSend = myBalance.balance.sub(transferFee)
      } else {
        amountToSend = sendData.amount
      }
      const txid = yield* call(sendSol, amountToSend, sendData.recipient)
      yield* put(
        actions.sendDone({
          txid: txid
        })
      )
    } else {
      const tokenAccount = yield* select(walletSelectors.tokenAccount(sendData.tokenAddress))
      const txid = yield* call(
        sendToken,
        tokenAccount.address,
        sendData.recipient,
        sendData.amount,
        sendData.tokenAddress
      )
      yield* put(
        actions.sendDone({
          txid: txid
        })
      )
    }
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.accountCreatedError({
        error: error
      })
    )
  }
}

export function* sendTokenHandler(): Generator {
  yield takeEvery(actions.send, handleSendToken)
}

export function* modalsSaga(): Generator {
  yield all([sendTokenHandler].map(spawn))
}
