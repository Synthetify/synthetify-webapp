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
  collateralPrice: Decimal
  syntheticPrice: Decimal
  vaultAddress: PublicKey
}
export interface ILeverageSelected {
  action: string
  vaultEntryExist: boolean
  vaultAddress: PublicKey
  synthetic: PublicKey
  collateral: PublicKey
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
    synthetic: new PublicKey(0),
    collateral: new PublicKey(0),
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
      action: PayloadAction<Pick<ILeverageSelected, 'collateral' | 'synthetic' | 'vaultType'>>
    ) {
      state.currentlySelected.collateral = action.payload.collateral
      state.currentlySelected.synthetic = action.payload.synthetic
      state.currentlySelected.vaultType = action.payload.vaultType
      return state
    }
  }
})

export const actions = leverageSlice.actions
export const reducer = leverageSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
