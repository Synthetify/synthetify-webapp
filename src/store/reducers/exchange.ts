import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { PayloadType } from './types'

export interface IAsset {
  address: PublicKey
  feedAddress: PublicKey
  price: BN
  supply: BN
  decimals: number
  ticker: string
}

export interface IExchange {
  collateralAccount: PublicKey
  collateralToken: PublicKey
  debt: BN
  shares: BN
  fee: number
  collateralizationLevel: number
  assets: IAsset[]
}

export const defaultState: IExchange = {
  assets: [],
  collateralAccount: new PublicKey(0),
  collateralToken: new PublicKey(0),
  fee: 30,
  collateralizationLevel: 500,
  debt: new BN(0),
  shares: new BN(0)
}
export const exchangeSliceName = 'exchange'
const exchangeSlice = createSlice({
  name: exchangeSliceName,
  initialState: defaultState,
  reducers: {
    resetState() {
      return defaultState
    },
    setState(state, action: PayloadAction<IExchange>) {
      state = action.payload
      return state
    }
  }
})
export const actions = exchangeSlice.actions
export const reducer = exchangeSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
