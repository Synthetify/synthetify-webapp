import { DEFAULT_PUBLICKEY, DEFAULT_STAKING_DATA } from '@consts/static'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import BN from 'bn.js'
import { PayloadType } from './types'
import { ExchangeState, Asset, CollateralEntry, Synthetic, Collateral, Decimal } from '@synthetify/sdk/lib/exchange'
import * as R from 'remeda'

export interface Swap {
  fromToken: PublicKey
  toToken: PublicKey
  amount: BN
  loading: boolean
  txid?: string
}
export interface UserStaking {
  amountToClaim: Decimal
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
  mintAuthority: PublicKey
  assets: Asset[]
  synthetics: { [key in string]: ISynthetic }
  collaterals: { [key in string]: ICollateral }
  exchangeAccount: ExchangeAccount
  swap: Swap
}
export type IAsset = Asset & { symbol: string }
export type ISynthetic = Synthetic & { symbol: string }
export type ICollateral = Collateral & { symbol: string }

export const defaultState: IExchange = {
  state: {
    admin: DEFAULT_PUBLICKEY,
    assetsList: DEFAULT_PUBLICKEY,
    debtShares: new BN(0),
    fee: {
      val: new BN(30),
      scale: 6
    },
    maxDelay: 10,
    nonce: 255,
    halted: false,
    liquidationBuffer: 0,
    healthFactor: {
      val: new BN(0),
      scale: 6
    },
    liquidationRate: {
      val: new BN(0),
      scale: 6
    },
    penaltyToExchange: {
      val: new BN(0),
      scale: 6
    },
    penaltyToLiquidator: {
      val: new BN(0),
      scale: 6
    },
    swapTaxRatio: {
      val: new BN(0),
      scale: 6
    },
    swapTaxReserve: {
      val: new BN(0),
      scale: 6
    },
    debtInterestRate: {
      val: new BN(0),
      scale: 6
    },
    accumulatedDebtInterest: {
      val: new BN(0),
      scale: 6
    },
    lastDebtAdjustment: new BN(0),
    staking: {
      amountPerRound: {
        val: new BN(0),
        scale: 6
      },
      currentRound: {
        allPoints: new BN(0),
        amount: {
          val: new BN(0),
          scale: 6
        },
        start: new BN(0)
      },
      finishedRound: {
        allPoints: new BN(0),
        amount: {
          val: new BN(0),
          scale: 6
        },
        start: new BN(0)
      },
      nextRound: {
        allPoints: new BN(0),
        amount: {
          val: new BN(0),
          scale: 6
        },
        start: new BN(0)
      },
      fundAccount: DEFAULT_PUBLICKEY,
      roundLength: 0
    }
  },
  assets: [],
  synthetics: {},
  collaterals: {},
  mintAuthority: DEFAULT_PUBLICKEY,
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
    setAssets(state, action: PayloadAction<Asset[]>) {
      state.assets = action.payload
      return state
    },
    setSynthetics(state, action: PayloadAction<{ [key in string]: ISynthetic }>) {
      state.synthetics = action.payload
      return state
    },
    setCollaterals(state, action: PayloadAction<{ [key in string]: ICollateral }>) {
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
