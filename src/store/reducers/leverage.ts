import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { PublicKey } from '@solana/web3.js'
import { Decimal, Vault } from '@synthetify/sdk/lib/exchange'
import BN from 'bn.js'

export interface ILeveragePair extends Vault {
  collateralSymbol: string
  syntheticSymbol: string
  collateralBalance: Decimal
  syntheticBalance: Decimal
  vaultAddress: PublicKey
}
export interface ILeverageSelected {
  action: string
  vaultEntryExist: boolean
  vaultAddress: PublicKey
  vaultSynthetic: PublicKey
  vaultCollateral: PublicKey
  actualCollateral: PublicKey
  loading: boolean
  error?: boolean
  txid?: string
  vaultType: number
  leverage: number
  amountToken: BN
}

export interface ILeverage {
  short: { [key in string]: ILeveragePair }
  long: { [key in string]: ILeveragePair }
  currentlySelected: ILeverageSelected
}
export const defaultState: ILeverage = {
  short: {},
  long: {},
  currentlySelected: {
    action: 'open',
    vaultEntryExist: false,
    vaultAddress: new PublicKey(0),
    vaultSynthetic: new PublicKey(0),
    vaultCollateral: new PublicKey(0),
    actualCollateral: new PublicKey(0),
    loading: false,
    vaultType: 0,
    leverage: 1,
    amountToken: new BN(0)
  }
}

export const leverageSliceName = 'leverage'
const leverageSlice = createSlice({
  name: leverageSliceName,
  initialState: defaultState,
  reducers: {
    setShortPair(state, action: PayloadAction<ILeveragePair>) {
      state.short[action.payload.vaultAddress.toString()] = action.payload
    },
    setLongPair(state, action: PayloadAction<ILeveragePair>) {
      state.long[action.payload.vaultAddress.toString()] = action.payload
    },
    setCurrentPair(
      state,
      action: PayloadAction<
        Pick<ILeverageSelected, 'vaultCollateral' | 'vaultSynthetic' | 'vaultType'>
      >
    ) {
      state.currentlySelected.vaultCollateral = action.payload.vaultCollateral
      state.currentlySelected.vaultSynthetic = action.payload.vaultSynthetic
      state.currentlySelected.vaultType = action.payload.vaultType
      return state
    },
    setOpenLeverage(
      state,
      action: PayloadAction<
        Pick<
          ILeverageSelected,
          | 'vaultCollateral'
          | 'vaultSynthetic'
          | 'actualCollateral'
          | 'amountToken'
          | 'action'
          | 'vaultType'
          | 'leverage'
        >
      >
    ) {
      state.currentlySelected.loading = true
      state.currentlySelected.action = action.payload.action
      state.currentlySelected.vaultCollateral = action.payload.vaultCollateral
      state.currentlySelected.actualCollateral = action.payload.actualCollateral
      state.currentlySelected.vaultSynthetic = action.payload.vaultSynthetic
      state.currentlySelected.amountToken = action.payload.amountToken
      state.currentlySelected.leverage = action.payload.leverage
      state.currentlySelected.vaultType = action.payload.vaultType
      return state
    },
    setVaultExist(state, action: PayloadAction<Pick<ILeverageSelected, 'vaultEntryExist'>>) {
      state.currentlySelected.vaultEntryExist = action.payload.vaultEntryExist
      return state
    },
    setVaultAddress(state, action: PayloadAction<Pick<ILeverageSelected, 'vaultAddress'>>) {
      state.currentlySelected.vaultAddress = action.payload.vaultAddress
      return state
    },
    actionDone(state, action: PayloadAction<Pick<ILeverageSelected, 'txid'>>) {
      state.currentlySelected.txid = action.payload.txid
      state.currentlySelected.loading = false
      state.currentlySelected.error = undefined
      return state
    },
    actionFailed(state, action: PayloadAction<Pick<ILeverageSelected, 'error'>>) {
      state.currentlySelected.loading = false
      state.currentlySelected.error = action.payload.error
      return state
    }
  }
})

export const actions = leverageSlice.actions
export const reducer = leverageSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
