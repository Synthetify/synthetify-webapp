import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { assets } from '@selectors/exchange'
import { ISolanaWallet, solanaWalletSliceName, ITokenAccount } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'
import { PublicKey } from '@solana/web3.js'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { IAsset } from '@reducers/exchange'

const store = (s: AnyProps) => s[solanaWalletSliceName] as ISolanaWallet

export const { address, balance, accounts, status } = keySelectors(store, [
  'address',
  'balance',
  'accounts',
  'status'
])

export const tokenBalance = (tokenAddress: PublicKey) =>
  createSelector(accounts, balance, (tokensAccounts, solBalance) => {
    if (tokenAddress.equals(DEFAULT_PUBLICKEY)) {
      return { balance: solBalance, decimals: 9 }
    } else {
      if (!tokensAccounts[tokenAddress.toString()]) {
        return { balance: new BN(0), decimals: 9 }
      }
      return {
        balance: tokensAccounts[tokenAddress.toString()].balance,
        decimals: tokensAccounts[tokenAddress.toString()].decimals
      }
    }
  })
export const tokenAccount = (tokenAddress: PublicKey) =>
  createSelector(accounts, tokensAccounts => {
    if (tokensAccounts[tokenAddress.toString()]) {
      return tokensAccounts[tokenAddress.toString()]
    }
  })

export type TokensWithBalance = IAsset & { balance: BN }
export const exchangeTokensWithUserBalance = createSelector(
  accounts,
  assets,
  (tokensAccounts, exchangeAssets) => {
    return Object.values(exchangeAssets)
      .filter(a => a.symbol !== 'SNY')
      .map(asset => {
        const userAccount = tokensAccounts[asset.assetAddress.toString()]
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {
          ...asset,
          balance: userAccount ? userAccount.balance : new BN(0)
        } as TokensWithBalance
      })
  }
)

export type TokenAccounts = ITokenAccount & {
  symbol: string,
  usdValue: BN
}
export const accountsArray = createSelector(
  accounts,
  assets,
  (tokensAccounts, exchangeAssets): TokenAccounts[] => {
    return Object.values(tokensAccounts).reduce((acc, account) => {
      if (exchangeAssets[account.programId.toString()]) {
        acc.push({
          ...account,
          symbol: exchangeAssets[account.programId.toString()].symbol,
          usdValue: exchangeAssets[account.programId.toString()].price.mul(account.balance).div(new BN(100000000))
        })
      }
      return acc
    }, [] as TokenAccounts[])
  }
)
export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  accountsArray,
  tokenAccount,
  exchangeTokensWithUserBalance
}
export default solanaWalletSelectors
