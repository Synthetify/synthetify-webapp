import { ILeverage, leverageSliceName } from '@reducers/leverage'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[leverageSliceName] as ILeverage

export const { short, long } = keySelectors(store, ['short', 'long'])

export const vaultSelectors = { short, long }

export default vaultSelectors
