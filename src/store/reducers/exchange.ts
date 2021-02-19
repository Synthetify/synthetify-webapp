import { DEFAULT_PUBLICKEY } from '@consts/static'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { PayloadType } from './types'
import * as R from 'remeda'
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
export interface Swap {
  fromToken: PublicKey
  toToken: PublicKey
  amount: BN
  loading: boolean
  txid?: string
}

export interface IExchange {
  collateralAccount: PublicKey
  collateralToken: PublicKey
  mintAuthority: PublicKey
  debt: BN
  shares: BN
  fee: number
  collateralizationLevel: number
  assets: { [key in string]: IAsset }
  userAccount: UserAccount
  swap: Swap
}

export const defaultState: IExchange = {
  assets: {},
  collateralAccount: DEFAULT_PUBLICKEY,
  collateralToken: DEFAULT_PUBLICKEY,
  mintAuthority: DEFAULT_PUBLICKEY,
  fee: 30,
  collateralizationLevel: 500,
  debt: new BN(0),
  shares: new BN(0),
  userAccount: { address: DEFAULT_PUBLICKEY.toString(), collateral: new BN(0), shares: new BN(0) },
  swap: {
    fromToken: DEFAULT_PUBLICKEY,
    toToken: DEFAULT_PUBLICKEY,
    amount: new BN(0),
    loading: false
  }
}
export const exchangeSliceName = 'exchange'
const exchangeSlice = createSlice({
  name: exchangeSliceName,
  initialState: defaultState,
  reducers: {
    resetState() {
      return defaultState
    },
    setState(state, action: PayloadAction<Omit<IExchange, 'userAccount' | 'swap'>>) {
      // to not overwrite asset prices
      const assets = R.mapValues(action.payload.assets, (value, key) => {
        if (state.assets[key]) {
          return { ...value, price: state.assets[key].price }
        } else {
          return value
        }
      })
      state = {
        ...action.payload,
        assets: assets,
        userAccount: state.userAccount,
        swap: state.swap
      }
      return state
    },
    setAssetPrice(state, action: PayloadAction<{ token: PublicKey; price: BN }>) {
      state.assets[action.payload.token.toString()].price = action.payload.price
      return state
    },
    setUserAccountAddress(state, action: PayloadAction<PublicKey>) {
      state.userAccount.address = action.payload.toString()
      return state
    },
    setUserAccountData(state, action: PayloadAction<Omit<UserAccount, 'address'>>) {
      state.userAccount.collateral = action.payload.collateral
      state.userAccount.shares = action.payload.shares
      return state
    },
    swap(state, action: PayloadAction<Omit<Swap, 'loading'>>) {
      state.swap.toToken = action.payload.toToken
      state.swap.fromToken = action.payload.fromToken
      state.swap.amount = action.payload.amount
      state.swap.loading = true
      return state
    },
    swapDone(state, action: PayloadAction<Pick<Swap, 'txid'>>) {
      state.swap.txid = action.payload.txid
      state.swap.loading = false
      return state
    }
  }
})
export const actions = exchangeSlice.actions
export const reducer = exchangeSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
