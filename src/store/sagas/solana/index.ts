import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { walletSaga } from './wallet'
import { exchangeSaga } from './exchange'

export function* solanaRootSaga(): Generator {
  yield all([connectionSaga, walletSaga, exchangeSaga].map(spawn))
}
export default solanaRootSaga
