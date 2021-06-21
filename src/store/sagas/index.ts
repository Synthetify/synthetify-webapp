import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { walletSaga } from './wallet'
import { exchangeSaga } from './exchange'

import { modalsSaga } from './modals'

export function* rootSaga(): Generator {
  yield all([connectionSaga, walletSaga, exchangeSaga, modalsSaga].map(spawn))
}
export default rootSaga
