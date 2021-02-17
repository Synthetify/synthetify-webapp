import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const { createAccount, send, deposit } = keySelectors(store, [
  'createAccount',
  'send',
  'deposit'
])

export const modalsSelectors = {
  createAccount,
  send,
  deposit
}

export default modalsSelectors
