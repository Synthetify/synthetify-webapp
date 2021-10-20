import { ACCURACY, DEFAULT_PUBLICKEY, ORACLE_OFFSET } from '@consts/static'
import { divUp, discountData, printBN, transformBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { toEffectiveFee } from '@synthetify/sdk/lib/utils'
import { IExchange, exchangeSliceName } from '../reducers/exchange'
import { keySelectors, AnyProps } from './helpers'

const store = (s: AnyProps) => s[exchangeSliceName] as IExchange

export const {
  assets,
  synthetics,
  collaterals,
  mintAuthority,
  swap,
  state,
  exchangeAccount,
  swaplines,
  swaplineSwap
} = keySelectors(store, [
  'assets',
  'synthetics',
  'collaterals',
  'mintAuthority',
  'swap',
  'state',
  'exchangeAccount',
  'swaplines',
  'swaplineSwap'
])
export const healthFactor = createSelector(state, s => {
  return s.healthFactor
})
export const staking = createSelector(state, s => {
  return s.staking
})
export const debtInterestRate = createSelector(state, s => {
  return s.debtInterestRate
})
export const fee = createSelector(state, s => {
  return s.fee
})
export const userDebtShares = createSelector(exchangeAccount, account => {
  return account.debtShares
})
export const userStaking = createSelector(exchangeAccount, account => {
  return account.userStaking
})
export const xUSDAddress = createSelector(synthetics, assets, (allSynthetics, allAssets) => {
  const xusd = Object.entries(allSynthetics).find(([_, b]) => {
    return allAssets[b.assetIndex].feedAddress.equals(DEFAULT_PUBLICKEY)
  })
  if (xusd) {
    return xusd[1].assetAddress
  } else {
    return DEFAULT_PUBLICKEY
  }
})
export const stakedValue = createSelector(
  exchangeAccount,
  collaterals,
  assets,
  (account, allCollaterals, allAssets) => {
    if (account.address.equals(DEFAULT_PUBLICKEY)) {
      return new BN(0)
    }

    let val: BN = new BN(0)

    for (const collateral of account.collaterals) {
      const collateralAddress = collateral.collateralAddress.toString()

      if (allCollaterals[collateralAddress]) {
        const toAdd: BN = collateral.amount
          .mul(allAssets[allCollaterals[collateralAddress].assetIndex].price.val)
          .div(
            new BN(
              10 **
                (allCollaterals[collateralAddress].reserveBalance.scale + ORACLE_OFFSET - ACCURACY)
            )
          )
        val = val.add(toAdd)
      }
    }

    return val
  }
)

export const collateralValue = createSelector(
  exchangeAccount,
  collaterals,
  assets,
  (account, allCollaterals, allAssets) => {
    if (account.address.equals(DEFAULT_PUBLICKEY)) {
      return new BN(0)
    }

    let val: BN = new BN(0)
    for (const collateral of account.collaterals) {
      const collateralAddress = collateral.collateralAddress.toString()
      if (allCollaterals[collateralAddress]) {
        const toAdd: BN = collateral.amount
          .mul(allAssets[allCollaterals[collateralAddress].assetIndex].price.val)
          .mul(allCollaterals[collateralAddress].collateralRatio.val)
          .div(new BN(10 ** allCollaterals[collateralAddress].collateralRatio.scale))
          .div(
            new BN(
              10 **
                (allCollaterals[collateralAddress].reserveBalance.scale + ORACLE_OFFSET - ACCURACY)
            )
          )
        val = val.add(toAdd)
      }
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
      !account.collaterals.some(col => !col.amount.eq(new BN(0))) ||
      account.debtShares.eq(new BN(0)) ||
      exchangeState.debtShares.eq(new BN(0))
    ) {
      return new BN(0)
    }
    const debt = Object.entries(allSynthetics).reduce((acc, [_, synthetic]) => {
      return acc.add(
        divUp(
          allAssets[synthetic.assetIndex].price.val.mul(
            synthetic.supply.val.sub(synthetic.borrowedSupply.val).sub(synthetic.swaplineSupply.val)
          ),
          new BN(10 ** (synthetic.supply.scale + ORACLE_OFFSET - ACCURACY))
        )
      )
    }, new BN(0))
    const userDebt = divUp(debt.mul(account.debtShares), exchangeState.debtShares)
    return userDebt
  }
)

export const userMaxDebtValue = createSelector(collateralValue, healthFactor, (value, factor) => {
  return value.mul(factor.val).div(new BN(10 ** factor.scale))
})

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

export const userMaxWithdraw = (collateralTokenAddress: PublicKey) =>
  createSelector(
    userDebtValue,
    userMaxDebtValue,
    collaterals,
    healthFactor,
    assets,
    exchangeAccount,
    (debt, maxUsd, allCollaterals, factor, allAssets, account) => {
      if (
        maxUsd.eq(new BN(0)) ||
        debt.gte(maxUsd) ||
        collateralTokenAddress.equals(DEFAULT_PUBLICKEY) ||
        !allCollaterals[collateralTokenAddress.toString()]
      ) {
        return new BN(0)
      }
      const collateralToken = allCollaterals[collateralTokenAddress.toString()]
      const maxWithdraw = maxUsd
        .sub(debt)
        .mul(new BN(10 ** collateralToken.collateralRatio.scale))
        .mul(new BN(10 ** factor.scale))
        .mul(new BN(10 ** (collateralToken.reserveBalance.scale + ORACLE_OFFSET - ACCURACY)))
        .div(collateralToken.collateralRatio.val)
        .div(new BN(factor.val))
        .div(new BN(allAssets[collateralToken.assetIndex].price.val))
      const collateralAmount =
        account.collaterals.find(token => token.collateralAddress.equals(collateralTokenAddress))
          ?.amount ?? new BN(0)
      return maxWithdraw.lte(collateralAmount) ? maxWithdraw : collateralAmount
    }
  )

export const effectiveFeeData = createSelector(
  fee,
  exchangeAccount,
  (currentFee, exchangeAccount) => {
    const snyAmount = exchangeAccount.collaterals.find(({ index }) => index === 0)?.amount

    if (typeof snyAmount !== 'undefined') {
      const { discount, nextThreshold } = discountData(snyAmount)

      return {
        fee: toEffectiveFee(currentFee, snyAmount),
        discountData: {
          discount,
          nextThreshold:
            typeof nextThreshold !== 'undefined'
              ? nextThreshold - +printBN(snyAmount, 6)
              : undefined
        }
      }
    } else {
      return {
        fee: currentFee,
        discountData: {
          discount: undefined,
          nextThreshold: undefined
        }
      }
    }
  }
)
export const exchangeSelectors = {
  assets,
  healthFactor,
  userStaking,
  debtInterestRate,
  fee,
  userDebtShares,
  mintAuthority,
  userMaxWithdraw,
  swap,
  effectiveFee: effectiveFeeData
}

export const getCollateralStructure = createSelector(
  collaterals,
  assets,
  (allColaterals, assets) => {
    let totalVal = new BN(0)
    const values = Object.values(allColaterals).map(item => {
      const value = assets[item.assetIndex].price.val
        .mul(item.reserveBalance.val)
        .div(new BN(10 ** (item.reserveBalance.scale + ORACLE_OFFSET - ACCURACY)))
      totalVal = totalVal.add(value)
      return {
        value,
        symbol: item.symbol,
        scale: item.reserveBalance.scale
      }
    })
    const collateralStructure = values.map(item => {
      return {
        symbol: item.symbol,
        percent: +printBN(totalVal, item.scale)
          ? (+printBN(item.value, item.scale) / +printBN(totalVal, item.scale)) * 100
          : 0
      }
    })
    return collateralStructure
  }
)

export const getSyntheticsStructure = createSelector(
  synthetics,
  assets,
  (allSynthetics, assets) => {
    let totalVal = new BN(0)
    const values = Object.values(allSynthetics).map(item => {
      const value = assets[item.assetIndex].price.val
        .mul(item.supply.val.sub(item.borrowedSupply.val).sub(item.swaplineSupply.val))
        .div(new BN(10 ** (item.supply.scale + ORACLE_OFFSET - ACCURACY)))
      totalVal = totalVal.add(value)
      return {
        value,
        symbol: item.symbol,
        scale: item.supply.scale
      }
    })
    const syntheticStructure = values.map(item => {
      return {
        symbol: item.symbol,
        percent: +printBN(totalVal, item.scale)
          ? (+printBN(item.value, item.scale) / +printBN(totalVal, item.scale)) * 100
          : 0,
        value: +transformBN(item.value)
      }
    })
    return syntheticStructure
  }
)

export const getCollateralValue = createSelector(collaterals, assets, (allColaterals, assets) => {
  let totalVal = new BN(0)
  Object.values(allColaterals).forEach(item => {
    const value = assets[item.assetIndex].price.val
      .mul(item.reserveBalance.val)
      .div(new BN(10 ** (item.reserveBalance.scale + ORACLE_OFFSET - ACCURACY)))
    totalVal = totalVal.add(value)
  })

  return +transformBN(totalVal)
})

export const getSNYPrice = createSelector(collaterals, assets, (allColaterals, assets) => {
  const snyIndex = Object.values(allColaterals)[0]?.assetIndex
  return typeof snyIndex !== 'undefined'
    ? assets[snyIndex].price
    : {
      val: new BN(0),
      scale: 6
    }
})

export const getHaltedState = createSelector(state, allState => {
  return allState.halted
})

export default exchangeSelectors
