import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const { createAccount, send, deposit, mint, withdraw } = keySelectors(store, [
  'createAccount',
  'send',
  'deposit',
  'mint',
  'withdraw'
])

export const modalsSelectors = {
  createAccount,
  send,
  deposit,
  mint,
  withdraw
}

export default modalsSelectors
