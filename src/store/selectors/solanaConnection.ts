import { ISolanaConnectionStore, solanaConnectionSliceName } from '../reducers/solanaConnection'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaConnectionSliceName] as ISolanaConnectionStore

export const { network, status } = keySelectors(store, ['network', 'status'])

export const solanaConnectionSelectors = { network, status }

export default solanaConnectionSelectors
