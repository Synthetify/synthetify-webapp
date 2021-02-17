import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export interface ICreateAccountTransaction {
  tokenAddress: string
  accountAddress: string
  sending: boolean
  error: string
  open: boolean
}

export interface ISend {
  tokenAddress: PublicKey
  recipient: PublicKey
  amount: BN
  txid?: string
  sending: boolean
  error?: string
  open: boolean
}
export interface IDeposit {
  amount: BN
  txid?: string
  sending: boolean
  error?: string
  open: boolean
}
export interface IModals {
  createAccount: ICreateAccountTransaction
  send: ISend
  deposit: IDeposit
}

export const defaultState: IModals = {
  createAccount: { open: false, sending: false, accountAddress: '', error: '', tokenAddress: '' },
  send: {
    amount: new BN(0),
    recipient: DEFAULT_PUBLICKEY,
    tokenAddress: DEFAULT_PUBLICKEY,
    sending: false,
    open: false
  },
  deposit: {
    amount: new BN(0),
    sending: false,
    open: false
  }
}
export const modalsSliceName = 'modals'
const modalsSlice = createSlice({
  name: modalsSliceName,
  initialState: defaultState,
  reducers: {
    openModal(state, action: PayloadAction<keyof IModals>) {
      state[action.payload].open = true
      return state
    },
    closeModal(state, action: PayloadAction<keyof IModals>) {
      state[action.payload].open = false
      return state
    },
    resetModal(state, action: PayloadAction<keyof IModals>) {
      switch (action.payload) {
        case 'createAccount':
          state.createAccount = defaultState[action.payload]
          break
        case 'send':
          state.send = defaultState[action.payload]
          break
        default:
          break
      }
      return state
    },
    openSend(state, action: PayloadAction<Pick<ISend, 'tokenAddress'>>) {
      state.send.open = true
      state.send.tokenAddress = action.payload.tokenAddress
      return state
    },
    send(state, action: PayloadAction<Pick<ISend, 'amount' | 'recipient'>>) {
      state.send.sending = true
      state.send.amount = action.payload.amount
      state.send.recipient = action.payload.recipient
      return state
    },
    sendDone(state, action: PayloadAction<Pick<ISend, 'txid'>>) {
      state.send.sending = false
      state.send.txid = action.payload.txid
      return state
    },
    deposit(state, action: PayloadAction<Pick<ISend, 'amount'>>) {
      state.deposit.sending = true
      state.deposit.amount = action.payload.amount
      return state
    },
    createAccount(state, action: PayloadAction<{ tokenAddress: string }>) {
      state.createAccount.sending = true
      state.createAccount.tokenAddress = action.payload.tokenAddress
      return state
    },
    accountCreated(state, action: PayloadAction<{ accountAddress: string }>) {
      state.createAccount.sending = false
      state.createAccount.accountAddress = action.payload.accountAddress
      return state
    },
    accountCreatedError(state, action: PayloadAction<{ error: string }>) {
      state.createAccount.sending = false
      state.createAccount.error = action.payload.error
      return state
    }
  }
})
export const actions = modalsSlice.actions
export const reducer = modalsSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
