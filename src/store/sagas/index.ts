import { all, spawn } from 'redux-saga/effects'
import solanaRootSaga from './solana'

export function* rootSaga(): Generator {
  yield all([solanaRootSaga].map(spawn))
}
export default rootSaga
