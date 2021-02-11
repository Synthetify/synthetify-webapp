import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { walletSaga } from './wallet'

export function* solanaRootSaga(): Generator {
  yield all([connectionSaga, walletSaga].map(spawn))
}
export default solanaRootSaga
