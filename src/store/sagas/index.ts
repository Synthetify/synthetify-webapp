import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { walletSaga } from './wallet'
import { exchangeSaga } from './exchange'

import { stakingSaga } from './staking'

export function* rootSaga(): Generator {
  yield all([connectionSaga, walletSaga, exchangeSaga, stakingSaga].map(spawn))
}
export default rootSaga
