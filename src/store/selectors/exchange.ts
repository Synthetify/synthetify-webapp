import {
  calculateAmountBorrow,
  calculateCRatio,
  calculateLiqPrice
} from '@components/Borrow/borrowUtils'
import { ACCURACY, DEFAULT_PUBLICKEY, ORACLE_OFFSET } from '@consts/static'
import {
  divUp,
  discountData,
  printBN,
  transformBN,
  printDecimal,
  stringToMinDecimalBN
} from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { VaultEntry } from '@synthetify/sdk/lib/exchange'
import { toEffectiveFee } from '@synthetify/sdk/lib/utils'
import { IExchange, exchangeSliceName } from '../reducers/exchange'
import { keySelectors, AnyProps } from './helpers'
import { userVaults, vaults } from './vault'

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

export const getSwaplineCollateralBalance = createSelector(
  swaplines,
  collaterals,
  assets,
  (allSwaplines, allCollaterals, allAssets) => {
    const balanceUSD = Object.values(allSwaplines).map(swapline => {
      const collateral = allCollaterals[swapline.collateral.toString()]
      if (!collateral) {
        return 0
      } else {
        return (
          (+printBN(swapline.balance.val, swapline.balance.scale) -
            +printBN(swapline.accumulatedFee.val, swapline.accumulatedFee.scale)) *
          +printBN(
            allAssets[collateral.assetIndex].price.val,
            allAssets[collateral.assetIndex].price.scale
          )
        )
      }
    })
    return balanceUSD.reduce((sum, val) => sum + val, 0)
  }
)

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
      let value = assets[item.assetIndex].price.val
        .mul(item.supply.val.sub(item.borrowedSupply.val).sub(item.swaplineSupply.val))
        .div(new BN(10 ** (item.supply.scale + ORACLE_OFFSET - ACCURACY)))
      if (value.lt(new BN(0))) {
        value = value.mul(new BN(-1))
      }
      totalVal = totalVal.add(value)
      return {
        value,
        scale: item.supply.scale,
        symbol: item.symbol,
        debt: {
          amount: +printDecimal(item.supply),
          usdValue: +transformBN(
            assets[item.assetIndex].price.val
              .mul(item.supply.val)
              .div(new BN(10 ** (item.supply.scale + ORACLE_OFFSET - ACCURACY)))
          )
        },
        collateral: {
          amount: +printBN(item.borrowedSupply.val.add(item.swaplineSupply.val), item.supply.scale),
          usdValue: +transformBN(
            assets[item.assetIndex].price.val
              .mul(item.borrowedSupply.val.add(item.swaplineSupply.val))
              .div(new BN(10 ** (item.supply.scale + ORACLE_OFFSET - ACCURACY)))
          )
        }
      }
    })
    const syntheticStructure = values.map(item => {
      return {
        symbol: item.symbol,
        debt: item.debt,
        collateral: item.collateral,
        value: +transformBN(item.value),
        percent: +printBN(totalVal, item.scale)
          ? (+printBN(item.value, item.scale) / +printBN(totalVal, item.scale)) * 100
          : 0
      }
    })
    return syntheticStructure
  }
)

export const getSyntheticsValue = createSelector(synthetics, assets, (allSynthetics, assets) => {
  let totalVal = new BN(0)
  const values = Object.values(allSynthetics).map(item => {
    const value = assets[item.assetIndex].price.val
      .mul(item.supply.val)
      .div(new BN(10 ** (item.supply.scale + ORACLE_OFFSET - ACCURACY)))
    totalVal = totalVal.add(value)
    return {
      value: +transformBN(value),
      symbol: item.symbol,
      scale: item.supply.scale
    }
  })
  return values
})

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

export interface UserVaults extends VaultEntry {
  borrowed: string
  collateral: string
  deposited: number
  depositedSign: string
  cRatio: string
  minCRatio: number
  currentDebt: number
  currentDebtSign: string
  maxBorrow: string
  interestRate: string
  liquidationPrice: string
}

