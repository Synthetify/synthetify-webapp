import { DEFAULT_PUBLICKEY } from '@consts/static'
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
