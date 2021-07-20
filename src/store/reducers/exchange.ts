import { DEFAULT_PUBLICKEY, DEFAULT_STAKING_DATA } from '@consts/static'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { PayloadType } from './types'
import { ExchangeState, Asset, CollateralEntry, Synthetic, Collateral } from '@synthetify/sdk/lib/exchange'
import * as R from 'remeda'
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
export interface UserStaking {
  amountToClaim: BN
  finishedRoundPoints: BN
  currentRoundPoints: BN
  nextRoundPoints: BN
  lastUpdate: BN
}
export interface ExchangeAccount {
  address: PublicKey
  collaterals: CollateralEntry[]
  debtShares: BN
  userStaking: UserStaking
}
export interface IExchange {
  state: ExchangeState
  collateralAccount: PublicKey
  collateralToken: PublicKey
  mintAuthority: PublicKey
  debt: BN
  shares: BN
  fee: number
  collateralizationLevel: number
  assets: IAsset[]
  synthetics: { [key in string]: Synthetic }
  collaterals: { [key in string]: Collateral }
  userAccount: UserAccount
  exchangeAccount: ExchangeAccount
  swap: Swap
}
export type IAsset = Asset & { symbol: string }

export const defaultState: IExchange = {
  state: {
    admin: DEFAULT_PUBLICKEY,
    assetsList: DEFAULT_PUBLICKEY,
    debtShares: new BN(0),
    fee: 30,
    maxDelay: 10,
    nonce: 255,
    halted: false,
    liquidationBuffer: 0,
    healthFactor: 0,
    liquidationRate: 0,
    penaltyToExchange: 0,
    penaltyToLiquidator: 0,
    accountVersion: 1,
    staking: {
      amountPerRound: new BN(0),
      currentRound: { allPoints: new BN(0), amount: new BN(0), start: new BN(0) },
      finishedRound: { allPoints: new BN(0), amount: new BN(0), start: new BN(0) },
      nextRound: { allPoints: new BN(0), amount: new BN(0), start: new BN(0) },
      fundAccount: DEFAULT_PUBLICKEY,
      roundLength: 0
    }
  },
  assets: [],
  synthetics: {},
  collaterals: {},
  collateralAccount: DEFAULT_PUBLICKEY,
  collateralToken: DEFAULT_PUBLICKEY,
  mintAuthority: DEFAULT_PUBLICKEY,
  fee: 30,
  collateralizationLevel: 500,
  debt: new BN(0),
  shares: new BN(0),
  userAccount: { address: DEFAULT_PUBLICKEY.toString(), collateral: new BN(0), shares: new BN(0) },
  exchangeAccount: {
    address: DEFAULT_PUBLICKEY,
    collaterals: [],
    debtShares: new BN(0),
    userStaking: DEFAULT_STAKING_DATA
  },
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
    setState(state, action: PayloadAction<ExchangeState>) {
      state.state = action.payload
      return state
    },
    setAssets(state, action: PayloadAction<IAsset[]>) {
      state.assets = action.payload
      return state
    },
    setSynthetics(state, action: PayloadAction<{ [key in string]: Synthetic }>) {
      state.synthetics = action.payload
      return state
    },
    setCollaterals(state, action: PayloadAction<{ [key in string]: Collateral }>) {
      state.collaterals = action.payload
      return state
    },
    mergeAssets(state, action: PayloadAction<Asset[]>) {
      action.payload.forEach((asset, index) => {
        state.assets[index] = R.merge(
          state.assets[index],
          asset
        )
      })
      return state
    },
    mergeSynthetics(state, action: PayloadAction<Synthetic[]>) {
      for (const asset of action.payload) {
        state.synthetics[asset.assetAddress.toString()] = R.merge(
          state.synthetics[asset.assetAddress.toString()],
          asset
        )
      }
      return state
    },
    mergeCollaterals(state, action: PayloadAction<Collateral[]>) {
      for (const asset of action.payload) {
        state.collaterals[asset.collateralAddress.toString()] = R.merge(
          state.collaterals[asset.collateralAddress.toString()],
          asset
        )
      }
      return state
    },
    setAssetPrice(_state, _action: PayloadAction<{ tokenIndex: number; price: BN }>) {},
    batchSetAssetPrice(state, action: PayloadAction<{ [x: string]: BN }>) {
      for (const [key, value] of Object.entries(action.payload)) {
        state.assets[+key].price = value
      }
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
    setExchangeAccount(state, action: PayloadAction<ExchangeAccount>) {
      state.exchangeAccount.collaterals = action.payload.collaterals
      state.exchangeAccount.debtShares = action.payload.debtShares
      state.exchangeAccount.address = action.payload.address
      state.exchangeAccount.userStaking = action.payload.userStaking
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