export const getUserVaults = createSelector(
  vaults,
  userVaults,
  synthetics,
  collaterals,
  assets,
  (allVaults, allUserVaults, allSynthetics, allCollaterals, allAssets) => {
    return Object.values(allUserVaults).map(userVault => {
      const currentVault = allVaults[userVault.vault.toString()]
      const cRatioCalculated = calculateCRatio(
        allAssets[allSynthetics[currentVault.synthetic.toString()].assetIndex].price.val,
        allSynthetics[currentVault.synthetic.toString()].supply.scale,
        allAssets[allCollaterals[currentVault.collateral.toString()].assetIndex].price.val,
        allCollaterals[currentVault.collateral.toString()].reserveBalance.scale,
        userVault.syntheticAmount.val,
        userVault.collateralAmount.val
      )
      const interestRate =
        Number(printBN(currentVault.debtInterestRate.val, currentVault.debtInterestRate.scale)) *
        100

      const openFeeBN = stringToMinDecimalBN(
        (Number(printBN(currentVault.openFee.val, currentVault.openFee.scale)) * 100).toString()
      )

      const maxBorrow = calculateAmountBorrow(
        allAssets[allSynthetics[currentVault.synthetic.toString()].assetIndex].price.val,
        allSynthetics[currentVault.synthetic.toString()].supply.scale,
        allAssets[allCollaterals[currentVault.collateral.toString()].assetIndex].price.val,
        allCollaterals[currentVault.collateral.toString()].reserveBalance.scale,
        userVault.collateralAmount.val,
        Number(
          Math.pow(
            Number(printBN(currentVault.collateralRatio.val, currentVault.collateralRatio.scale)) /
              100,
            -1
          )
        ).toString()
      )
        .sub(userVault.syntheticAmount.val)
        .mul(new BN(10).pow(new BN(openFeeBN.decimal + 2)))
        .div(new BN(10).pow(new BN(openFeeBN.decimal + 2)).add(openFeeBN.BN))
      const vaultData: UserVaults = {
        ...userVault,
        borrowed: allSynthetics[currentVault.synthetic.toString()].symbol,
        collateral: allCollaterals[currentVault.collateral.toString()].symbol,
        deposited: Number(
          printBN(userVault.collateralAmount.val, userVault.collateralAmount.scale)
        ),
        depositedSign: allCollaterals[currentVault.collateral.toString()].symbol,
        cRatio: cRatioCalculated !== 'NaN' ? transformBN(cRatioCalculated) : 'NaN',
        minCRatio: Number(
          Math.pow(
            Number(printBN(currentVault.collateralRatio.val, currentVault.collateralRatio.scale)) /
              100,
            -1
          )
        ),
        currentDebt: Number(
          printBN(userVault.syntheticAmount.val, userVault.syntheticAmount.scale)
        ),
        currentDebtSign: allSynthetics[currentVault.synthetic.toString()].symbol,
        maxBorrow: printBN(
          maxBorrow.gt(new BN(0)) ? maxBorrow : new BN(0),
          allSynthetics[currentVault.synthetic.toString()].supply.scale
        ),
        interestRate: interestRate.toString(),
        liquidationPrice: calculateLiqPrice(
          allAssets[allCollaterals[currentVault.collateral.toString()].assetIndex].price.val,
          userVault.collateralAmount.val,
          allAssets[allSynthetics[currentVault.synthetic.toString()].assetIndex].price.val,
          userVault.syntheticAmount.val,
          currentVault.liquidationThreshold,
          allSynthetics[currentVault.synthetic.toString()].supply.scale,
          allCollaterals[currentVault.collateral.toString()].reserveBalance.scale
        )
      }
      return vaultData
    })
  }
)

export const getGeneralTotals = createSelector(
  vaults,
  userVaults,
  synthetics,
  collaterals,
  assets,
  (allVaults, allUserVaults, allSynthetics, allCollaterals, allAssets) => {
    let totalCollatera = 0
    let totalDebt = 0
    Object.values(allUserVaults).forEach(userVault => {
      const currentVault = allVaults[userVault.vault.toString()]
      totalCollatera =
        totalCollatera +
        Number(
          printBN(
            userVault.collateralAmount.val
              .mul(
                allAssets[allCollaterals[currentVault.collateral.toString()].assetIndex].price.val
              )
              .div(
                new BN(
                  10 **
                    allAssets[allCollaterals[currentVault.collateral.toString()].assetIndex].price
                      .scale
                )
              ),
            allCollaterals[currentVault.collateral.toString()].reserveBalance.scale
          )
        )
      totalDebt =
        totalDebt +
        Number(
          printBN(
            userVault.syntheticAmount.val
              .mul(allAssets[allSynthetics[currentVault.synthetic.toString()].assetIndex].price.val)
              .div(
                new BN(
                  10 **
                    allAssets[allSynthetics[currentVault.synthetic.toString()].assetIndex].price
                      .scale
                )
              ),
            allSynthetics[currentVault.synthetic.toString()].supply.scale
          )
        )
    })

    return {
      totalCollateralAmount: totalCollatera,
      totalDebtAmount: totalDebt
    }
  }
)

export default exchangeSelectors
