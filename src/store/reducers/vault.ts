import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { Vault, VaultEntry } from '@synthetify/sdk/lib/exchange'

export interface VaultUpdate {
  address: PublicKey
  vault: Vault
}
export interface VaultSwap {
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

export interface IVault {
  vaults: { [key in string]: Vault }
  ownedVaults: { [key in string]: VaultEntry }
  vaultSwap: VaultSwap
}

export const defaultState: IVault = {
  vaults: {},
  ownedVaults: {},
  vaultSwap: {
    vaultEntryExist: false,
    vaultAddress: DEFAULT_PUBLICKEY,
    synthetic: DEFAULT_PUBLICKEY,
    collateral: DEFAULT_PUBLICKEY,
    collateralAmount: new BN(0),
    syntheticAmount: new BN(0),
    loading: false
  }
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
    setOwnedVaults(state, action: PayloadAction<VaultEntry>) {
      state.ownedVaults[action.payload.vault.toString()] = action.payload
    },
    setVaultSwapAdded(
      state,
      action: PayloadAction<Pick<VaultSwap, 'collateral' | 'synthetic'| 'collateralAmount'|'syntheticAmount'>>
    ) {
      state.vaultSwap.collateral = action.payload.collateral
      state.vaultSwap.synthetic = action.payload.synthetic
      state.vaultSwap.collateralAmount = action.payload.collateralAmount
      state.vaultSwap.syntheticAmount = action.payload.syntheticAmount
      state.vaultSwap.loading = true
      return state
    },
    actionDone(state, action: PayloadAction<Pick<VaultSwap, 'txid' >>) {
      state.vaultSwap.txid = action.payload.txid
      state.vaultSwap.loading = false
      state.vaultSwap.error = undefined
      return state
    },
    actionFailed(state, action: PayloadAction<Pick<VaultSwap, 'error' >>) {
      state.vaultSwap.loading = false
      state.vaultSwap.error = action.payload.error
      return state
    },
    setVaultSwapBorrowed(
      state,
      action: PayloadAction<Pick<VaultSwap, 'collateral' | 'synthetic'| 'collateralAmount'|'syntheticAmount'>>
    ) {
      state.vaultSwap.collateral = action.payload.collateral
      state.vaultSwap.synthetic = action.payload.synthetic
      state.vaultSwap.collateralAmount = action.payload.collateralAmount
      state.vaultSwap.syntheticAmount = action.payload.syntheticAmount
      state.vaultSwap.loading = true
      return state
    },
    setVaultSwapWithdraw(
      state,
      action: PayloadAction<Pick<VaultSwap, 'collateral' | 'synthetic'| 'collateralAmount'|'syntheticAmount'>>
    ) {
      state.vaultSwap.collateral = action.payload.collateral
      state.vaultSwap.synthetic = action.payload.synthetic
      state.vaultSwap.collateralAmount = action.payload.collateralAmount
      state.vaultSwap.syntheticAmount = action.payload.syntheticAmount
      state.vaultSwap.loading = true
      return state
    },
    setVaultSwapRepay(
      state,
      action: PayloadAction<Pick<VaultSwap, 'collateral' | 'synthetic'| 'collateralAmount'|'syntheticAmount'>>
    ) {
      state.vaultSwap.collateral = action.payload.collateral
      state.vaultSwap.synthetic = action.payload.synthetic
      state.vaultSwap.collateralAmount = action.payload.collateralAmount
      state.vaultSwap.syntheticAmount = action.payload.syntheticAmount
      state.vaultSwap.loading = true
      return state
    }
  }
})

export const actions = vaultSlice.actions
export const reducer = vaultSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
