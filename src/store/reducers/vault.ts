import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Decimal, Vault, VaultEntry } from '@synthetify/sdk/lib/exchange'
export interface VaultUpdate {
  address: PublicKey
  vault: Vault
}
export interface VaultSwap {
  action: ActionType
  vaultEntryExist: boolean
  vaultAddress: PublicKey
  synthetic: PublicKey
  collateral: PublicKey
  collateralAmount: BN
  syntheticAmount: BN
  loading: boolean
  error?: boolean
  txid?: string
}
export type ActionType = 'add' | 'borrow' | 'withdraw' | 'repay' | 'none'
export interface IVault {
  vaults: { [key in string]: Vault }
  userVaults: { [key in string]: VaultEntry }
  vaultSwap: VaultSwap
  newVaultEntryAddress: PublicKey
  assetPrice: { [key in string]: Decimal }
}
interface ISetAssetPrice {
  address: string
  price: Decimal
}
export const defaultState: IVault = {
  vaults: {},
  userVaults: {},
  vaultSwap: {
    action: 'add',
    vaultEntryExist: false,
    vaultAddress: DEFAULT_PUBLICKEY,
    synthetic: DEFAULT_PUBLICKEY,
    collateral: DEFAULT_PUBLICKEY,
    collateralAmount: new BN(0),
    syntheticAmount: new BN(0),
    loading: false
  },
  newVaultEntryAddress: DEFAULT_PUBLICKEY,
  assetPrice: {}
}

export const vaultSliceName = 'vault'
const vaultSlice = createSlice({
  name: vaultSliceName,
  initialState: defaultState,
  reducers: {
    setVault(state, action: PayloadAction<VaultUpdate>) {
      state.vaults[action.payload.address.toString()] = action.payload.vault
      return state
    },
    initVault(state) {
      return state
    },
    setActualVaultSwap(state, action: PayloadAction<Pick<VaultSwap, 'collateral' | 'synthetic'>>) {
      state.vaultSwap.collateral = action.payload.collateral
      state.vaultSwap.synthetic = action.payload.synthetic
      return state
    },
    setVaultExist(state, action: PayloadAction<Pick<VaultSwap, 'vaultEntryExist'>>) {
      state.vaultSwap.vaultEntryExist = action.payload.vaultEntryExist
      return state
    },
    setVaultAddress(state, action: PayloadAction<Pick<VaultSwap, 'vaultAddress'>>) {
      state.vaultSwap.vaultAddress = action.payload.vaultAddress
      return state
    },
    setUserVaults(state, action: PayloadAction<VaultEntry>) {
      state.userVaults[action.payload.vault.toString()] = action.payload
    },
    updateAmountSynthetic(
      state,
      action: PayloadAction<Pick<VaultEntry, 'syntheticAmount' | 'vault'>>
    ) {
      state.userVaults[action.payload.vault.toString()].syntheticAmount =
        action.payload.syntheticAmount
    },
    actionDone(state, action: PayloadAction<Pick<VaultSwap, 'txid'>>) {
      state.vaultSwap.txid = action.payload.txid
      state.vaultSwap.loading = false
      state.vaultSwap.error = undefined
      return state
    },
    actionFailed(state, action: PayloadAction<Pick<VaultSwap, 'error'>>) {
      state.vaultSwap.loading = false
      state.vaultSwap.error = action.payload.error
      return state
    },
    /* eslint-disable @typescript-eslint/indent */
    setVaultSwap(
      state,
      action: PayloadAction<
        Pick<
          VaultSwap,
          'collateral' | 'synthetic' | 'collateralAmount' | 'syntheticAmount' | 'action'
        >
      >
    ) {
      state.vaultSwap.action = action.payload.action
      state.vaultSwap.collateral = action.payload.collateral
      state.vaultSwap.synthetic = action.payload.synthetic
      state.vaultSwap.collateralAmount = action.payload.collateralAmount
      state.vaultSwap.syntheticAmount = action.payload.syntheticAmount
      state.vaultSwap.loading = true
      return state
    },

    clearUserVault(state) {
      state.userVaults = {}
      state.vaults = {}
    },
    setNewVaultEntryAddress(state, action: PayloadAction<Pick<IVault, 'newVaultEntryAddress'>>) {
      state.newVaultEntryAddress = action.payload.newVaultEntryAddress
    },
    setAssetPrice(_state, _action: PayloadAction<ISetAssetPrice>) {},
    batchSetAssetPrice(state, action: PayloadAction<{ [x: string]: Decimal }>) {
      for (const [key, value] of Object.entries(action.payload)) {
        state.assetPrice[key] = value
      }
      return state
    }
  }
})

export const actions = vaultSlice.actions
export const reducer = vaultSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
