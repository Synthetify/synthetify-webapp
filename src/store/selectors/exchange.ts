import { DEFAULT_PUBLICKEY } from '@consts/static'
import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { IExchange, exchangeSliceName } from '../reducers/exchange'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[exchangeSliceName] as IExchange

export const {
  assets,
  collateralAccount,
  collateralToken,
  collateralizationLevel,
  debt,
  fee,
  shares,
  userAccount,
  mintAuthority,
  swap
} = keySelectors(store, [
  'assets',
  'collateralAccount',
  'collateralToken',
  'collateralizationLevel',
  'debt',
  'fee',
  'shares',
  'userAccount',
  'mintAuthority',
  'swap'
])
export const userAccountAddress = createSelector(userAccount, userAcc => {
  return new PublicKey(userAcc.address)
})
export const xUSDAddress = createSelector(assets, allAssets => {
  const xusd = Object.entries(allAssets).find(([_, b]) => {
    return b.ticker === 'xUSD'
  })
  if (xusd) {
    return xusd[1].address
  } else {
    return DEFAULT_PUBLICKEY
  }
})
export const stakedValue = createSelector(
  userAccount,
  assets,
  collateralToken,
  (account, allAssets, collateralTokenAddress) => {
    if (
      account.address === DEFAULT_PUBLICKEY.toString() ||
      account.collateral.eq(new BN(0)) ||
      !allAssets[collateralTokenAddress.toString()]
    ) {
      return new BN(0)
    }
    const value = allAssets[collateralTokenAddress.toString()].price
      .mul(account.collateral)
      .div(new BN(1e4))
    return value
  }
)
export const userDebtValue = createSelector(
  userAccount,
  assets,
  shares,
  (account, allAssets, allShares) => {
    if (
      account.address === DEFAULT_PUBLICKEY.toString() ||
      account.collateral.eq(new BN(0)) ||
      account.shares.eq(new BN(0)) ||
      allShares.eq(new BN(0))
    ) {
      return new BN(0)
    }
    const debt = Object.entries(allAssets).reduce((acc, [_, asset]) => {
      return acc.add(asset.price.mul(asset.supply).div(new BN(1e4)))
    }, new BN(0))
    const userDebt = debt.mul(account.shares).div(allShares)
    return userDebt
  }
)
export const userMaxDebtValue = createSelector(
  stakedValue,
  collateralizationLevel,
  (userStakedValue, collateralLvl) => {
    if (userStakedValue.eq(new BN(0))) {
      return new BN(0)
    }

    return userStakedValue.mul(new BN(100)).div(new BN(collateralLvl))
  }
)

export const userMaxMintUsd = createSelector(
  userMaxDebtValue,
  userDebtValue,
  (maxDebt, userDebt) => {
    if (maxDebt.eq(new BN(0)) || maxDebt.lt(userDebt)) {
      return new BN(0)
    }
    return maxDebt.sub(userDebt)
  }
)
export const userCollateralRatio = createSelector(userDebtValue, stakedValue, (debt, stake) => {
  if (debt.eq(new BN(0)) || stake.eq(new BN(0))) {
    return new BN(0)
  }
  return stake.mul(new BN(1e3)).div(debt).div(new BN(10))
})

export const userMaxWithdraw = createSelector(
  userDebtValue,
  userMaxDebtValue,
  collateralizationLevel,
  assets,
  collateralToken,
  (debt, maxUsd, collateralLvl, allAssets, collateral) => {
    if (
      maxUsd.eq(new BN(0)) ||
      debt.gte(maxUsd) ||
      collateral.equals(DEFAULT_PUBLICKEY) ||
      !allAssets[collateral.toString()]
    ) {
      return new BN(0)
    }
    const collateralToken = allAssets[collateral.toString()]
    return maxUsd
      .sub(debt)
      .mul(new BN(collateralLvl))
      .div(new BN(100))
      .mul(new BN(1e4))
      .div(collateralToken.price)
  }
)
export const userMaxBurnToken = (assetAddress: PublicKey) =>
  createSelector(userDebtValue, assets, (debt, allAssets) => {
    const token = allAssets[assetAddress.toString()]
    if (debt.eq(new BN(0)) || !token) {
      return new BN(0)
    }
    return debt.mul(new BN(1e4)).div(token.price)
  })
export const tokenTicker = (tokenAddress: PublicKey) =>
  createSelector(assets, allAssets => {
    const token = allAssets[tokenAddress.toString()]
    if (!token) {
      if (tokenAddress.equals(DEFAULT_PUBLICKEY)) {
        return 'SOL'
      }
      return 'token'
    } else {
      return token.ticker
    }
  })
export const exchangeSelectors = {
  assets,
  collateralAccount,
  collateralToken,
  collateralizationLevel,
  debt,
  fee,
  shares,
  userAccount,
  userAccountAddress,
  mintAuthority,
  userMaxWithdraw,
  tokenTicker,
  userMaxBurnToken,
  swap
}

export default exchangeSelectors
