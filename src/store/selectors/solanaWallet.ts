import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { assets, collaterals, exchangeAccount, synthetics, userDebtValue } from '@selectors/exchange'
import { ISolanaWallet, solanaWalletSliceName, ITokenAccount } from '../reducers/solanaWallet'
import { keySelectors, AnyProps } from './helpers'
import { PublicKey } from '@solana/web3.js'
import { ACCURACY, DEFAULT_PUBLICKEY, ORACLE_OFFSET } from '@consts/static'
import { ISynthetic } from '@reducers/exchange'
import { Asset } from '@synthetify/sdk/lib/exchange'

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

export type ExchangeTokensWithBalance = Asset & ISynthetic & { balance: BN }
export const exchangeTokensWithUserBalance = createSelector(
  accounts,
  synthetics,
  assets,
  (tokensAccounts, allSynthetics, exchangeAssets) => {
    return Object.values(allSynthetics)
      .map(asset => {
        const userAccount = tokensAccounts[asset.assetAddress.toString()]
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return {
          ...exchangeAssets[allSynthetics[asset.assetAddress.toString()].assetIndex],
          ...allSynthetics[asset.assetAddress.toString()],
          balance: userAccount ? userAccount.balance : new BN(0)
        } as ExchangeTokensWithBalance
      })
  }
)

export type TokenAccounts = ITokenAccount & {
  symbol: string,
  usdValue: BN,
  assetDecimals: number
}
export const syntheticAccountsArray = createSelector(
  accounts,
  synthetics,
  assets,
  (tokensAccounts, allSynthetics, exchangeAssets): TokenAccounts[] => {
    return Object.values(tokensAccounts).reduce((acc, account) => {
      if (allSynthetics[account.programId.toString()]) {
        const asset = allSynthetics[account.programId.toString()]
        acc.push({
          ...account,
          symbol: asset.symbol,
          assetDecimals: asset.supply.scale,
          usdValue: exchangeAssets[asset.assetIndex].price.val
            .mul(account.balance)
            .mul(new BN(10 ** account.decimals))
            .div(new BN(10 ** (exchangeAssets[asset.assetIndex].price.scale)))
            .div(new BN(10 ** asset.supply.scale))
        })
      }
      return acc
    }, [] as TokenAccounts[])
  }
)

export const collateralAccountsArray = createSelector(
  accounts,
  collaterals,
  assets,
  address,
  balance,
  (tokensAccounts, allCollaterals, exchangeAssets, wSOLAddress, wSOLBalance): TokenAccounts[] => {
    const accounts = Object.values(tokensAccounts).reduce((acc, account) => {
      if (allCollaterals[account.programId.toString()]) {
        const asset = allCollaterals[account.programId.toString()]
        acc.push({
          ...account,
          symbol: asset.symbol,
          assetDecimals: asset.reserveBalance.scale,
          usdValue: exchangeAssets[asset.assetIndex].price.val
            .mul(account.balance)
            .mul(new BN(10 ** account.decimals))
            .div(new BN(10 ** (exchangeAssets[asset.assetIndex].price.scale)))
            .div(new BN(10 ** asset.reserveBalance.scale))
        })
      }
      return acc
    }, [] as TokenAccounts[])

    const wSOL = Object.values(allCollaterals).find(asset => asset.symbol === 'WSOL')

    if (wSOL && accounts.length) {
      accounts.push({
        symbol: wSOL.symbol,
        assetDecimals: wSOL.reserveBalance.scale,
        usdValue: exchangeAssets[wSOL.assetIndex].price.val
          .mul(wSOLBalance)
          .mul(new BN(10 ** wSOL.reserveBalance.scale))
          .div(new BN(10 ** (exchangeAssets[wSOL.assetIndex].price.scale)))
          .div(new BN(10 ** wSOL.reserveBalance.scale)),
        decimals: wSOL.reserveBalance.scale,
        programId: wSOL.collateralAddress,
        balance: wSOLBalance,
        address: wSOLAddress
      })
    }

    return accounts
  }
)
export const stakedAccountsArray = createSelector(
  exchangeAccount,
  collaterals,
  assets,
  address,
  accounts,
  (account, allCollaterals, allAssets, wSOLAddress, tokensAccounts): TokenAccounts[] => {
    const accounts: TokenAccounts[] = []

    for (const collateral of account.collaterals) {
      const collateralAddress = collateral.collateralAddress.toString()
      if (allCollaterals[collateralAddress]) {
        accounts.push({
          symbol: allCollaterals[collateralAddress].symbol,
          programId: allCollaterals[collateralAddress].collateralAddress,
          decimals: allCollaterals[collateralAddress].reserveBalance.scale,
          address: allCollaterals[collateralAddress].symbol === 'WSOL' ? wSOLAddress : tokensAccounts[collateralAddress].address,
          assetDecimals: allCollaterals[collateralAddress].reserveBalance.scale,
          balance: collateral.amount,
          usdValue: collateral.amount
            .mul(allAssets[allCollaterals[collateralAddress].assetIndex].price.val)
            .div(new BN(10 ** (allAssets[allCollaterals[collateralAddress].assetIndex].price.scale)))
        })
      }
    }

    return accounts
  }
)
export const userMaxBurnToken = (assetAddress: PublicKey) =>
  createSelector(userDebtValue, synthetics, assets, tokenAccount(assetAddress), (debt, allSynthetics, allAssets, account) => {
    const token = allSynthetics[assetAddress.toString()]
    if (debt.eq(new BN(0)) || !token) {
      return new BN(0)
    }
    const decimalChange = 10 ** (token.supply.scale + ORACLE_OFFSET - ACCURACY)

    const assetToBurnBalance = account ? allAssets[token.assetIndex].price.val.mul(account.balance).div(new BN(decimalChange)) : new BN(0)

    const val = debt.lt(assetToBurnBalance) ? debt : assetToBurnBalance

    return val.mul(new BN(decimalChange)).div(allAssets[token.assetIndex].price.val)
  })

export const userMaxDeposit = (assetAddress: PublicKey) =>
  createSelector(tokenBalance(assetAddress), collaterals, balance, (assetBalance, allCollaterals, wSOLBalance) => {
    if (allCollaterals[assetAddress.toString()]?.symbol === 'WSOL') {
      const newBalance = wSOLBalance.sub(
        new BN(21 *
          (10 **
            (allCollaterals[assetAddress.toString()].reserveBalance.scale - 4)
          )
        )
      )
      return {
        balance: newBalance.lt(new BN(0)) ? new BN(0) : newBalance,
        decimals: allCollaterals[assetAddress.toString()].reserveBalance.scale
      }
    }

    return assetBalance
  })

export const solanaWalletSelectors = {
  address,
  balance,
  accounts,
  status,
  syntheticAccountsArray,
  tokenAccount,
  exchangeTokensWithUserBalance,
  userMaxBurnToken
}
export default solanaWalletSelectors
