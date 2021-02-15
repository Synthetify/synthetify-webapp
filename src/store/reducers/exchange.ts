import { DEFAULT_PUBLICKEY } from '@consts/static'
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
export interface UserAccount {
  address: string // local storage does not handle PublicKeys
  collateral: BN
  shares: BN
}

export interface IExchange {
  collateralAccount: PublicKey
  collateralToken: PublicKey
  debt: BN
  shares: BN
  fee: number
  collateralizationLevel: number
  assets: { [key in string]: IAsset }
  userAccount: UserAccount
}

export const defaultState: IExchange = {
  assets: {},
  collateralAccount: new PublicKey(0),
  collateralToken: new PublicKey(0),
  fee: 30,
  collateralizationLevel: 500,
  debt: new BN(0),
  shares: new BN(0),
  userAccount: { address: DEFAULT_PUBLICKEY.toString(), collateral: new BN(0), shares: new BN(0) }
}
export const exchangeSliceName = 'exchange'
const exchangeSlice = createSlice({
  name: exchangeSliceName,
  initialState: defaultState,
  reducers: {
    resetState() {
      return defaultState
    },
    setState(state, action: PayloadAction<Omit<IExchange, 'userAccount'>>) {
      state = { ...action.payload, userAccount: state.userAccount }
      return state
    },
    setAssetPrice(state, action: PayloadAction<{ token: PublicKey; price: BN }>) {
      state.assets[action.payload.token.toString()].price = action.payload.price
      return state
    },
    setUserAccountAddress(state, action: PayloadAction<PublicKey>) {
      state.userAccount.address = action.payload.toString()
      return state
    }
  }
})
export const actions = exchangeSlice.actions
export const reducer = exchangeSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
