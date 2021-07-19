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
  synthetics,
  collaterals,
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
  'synthetics',
  'collaterals',
  'debt',
  'fee',
  'shares',
  'userAccount',
  'mintAuthority',
  'swap',
  'state',
  'exchangeAccount'
])
export const healthFactor = createSelector(state, (s) => {
  return s.healthFactor
})
export const staking = createSelector(state, (s) => {
  return s.staking
})
export const userAccountAddress = createSelector(userAccount, (userAcc) => {
  return new PublicKey(userAcc.address)
})
export const userDebtShares = createSelector(exchangeAccount, (account) => {
  return account.debtShares
})
export const userStaking = createSelector(exchangeAccount, (account) => {
  return account.userStaking
})
export const xUSDAddress = createSelector(synthetics, assets, (allSynthetics, allAssets) => {
  const xusd = Object.entries(allSynthetics).find(([_, b]) => {
    return Object.values(allAssets)[b.assetIndex].feedAddress.equals(DEFAULT_PUBLICKEY)
  })
  if (xusd) {
    return xusd[1].assetAddress
  } else {
    return DEFAULT_PUBLICKEY
  }
})
export const stakedValue = createSelector(exchangeAccount, collaterals, assets, (account, allCollaterals, allAssets) => {
  if (account.address.equals(DEFAULT_PUBLICKEY)) {
    return new BN(0)
  }

  let val: BN = new BN(0)

  for (const collateral of Object.values(account.collaterals)) {
    const toAdd: BN = collateral.amount
      .mul(Object.values(allAssets)[collateral.index].price)
      .div(
        new BN(
          10 **
            (allCollaterals[collateral.collateralAddress.toString()].decimals +
              ORACLE_OFFSET -
              ACCURACY)
        )
      )
    val = val.add(toAdd)
  }

  return val
})

export const collateralValue = createSelector(
  exchangeAccount,
  collaterals,
  assets,
  (account, allCollaterals, allAssets) => {
    if (account.address.equals(DEFAULT_PUBLICKEY)) {
      return new BN(0)
    }

    let val: BN = new BN(0)

    for (const collateral of Object.values(account.collaterals)) {
      const toAdd: BN = collateral.amount
        .mul(Object.values(allAssets)[collateral.index].price)
        .mul(new BN(allCollaterals[collateral.collateralAddress.toString()].collateralRatio))
        .div(new BN(100))
        .div(new BN(10 ** (allCollaterals[collateral.collateralAddress.toString()].decimals + ORACLE_OFFSET - ACCURACY)))
      val = val.add(toAdd)
    }

    return val
  }
)

export const userDebtValue = createSelector(
  exchangeAccount,
  synthetics,
  state,
  assets,
  (account, allSynthetics, exchangeState, allAssets) => {
    if (
      account.address.equals(DEFAULT_PUBLICKEY) ||
      !account.collaterals.some((col) => !col.amount.eq(new BN(0))) ||
      account.debtShares.eq(new BN(0)) ||
      exchangeState.debtShares.eq(new BN(0))
    ) {
      return new BN(0)
    }
    const debt = Object.entries(allSynthetics).reduce((acc, [_, synthetic]) => {
      return acc.add(
        divUp(
          Object.values(allAssets)[synthetic.assetIndex].price.mul(synthetic.supply),
          new BN(10 ** (synthetic.decimals + ORACLE_OFFSET - ACCURACY))
        )
      )
    }, new BN(0))
    const userDebt = divUp(debt.mul(account.debtShares), exchangeState.debtShares)
    return userDebt
  }
)

export const userMaxDebtValue = createSelector(
  collateralValue,
  healthFactor,
  (value, factor) => {
    return value.mul(new BN(factor)).div(new BN(100))
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

export const userMaxWithdraw = (collateralTokenAddress: PublicKey) =>
  createSelector(
    userDebtValue,
    userMaxDebtValue,
    collaterals,
    healthFactor,
    assets,
    (debt, maxUsd, allCollaterals, factor, allAssets) => {
      if (
        maxUsd.eq(new BN(0)) ||
        debt.gte(maxUsd) ||
        collateralTokenAddress.equals(DEFAULT_PUBLICKEY) ||
        !allCollaterals[collateralTokenAddress.toString()]
      ) {
        return new BN(0)
      }
      const collateralToken = allCollaterals[collateralTokenAddress.toString()]
      return maxUsd
        .sub(debt)
        .mul(new BN(10000))
        .mul(new BN(10 ** collateralToken.decimals + ORACLE_OFFSET - ACCURACY))
        .div(new BN(collateralToken.collateralRatio))
        .div(new BN(factor))
        .div(new BN(Object.values(allAssets)[collateralToken.assetIndex].price))
    }
  )
export const tokenTicker = (tokenAddress: PublicKey) =>
  createSelector(assets, (allAssets) => {
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
  userStaking,
  userDebtShares,
  mintAuthority,
  userMaxWithdraw,
  tokenTicker,
  swap
}

export default exchangeSelectors
