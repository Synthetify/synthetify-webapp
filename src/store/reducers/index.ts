import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'
import { persistReducer, createTransform } from 'redux-persist'
import { reducer as snackbarsReducer, snackbarsSliceName } from './snackbars'
import { reducer as solanaWalletReducer, solanaWalletSliceName } from './solanaWallet'
import { reducer as solanaConnectionReducer, solanaConnectionSliceName } from './solanaConnection'
import { reducer as uiReducer, uiSliceName } from './ui'
import { reducer as exhcangeReducer, exchangeSliceName } from './exchange'
import { reducer as stakingReducer, stakingSliceName } from './staking'
import { reducer as statsReducer, statsSliceName } from './stats'
import { NetworkType } from '@consts/static'
import { reducer as vaultReducer, vaultSliceName } from './vault'
import { reducer as leverageReducer, leverageSliceName } from './leverage'

const transformNetwork = createTransform(
  (inboundState: any, _key) => {
    return inboundState
  },
  (outboundState, _key) => {
    if (Object.values(NetworkType).includes(outboundState)) {
      return outboundState
    } else {
      return NetworkType.MAINNET
    }
  }
)
const connectionPersistConfig = {
  key: solanaConnectionSliceName,
  storage: storage,
  whitelist: ['network'],
  transforms: [transformNetwork]
}

const combinedReducers = combineReducers({
  [snackbarsSliceName]: snackbarsReducer,
  [uiSliceName]: uiReducer,
  [solanaConnectionSliceName]: persistReducer(connectionPersistConfig, solanaConnectionReducer),
  [exchangeSliceName]: exhcangeReducer,
  [solanaWalletSliceName]: solanaWalletReducer,
  [stakingSliceName]: stakingReducer,
  [statsSliceName]: statsReducer,
  [vaultSliceName]: vaultReducer,
  [leverageSliceName]: leverageReducer
})
export default combinedReducers
