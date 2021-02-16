import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import * as R from 'remeda'
import { assets } from '@selectors/exchange'
import { ISolanaWallet, solanaWalletSliceName, ITokenAccount } from '../reducers/solanaWallet'
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
      balance: tokenAccounts.reduce((acc, account) => acc.add(account.balance), new BN(0)),
      accounts: tokenAccounts
    }
  })
})

export type TokenAccounts = ITokenAccount & { ticker?: string }
export const accountsArray = createSelector(accounts, assets, (tokensAccounts, exchangeAssets) => {
  return Object.values(tokensAccounts).reduce((acc, accounts) => {
    if (exchangeAssets[accounts[0].programId.toString()]) {
      const a = accounts.map((v: ITokenAccount) => {
        return { ...v, ticker: exchangeAssets[accounts[0].programId.toString()].ticker }
      }) as TokenAccounts[]
      return acc.concat(a)
    }
    return acc.concat(accounts as TokenAccounts[])
  }, [] as TokenAccounts[])
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
