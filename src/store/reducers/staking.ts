import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PayloadType } from './types'
import { PublicKey } from '@solana/web3.js'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'

export interface ICreateAccount {
  tokenAddress: PublicKey
  sending: boolean
  error?: string
  txid?: string
}

export interface ISend {
  tokenAddress: PublicKey
  recipient: PublicKey
  amount: BN
  txid?: string
  sending: boolean
  error?: string
}
export interface IDeposit {
  amount: BN
  txid?: string
  sending: boolean
  error?: string
  tokenAddress: PublicKey
}
export interface IMint {
  amount: BN
  txid?: string
  sending: boolean
  error?: string
}
export interface IWithdraw {
  amount: BN
  txid?: string
  sending: boolean
  error?: string
  tokenAddress: PublicKey
}
export interface IBurn {
  amount: BN
  tokenAddress: PublicKey
  txid?: string
  sending: boolean
  error?: string
}
export interface IClaimRewards {
  txid?: string
  sending: boolean
  error?: string
}
export interface IWithdrawRewards {
  txid?: string
  sending: boolean
  error?: string
}
export interface IStaking {
  createAccount: ICreateAccount
  send: ISend
  deposit: IDeposit
  mint: IMint
  withdraw: IWithdraw
  burn: IBurn
  claimRewards: IClaimRewards
  withdrawRewards: IWithdrawRewards
}

