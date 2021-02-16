import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createTransform } from 'redux-persist'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { reducer as uiReducer, uiSliceName } from './ui'
import { reducer as exhcangeReducer, exchangeSliceName } from './exchange'
import { reducer as modalsReducer, modalsSliceName } from './modals'
import { BN } from '@project-serum/anchor'
// const authPersistConfig = {
//   key: solanaWalletSliceName,
//   storage: storage,
//   whitelist: ['address', 'governedTokens']
// }
const transformExchange = createTransform(
  (inboundState: any, key) => {
    return {
      address: inboundState.address,
      collateral: inboundState.collateral.toString(),
      shares: inboundState.shares.toString()
    }
  },
  (outboundState, key) => {
    return {
      address: outboundState.address,
      collateral: new BN(outboundState.collateral),
      shares: new BN(outboundState.shares)
    }
  },
  { whitelist: ['userAccount'] }
)
const exchangePersistConfig = {
  key: exchangeSliceName,
  storage: storage,
  transforms: [transformExchange],
  whitelist: ['userAccount']
}

const combinedReducers = combineReducers({
  [snackbarsSliceName]: snackbarsReducer,
  [uiSliceName]: uiReducer,
  [solanaConnectionSliceName]: solanaConnectionReducer,
  [exchangeSliceName]: persistReducer(exchangePersistConfig, exhcangeReducer),
  [solanaWalletSliceName]: solanaWalletReducer,
  [modalsSliceName]: modalsReducer
})
export default combinedReducers
