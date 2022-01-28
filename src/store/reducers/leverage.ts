import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { PublicKey } from '@solana/web3.js'
import { Decimal, Vault } from '@synthetify/sdk/lib/exchange'

export interface ILeveragePair extends Vault {
  collateralSymbol: string
  syntheticSymbol: string
  collateralBalance: Decimal
  syntheticBalance: Decimal
  vaultAddress: PublicKey
}
export interface ILeverage {
  short: { [key in string]: ILeveragePair }
  long: { [key in string]: ILeveragePair }
}
export const defaultState: ILeverage = {
  short: {},
  long: {}
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
    }
  }
})

export const actions = leverageSlice.actions
export const reducer = leverageSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
