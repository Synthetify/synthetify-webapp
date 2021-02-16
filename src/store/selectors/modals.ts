import { IModals, modalsSliceName } from '@reducers/modals'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[modalsSliceName] as IModals

export const { createAccount, send } = keySelectors(store, ['createAccount', 'send'])

export const modalsSelectors = {
  createAccount,
  send
}

export default modalsSelectors
