import { all, spawn } from 'redux-saga/effects'
import { connectionSaga } from './connection'
import { walletSaga } from './wallet'
import { exchangeSaga } from './exchange'

import { stakingSaga } from './staking'
import { statsSaga } from './stats'
export function* rootSaga(): Generator {
  yield all([connectionSaga, walletSaga, exchangeSaga, stakingSaga, statsSaga].map(spawn))
}
export default rootSaga
