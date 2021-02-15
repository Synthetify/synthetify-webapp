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
  mintAuthority
} = keySelectors(store, [
  'assets',
  'collateralAccount',
  'collateralToken',
  'collateralizationLevel',
  'debt',
  'fee',
  'shares',
  'userAccount',
  'mintAuthority'
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
    if (account.address === DEFAULT_PUBLICKEY.toString() || account.collateral.eq(new BN(0))) {
      return new BN(0)
    }
    console.log(account.collateral.toString())
    const value = allAssets[collateralTokenAddress.toString()].price
      .mul(account.collateral)
      .div(new BN(1e4))
    console.log(value.toString())
    return value
  }
)
export const userDebtValue = createSelector(
  userAccount,
  assets,
  shares,
  (account, allAssets, allShares) => {
    if (account.address === DEFAULT_PUBLICKEY.toString() || account.collateral.eq(new BN(0))) {
      return new BN(0)
    }
    const debt = Object.entries(allAssets).reduce((acc, [_, asset]) => {
      return acc.add(asset.price.mul(asset.supply).div(new BN(1e4)))
    }, new BN(0))
    const userDebt = debt.mul(allShares).div(account.shares)
    return userDebt
  }
)
export const userCollateralRatio = createSelector(userDebtValue, stakedValue, (debt, stake) => {
  if (debt.eq(new BN(0)) || stake.eq(new BN(0))) {
    return new BN(0)
  }
  return stake.mul(new BN(1e3)).div(debt).div(new BN(10))
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
  mintAuthority
}

export default exchangeSelectors
