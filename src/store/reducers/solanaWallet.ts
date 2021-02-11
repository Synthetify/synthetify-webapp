import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
export enum Status {
  Uninitialized = 'uninitialized',
  Init = 'init',
  Error = 'error',
  Initalized = 'initalized'
}
export interface ITokenAccount {
  programId: string
  balance: number
  address: string
  decimals: number
}
export interface ITokenData {
  programId: string
  mintAuthority: string | null
  freezeAuthority: string | null
  supply: number
  decimals: number
}
export interface ITransaction {
  recipient: string
  amount: number
  txid: string
  sending: boolean
  token?: string
  error?: string
}
export interface ISolanaWallet {
  status: Status
  address: string
  balance: number
  transactions: { [key in string]: ITransaction }
  accounts: { [key in string]: ITokenAccount[] }
}

export const defaultState: ISolanaWallet = {
  status: Status.Uninitialized,
  address: '',
  balance: 0,
  transactions: {},
  accounts: {}
}
export const solanaWalletSliceName = 'solanaWallet'
const solanaWalletSlice = createSlice({
  name: solanaWalletSliceName,
  initialState: defaultState,
  reducers: {
    resetState() {
      return defaultState
    },
    initWallet(state) {
      return state
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
      return state
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload
      return state
    },
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
      return state
    },
    addTransaction(state, action: PayloadAction<IaddTransaction>) {
      state.transactions[action.payload.id] = {
        recipient: action.payload.recipient,
        amount: action.payload.amount,
        txid: '',
        sending: true,
        token: action.payload.token
      }
      return state
    },
    setTransactionTxid(state, action: PayloadAction<{ txid: string, id: string }>) {
      state.transactions[action.payload.id].txid = action.payload.txid
      state.transactions[action.payload.id].sending = false
      return state
    },
    setTransactionError(state, action: PayloadAction<{ error: string, id: string }>) {
      state.transactions[action.payload.id].error = action.payload.error
      state.transactions[action.payload.id].sending = false
      return state
    },
    addTokenAccount(state, action: PayloadAction<ITokenAccount>) {
      if (!state.accounts[action.payload.programId]) {
        state.accounts[action.payload.programId] = []
      }
      state.accounts[action.payload.programId].push(action.payload)
      return state
    },
    setTokenBalance(state, action: PayloadAction<IsetTokenBalance>) {
      const index = state.accounts[action.payload.programId].findIndex(
        account => account.address === action.payload.address
      )
      state.accounts[action.payload.programId][index].balance = action.payload.balance
      return state
    },
    // Triggers rescan for tokens that we control
    rescanTokens() {},
    airdrop() {}
  }
})
interface IsetTokenBalance {
  address: string
  programId: string
  balance: number
}
interface IaddTransaction {
  recipient: string
  amount: number
  id: string
  token?: string
  accountAddress?: string
}
export const actions = solanaWalletSlice.actions
export const reducer = solanaWalletSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
