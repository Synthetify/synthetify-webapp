import { ACCURACY, DEFAULT_PUBLICKEY, ORACLE_OFFSET } from '@consts/static'
import { divUp } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { IExchange, exchangeSliceName } from '../reducers/exchange'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[exchangeSliceName] as IExchange

export const {
  assets,
  debt,
  fee,
  shares,
  userAccount,
  mintAuthority,
  swap,
  state,
  exchangeAccount,
  collateralAccountBalance
} = keySelectors(store, [
  'assets',
  'debt',
  'fee',
  'shares',
  'userAccount',
  'mintAuthority',
  'swap',
  'state',
  'exchangeAccount',
  'collateralAccountBalance'
])
export const collateralizationLevel = createSelector(state, s => {
  return s.collateralizationLevel
})
export const collateralAccount = createSelector(state, s => {
  return s.collateralAccount
})
export const collateralToken = createSelector(state, s => {
  return s.collateralToken
})
export const userAccountAddress = createSelector(userAccount, userAcc => {
  return new PublicKey(userAcc.address)
})
export const xUSDAddress = createSelector(assets, allAssets => {
  const xusd = Object.entries(allAssets).find(([_, b]) => {
    return b.feedAddress.equals(DEFAULT_PUBLICKEY)
  })
  console.log(xusd?.[1])
  if (xusd) {
    return xusd[1].assetAddress
  } else {
    return DEFAULT_PUBLICKEY
  }
})
export const stakedValue = createSelector(
  exchangeAccount,
  assets,
  collateralToken,
  collateralAccountBalance,
  state,
  (account, allAssets, collateralTokenAddress, exchangeBalance, exchangeState) => {
    if (
      account.address.equals(DEFAULT_PUBLICKEY) ||
      exchangeBalance.eqn(0) ||
      account.collateralShares.eqn(0) ||
      exchangeState.collateralShares.eqn(0) ||
      !allAssets[collateralTokenAddress.toString()]
    ) {
      return new BN(0)
    }
    const value = account.collateralShares
      .mul(exchangeBalance)
      .div(exchangeState.collateralShares)
      .mul(allAssets[collateralTokenAddress.toString()].price)
      .div(new BN(1e4))
    return value
  }
)
export const userDebtValue = createSelector(
  exchangeAccount,
  assets,
  state,
  (account, allAssets, exchangeState) => {
    if (
      account.address.equals(DEFAULT_PUBLICKEY) ||
      account.collateralShares.eq(new BN(0)) ||
      account.debtShares.eq(new BN(0)) ||
      exchangeState.debtShares.eq(new BN(0))
    ) {
      return new BN(0)
    }
    const debt = Object.entries(allAssets).reduce((acc, [_, asset]) => {
      return acc.add(
        divUp(
          asset.price.mul(asset.supply),
          new BN(10 ** (asset.decimals + ORACLE_OFFSET - ACCURACY))
        )
      )
    }, new BN(0))
    const userDebt = divUp(debt.mul(account.debtShares), exchangeState.debtShares)
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
    const decimalChange = 10 ** (token.decimals - ACCURACY)

    return debt.mul(new BN(1e4)).muln(decimalChange).div(token.price)
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
      return token.symbol
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
