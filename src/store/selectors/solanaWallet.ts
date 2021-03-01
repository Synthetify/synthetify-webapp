import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import * as R from 'remeda'
import { assets } from '@selectors/exchange'
import { ISolanaWallet, solanaWalletSliceName, ITokenAccount } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { IAsset } from '@reducers/exchange'

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
export const tokenBalance = (tokenAddress: PublicKey) =>
  createSelector(accounts, balance, (tokensAccounts, solBalance) => {
    if (tokenAddress.equals(DEFAULT_PUBLICKEY)) {
      return { balance: solBalance, decimals: 9 }
    } else {
      if (!tokensAccounts[tokenAddress.toString()]) {
        return { balance: new BN(0), decimals: 9 }
      }
      return {
        balance: tokensAccounts[tokenAddress.toString()][0].balance,
        decimals: tokensAccounts[tokenAddress.toString()][0].decimals
      }
    }
  })
export const tokenAccount = (tokenAddress: PublicKey) =>
  createSelector(accounts, tokensAccounts => {
    if (tokensAccounts[tokenAddress.toString()]) {
      return tokensAccounts[tokenAddress.toString()][0]
    }
  })

export type TokensWithBalance = IAsset & { balance: BN }
export const exchangeTokensWithUserBalance = createSelector(
  accounts,
  assets,
  (tokensAccounts, exchangeAssets) => {
    return Object.values(exchangeAssets)
      .filter(a => a.ticker !== 'SNY')
      .map(asset => {
        const userAccount = tokensAccounts[asset.address.toString()]
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {
          ...asset,
          balance: userAccount ? userAccount[0].balance : new BN(0)
        } as TokensWithBalance
      })
  }
)

export type TokenAccounts = ITokenAccount & { ticker?: string }
export const accountsArray = createSelector(
  accounts,
  assets,
  (tokensAccounts, exchangeAssets): TokenAccounts[] => {
    return Object.values(tokensAccounts).reduce((acc, accounts) => {
      if (exchangeAssets[accounts[0].programId.toString()]) {
        const a = accounts.map((v: ITokenAccount) => {
          return { ...v, ticker: exchangeAssets[accounts[0].programId.toString()].ticker }
        }) as TokenAccounts[]
        return acc.concat(a)
      }
      return acc.concat(accounts as TokenAccounts[])
    }, [] as TokenAccounts[])
  }
)
export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  tokensAggregated,
  transactions,
  accountsArray,
  tokenAccount,
  exchangeTokensWithUserBalance
}
export default solanaWalletSelectors