export const defaultState: IStaking = {
  createAccount: {
    sending: false,
    error: '',
    tokenAddress: DEFAULT_PUBLICKEY
  },
  send: {
    amount: new BN(0),
    recipient: DEFAULT_PUBLICKEY,
    tokenAddress: DEFAULT_PUBLICKEY,
    sending: false
  },
  deposit: {
    amount: new BN(0),
    tokenAddress: DEFAULT_PUBLICKEY,
    sending: false
  },
  mint: {
    amount: new BN(0),
    sending: false
  },
  withdraw: {
    amount: new BN(0),
    tokenAddress: DEFAULT_PUBLICKEY,
    sending: false
  },
  burn: {
    amount: new BN(0),
    tokenAddress: DEFAULT_PUBLICKEY,
    sending: false
  },
  claimRewards: {
    sending: false
  },
  withdrawRewards: {
    sending: false
  }
}
export const stakingSliceName = 'staking'
const stakingSlice = createSlice({
  name: stakingSliceName,
  initialState: defaultState,
  reducers: {
    resetStakingAction(state, action: PayloadAction<keyof IStaking>) {
      switch (action.payload) {
        case 'createAccount':
          state.createAccount = defaultState[action.payload]
          break
        case 'send':
          state.send = defaultState[action.payload]
          break
        case 'mint':
          state.mint = defaultState[action.payload]
          break
        case 'deposit':
          state.deposit = defaultState[action.payload]
          break
        case 'withdraw':
          state.withdraw = defaultState[action.payload]
          break
        case 'burn':
          state.burn = defaultState[action.payload]
          break
        case 'claimRewards':
          state.claimRewards = defaultState[action.payload]
          break
        default:
          break
      }
      return state
    },
    burn(state, action: PayloadAction<Pick<IBurn, 'amount' | 'tokenAddress'>>) {
      state.burn.sending = true
      state.burn.amount = action.payload.amount
      state.burn.tokenAddress = action.payload.tokenAddress
      return state
    },
    burnDone(state, action: PayloadAction<Pick<IBurn, 'txid'>>) {
      state.burn.sending = false
      state.burn.txid = action.payload.txid
      state.burn.error = undefined
      return state
    },
    burnFailed(state, action: PayloadAction<Pick<IBurn, 'error'>>) {
      state.burn.sending = false
      state.burn.error = action.payload.error
      return state
    },
    openSend(state, action: PayloadAction<Pick<ISend, 'tokenAddress'>>) {
      state.send.tokenAddress = action.payload.tokenAddress
      return state
    },
    send(state, action: PayloadAction<Pick<ISend, 'amount' | 'recipient'>>) {
      state.send.sending = true
      state.send.amount = action.payload.amount
      state.send.recipient = action.payload.recipient
      return state
    },
    sendDone(state, action: PayloadAction<{ txid?: string }>) {
      state.send.sending = false
      state.send.txid = action.payload.txid
      return state
    },
    deposit(state, action: PayloadAction<Pick<IDeposit, 'amount' | 'tokenAddress'>>) {
      state.deposit.sending = true
      state.deposit.amount = action.payload.amount
      state.deposit.tokenAddress = action.payload.tokenAddress
      return state
    },
    depositDone(state, action: PayloadAction<Pick<IDeposit, 'txid'>>) {
      state.deposit.sending = false
      state.deposit.txid = action.payload.txid
      state.deposit.error = undefined
      return state
    },
    depositFailed(state, action: PayloadAction<Pick<IDeposit, 'error'>>) {
      state.deposit.sending = false
      state.deposit.error = action.payload.error
      return state
    },
    mint(state, action: PayloadAction<Pick<IMint, 'amount'>>) {
      state.mint.sending = true
      state.mint.amount = action.payload.amount
      return state
    },
    mintDone(state, action: PayloadAction<Pick<IMint, 'txid'>>) {
      state.mint.sending = false
      state.mint.txid = action.payload.txid
      state.mint.error = undefined
      return state
    },
    mintFailed(state, action: PayloadAction<Pick<IMint, 'error'>>) {
      state.mint.sending = false
      state.mint.error = action.payload.error
      return state
    },
    withdraw(state, action: PayloadAction<Pick<IWithdraw, 'amount' | 'tokenAddress'>>) {
      state.withdraw.sending = true
      state.withdraw.amount = action.payload.amount
      state.withdraw.tokenAddress = action.payload.tokenAddress
      return state
    },
    withdrawDone(state, action: PayloadAction<Pick<IWithdraw, 'txid'>>) {
      state.withdraw.sending = false
      state.withdraw.txid = action.payload.txid
      state.withdraw.error = undefined
      return state
    },
    withdrawFailed(state, action: PayloadAction<Pick<IWithdraw, 'error'>>) {
      state.withdraw.sending = false
      state.withdraw.error = action.payload.error
      return state
    },
    claimRewards(state) {
      state.claimRewards.sending = true
      return state
    },
    claimRewardsDone(state, action: PayloadAction<Pick<IClaimRewards, 'txid'>>) {
      state.claimRewards.sending = false
      state.claimRewards.txid = action.payload.txid
      state.claimRewards.error = undefined
      return state
    },
    claimRewardsFailed(state, action: PayloadAction<Pick<IClaimRewards, 'error'>>) {
      state.claimRewards.sending = false
      state.claimRewards.error = action.payload.error
      return state
    },
    withdrawRewards(state) {
      state.withdrawRewards.sending = true
      return state
    },
    withdrawRewardsDone(state, action: PayloadAction<Pick<IWithdrawRewards, 'txid'>>) {
      state.withdrawRewards.sending = false
      state.withdrawRewards.txid = action.payload.txid
      state.withdrawRewards.error = undefined
      return state
    },
    withdrawRewardsFailed(state, action: PayloadAction<Pick<IWithdrawRewards, 'error'>>) {
      state.withdrawRewards.sending = false
      state.withdrawRewards.error = action.payload.error
      return state
    },
    createAccount(state, action: PayloadAction<{ tokenAddress: PublicKey }>) {
      state.createAccount.sending = true
      state.createAccount.tokenAddress = action.payload.tokenAddress
      return state
    },
    createAccountDone(state, action: PayloadAction<Pick<ICreateAccount, 'txid'>>) {
      state.createAccount.sending = false
      state.createAccount.txid = action.payload.txid
      return state
    }
  }
})
export const actions = stakingSlice.actions
export const reducer = stakingSlice.reducer
export type PayloadTypes = PayloadType<typeof actions>
