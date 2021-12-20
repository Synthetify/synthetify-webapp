import { IVault, vaultSliceName } from '@reducers/vault'
import { createSelector } from '@reduxjs/toolkit'
import BN from 'bn.js'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[vaultSliceName] as IVault

export const { vaults, userVaults, vaultSwap } = keySelectors(store, [
  'vaults',
  'userVaults',
  'vaultSwap'
])

export const vaultSelectors = { vaults, userVaults, vaultSwap }

export const getActualUserVault = createSelector(
  vaultSwap,
  userVaults,
  (vaultSwap, allUserVaults) => {
    if (allUserVaults[vaultSwap.vaultAddress.toString()] !== undefined) {
      const actualUserVault = allUserVaults[vaultSwap.vaultAddress.toString()]
      return {
        collateralAmount: actualUserVault.collateralAmount,
        borrowAmount: actualUserVault.syntheticAmount
      }
    } else {
      return {
        collateralAmount: { val: new BN(0), scale: 0 },
        borrowAmount: { val: new BN(0), scale: 0 }
      }
    }
  }
)
export default vaultSelectors
