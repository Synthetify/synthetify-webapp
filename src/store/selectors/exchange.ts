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
  exchangeAccount
} = keySelectors(store, [
  'assets',
  'debt',
  'fee',
  'shares',
  'userAccount',
  'mintAuthority',
  'swap',
  'state',
  'exchangeAccount'
])
export const healthFactor = createSelector(state, s => {
  return s.healthFactor
})
export const userAccountAddress = createSelector(userAccount, userAcc => {
  return new PublicKey(userAcc.address)
})
export const xUSDAddress = createSelector(assets, allAssets => {
  const xusd = Object.entries(allAssets).find(([_, b]) => {
    return b.feedAddress.equals(DEFAULT_PUBLICKEY)
  })
  if (xusd) {
    return xusd[1].synthetic.assetAddress
  } else {
    return DEFAULT_PUBLICKEY
  }
})
export const tokenForSymbol = (symbol: string) => createSelector(assets, allAssets => Object.values(allAssets).find(token => token.symbol === symbol))
export const stakedValue = createSelector(
  exchangeAccount,
  assets,
  (account, allAssets) => {
    if (account.address.equals(DEFAULT_PUBLICKEY)) {
      return new BN(0)
    }

    let val: BN = new BN(0)

    for (const asset of Object.values(allAssets)) {
      if (asset.collateral.isCollateral) {
        const accountCollateral = account.collaterals.find(col => col.collateralAddress === asset.collateral.collateralAddress)
        const toAdd: BN = (accountCollateral?.amount ?? new BN(0))
          .mul(asset.price)
          .div(new BN(1e6))
        val = val.add(toAdd)
      }
    }

    return val
  }
)
export const userDebtValue = createSelector(
  exchangeAccount,
  assets,
  state,
  (account, allAssets, exchangeState) => {
    if (
      account.address.equals(DEFAULT_PUBLICKEY) ||
      !account.collaterals.some(col => !col.amount.eq(new BN(0))) ||
      account.debtShares.eq(new BN(0)) ||
      exchangeState.debtShares.eq(new BN(0))
    ) {
      return new BN(0)
    }
    const debt = Object.entries(allAssets).reduce((acc, [_, asset]) => {
      return acc.add(
        divUp(
          asset.price.mul(asset.synthetic.supply),
          new BN(10 ** (asset.synthetic.decimals + ORACLE_OFFSET - ACCURACY))
        )
      )
    }, new BN(0))
    const userDebt = divUp(debt.mul(account.debtShares), exchangeState.debtShares)
    return userDebt
  }
)
export const userMaxDebtValue = createSelector(
  stakedValue,
  healthFactor,
  (userStakedValue, healthFactor) => {
    if (userStakedValue.eq(new BN(0))) {
      return new BN(0)
    }
    return userStakedValue.mul(new BN(100)).mul(new BN(healthFactor)).div(new BN(100))
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

export const userMaxWithdraw = (collateralTokenAddress: PublicKey) => createSelector(
  userDebtValue,
  userMaxDebtValue,
  assets,
  (debt, maxUsd, allAssets) => {
    if (
      maxUsd.eq(new BN(0)) ||
      debt.gte(maxUsd) ||
      collateralTokenAddress.equals(DEFAULT_PUBLICKEY) ||
      !allAssets[collateralTokenAddress.toString()]
    ) {
      return new BN(0)
    }
    const collateralToken = allAssets[collateralTokenAddress.toString()]
    return maxUsd
      .sub(debt)
      // .mul(new BN(collateralLvl))
      .div(new BN(100)) //todo
      .mul(new BN(1e6))
      .div(collateralToken.price)
  }
)
export const userMaxBurnToken = (assetAddress: PublicKey) =>
  createSelector(userDebtValue, assets, (debt, allAssets) => {
    const token = allAssets[assetAddress.toString()]
    if (debt.eq(new BN(0)) || !token) {
      return new BN(0)
    }
    const decimalChange = 10 ** (token.synthetic.decimals - ACCURACY)

    return debt.mul(new BN(1e6)).muln(decimalChange).div(token.price)
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
  healthFactor,
  debt,
  fee,
  shares,
  userAccount,
  userAccountAddress,
  mintAuthority,
  userMaxWithdraw,
  tokenTicker,
  userMaxBurnToken,
  swap,
  tokenForSymbol
}

export default exchangeSelectors
