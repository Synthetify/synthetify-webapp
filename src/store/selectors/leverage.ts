import { ILeverage, leverageSliceName } from '@reducers/leverage'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[leverageSliceName] as ILeverage

export const { short, long, currentlySelected } = keySelectors(store, [
  'short',
  'long',
  'currentlySelected'
])

export const vaultSelectors = { short, long, currentlySelected }

export default vaultSelectors
