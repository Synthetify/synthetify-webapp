import { IVault, vaultSliceName } from '@reducers/vault'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[vaultSliceName] as IVault

export const { vaults, ownedVaults, vaultSwap } = keySelectors(store, [
  'vaults',
  'ownedVaults',
  'vaultSwap'
])

export const vaultSelectors = { vaults, ownedVaults, vaultSwap }

export default vaultSelectors
