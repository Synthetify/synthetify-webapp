import { all, spawn } from 'redux-saga/effects'
import solanaRootSaga from './solana'
import { modalsSaga } from './modals'

export function* rootSaga(): Generator {
  yield all([solanaRootSaga, modalsSaga].map(spawn))
}
export default rootSaga
