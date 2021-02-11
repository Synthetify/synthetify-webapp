import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { reducer as uiReducer, uiSliceName } from './ui'

const authPersistConfig = {
  key: solanaWalletSliceName,
  storage: storage,
  whitelist: ['address', 'governedTokens']
}

const combinedReducers = combineReducers({
  [snackbarsSliceName]: snackbarsReducer,
  [uiSliceName]: uiReducer,
  [solanaConnectionSliceName]: solanaConnectionReducer,
  [solanaWalletSliceName]: persistReducer(authPersistConfig, solanaWalletReducer)
})
export default combinedReducers
