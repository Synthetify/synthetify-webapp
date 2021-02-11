import { createSelector } from '@reduxjs/toolkit'
import * as R from 'remeda'
import { ISolanaWallet, solanaWalletSliceName } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const { address, balance, accounts, status, transactions } = keySelectors(store, [
  'address',
  'balance',
  'accounts',
  'status',
  'transactions'
])

export const tokensAggregated = createSelector(accounts, tokensAccounts => {
  return R.mapValues(tokensAccounts, tokenAccounts => {
    return {
      balance: tokenAccounts.reduce((acc, account) => acc + account.balance, 0),
      accounts: tokenAccounts
    }
  })
})

export const accountsArray = createSelector(accounts, tokensAccounts => {
  return Object.values(tokensAccounts).reduce((acc, accounts) => {
    return acc.concat(accounts)
  }, [])
})
export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  tokensAggregated,
  transactions
}
export default solanaWalletSelectors
