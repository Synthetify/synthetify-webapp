import { printBN } from '@consts/utils'
import { IVault, vaultSliceName } from '@reducers/vault'
import { createSelector } from '@reduxjs/toolkit'
import BN from 'bn.js'
import { keySelectors, AnyProps } from './helpers'
import { currentlySelected } from './leverage'

const store = (s: AnyProps) => s[vaultSliceName] as IVault

export const { vaults, userVaults, vaultSwap, newVaultEntryAddress, assetPrice } = keySelectors(
  store,
  ['vaults', 'userVaults', 'vaultSwap', 'newVaultEntryAddress', 'assetPrice']
)

export const vaultSelectors = { vaults, userVaults, vaultSwap }

export const getActualUserVault = createSelector(
  vaultSwap,
  userVaults,
  (vaultSwap, allUserVaults) => {
    if (typeof allUserVaults[vaultSwap.vaultAddress.toString()] !== 'undefined') {
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
export const getCurrentVaultLeverage = createSelector(
  currentlySelected,
  userVaults,
  (selected, allUserVaults) => {
    if (typeof allUserVaults[selected.vaultAddress.toString()] !== 'undefined') {
      const actualUserVault = allUserVaults[selected.vaultAddress.toString()]
      return {
        collateralAmount: actualUserVault.collateralAmount,
        borrowAmount: actualUserVault.syntheticAmount
      }
    }

    return {
      collateralAmount: { val: new BN(0), scale: 0 },
      borrowAmount: { val: new BN(0), scale: 0 }
    }
  }
)
export const getVaultCollateralBalance = createSelector(
  vaults,
  assetPrice,
  (allVaults, allAssetPrice) => {
    const balanceUSD = Object.values(allVaults).map(vault => {
      const collateralPrice = allAssetPrice[vault.collateral.toString()]
      if (!collateralPrice) {
        return 0
      }
      return (
        +printBN(vault.collateralAmount.val, vault.collateralAmount.scale) *
        +printBN(collateralPrice.val, collateralPrice.scale)
      )
    })
    return balanceUSD.reduce((sum, val) => sum + val, 0)
  }
)

export default vaultSelectors
