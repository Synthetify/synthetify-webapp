import {
  calculateAmountBorrow,
  calculateCRatio,
  calculateLiqPrice,
  calculateLiqPriceShort
} from '@consts/borrowUtils'
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
import { Status } from '@reducers/solanaConnection'
import { createSelector } from '@reduxjs/toolkit'
import { PublicKey } from '@solana/web3.js'
import { Decimal, VaultEntry } from '@synthetify/sdk/lib/exchange'
import { addressToAssetSymbol, toEffectiveFee } from '@synthetify/sdk/lib/utils'
import { IExchange, exchangeSliceName } from '../reducers/exchange'
import { keySelectors, AnyProps } from './helpers'
import { status } from './solanaConnection'
import { assetPrice, initVaultEntry, userVaults, vaults } from './vault'

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

export const getMSolTvl = createSelector(collaterals, assets, (allCollaterals, allAssets) => {
  const mSolIndex = Object.values(allCollaterals).findIndex(coll => coll.symbol === 'mSOL')

  if (mSolIndex === -1) {
    return 0
  }

  const mSolAmount = Object.values(allCollaterals)[mSolIndex].reserveBalance
  const mSolPrice = allAssets[Object.values(allCollaterals)[mSolIndex].assetIndex].price

  const tvl = mSolAmount.val
    .mul(mSolPrice.val)
    .div(new BN(10 ** (mSolAmount.scale + ORACLE_OFFSET - ACCURACY)))

  return +transformBN(tvl)
})

export const getstSolTvl = createSelector(collaterals, assets, (allCollaterals, allAssets) => {
  const stSolIndex = Object.values(allCollaterals).findIndex(coll => coll.symbol === 'stSOL')
  if (stSolIndex === -1) {
    return 0
  }
  const stSolAmount = Object.values(allCollaterals)[stSolIndex].reserveBalance
  const stSolPrice = allAssets[Object.values(allCollaterals)[stSolIndex].assetIndex].price

  const tvl = stSolAmount.val
    .mul(stSolPrice.val)
    .div(new BN(10 ** (stSolAmount.scale + ORACLE_OFFSET - ACCURACY)))
  return +transformBN(tvl)
})

export const getHaltedState = createSelector(state, allState => {
  return allState.halted
})

export interface UserVaults extends VaultEntry {
  borrowed: string
  collateral: string
  deposited: Decimal
  cRatio: string
  minCRatio: number
  currentDebt: Decimal
  maxBorrow: string
  interestRate: string
  liquidationPrice: string
  liquidationShortPrice: string
  vaultType: number
}

export const getUserVaults = createSelector(
  vaults,
  userVaults,
  synthetics,
  assetPrice,
  status,
  initVaultEntry,
  (allVaults, allUserVaults, allSynthetics, allAssetPrice, statusState, initVaultEntryStatus) => {
    const vaultData: UserVaults[] = []
    if (statusState !== Status.Initialized || !initVaultEntryStatus) {
      return vaultData
    }
    Object.values(allUserVaults).forEach(userVault => {
      const currentVault = allVaults[userVault.vault.toString()]
      if (
        typeof currentVault === 'undefined' ||
        typeof allAssetPrice[currentVault.collateral.toString()] === 'undefined' ||
        typeof allAssetPrice[currentVault.synthetic.toString()] === 'undefined'
      ) {
        return
      }
      const cRatioCalculated = calculateCRatio(
        allAssetPrice[currentVault.synthetic.toString()].val,
        allSynthetics[currentVault.synthetic.toString()].supply.scale,
        allAssetPrice[currentVault.collateral.toString()].val,
        currentVault.collateralAmount.scale,
        userVault.syntheticAmount.val,
        userVault.collateralAmount.val
      )
      const cRatioCalculatedString =
        cRatioCalculated !== 'NaN' ? printBN(cRatioCalculated, 2) : 'NaN'

      const interestRate =
        Number(printBN(currentVault.debtInterestRate.val, currentVault.debtInterestRate.scale)) *
        100

      const openFeeBN = stringToMinDecimalBN(
        (Number(printBN(currentVault.openFee.val, currentVault.openFee.scale)) * 100).toString()
      )

      const maxBorrow = calculateAmountBorrow(
        allAssetPrice[currentVault.synthetic.toString()].val,
        allSynthetics[currentVault.synthetic.toString()].supply.scale,
        allAssetPrice[currentVault.collateral.toString()].val,
        currentVault.collateralAmount.scale,
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
      const liquidationPrice = calculateLiqPrice(
        allAssetPrice[currentVault.collateral.toString()].val,
        userVault.collateralAmount.val,
        allAssetPrice[currentVault.synthetic.toString()].val,
        userVault.syntheticAmount.val,
        currentVault.liquidationThreshold,
        allSynthetics[currentVault.synthetic.toString()].supply.scale,
        currentVault.collateralAmount.scale
      )
      vaultData.push({
        ...userVault,
        borrowed: addressToAssetSymbol[currentVault.synthetic.toString()] || 'XYZ',
        collateral: addressToAssetSymbol[currentVault.collateral.toString()] || 'XYZ',
        deposited: userVault.collateralAmount,
        cRatio: cRatioCalculatedString,
        minCRatio: Number(
          Math.pow(
            Number(printBN(currentVault.collateralRatio.val, currentVault.collateralRatio.scale)) /
              100,
            -1
          )
        ),
        currentDebt: userVault.syntheticAmount,
        maxBorrow: printBN(
          maxBorrow.gt(new BN(0)) ? maxBorrow : new BN(0),
          allSynthetics[currentVault.synthetic.toString()].supply.scale
        ),
        interestRate: interestRate.toString(),
        liquidationPrice: liquidationPrice,
        liquidationShortPrice: calculateLiqPriceShort(
          allAssetPrice[currentVault.collateral.toString()].val,
          userVault.collateralAmount.val,
          userVault.syntheticAmount.val,
          currentVault.liquidationThreshold,
          allSynthetics[currentVault.synthetic.toString()].supply.scale,
          currentVault.collateralAmount.scale
        ),
        vaultType: currentVault.vaultType
      })
    })

    return vaultData.filter(
      element =>
        Number(
          (+printBN(element.deposited.val, element.deposited.scale)).toFixed(
            element.deposited.scale - 2
          )
        ) !== 0 || +printBN(element.currentDebt.val, element.currentDebt.scale) !== 0
    )
  }
)

export const getGeneralTotals = createSelector(
  vaults,
  userVaults,
  synthetics,
  assetPrice,
  (allVaults, allUserVaults, allSynthetics, allAssetPrice) => {
    let totalCollatera = 0
    let totalDebt = 0
    Object.values(allUserVaults).forEach(userVault => {
      const currentVault = allVaults[userVault.vault.toString()]
      if (typeof currentVault === 'undefined') {
        return
      }
      const actualPriceCollateral =
        typeof allAssetPrice[currentVault.collateral.toString()] !== 'undefined'
          ? allAssetPrice[currentVault.collateral.toString()]
          : {
              val: new BN(10 ** currentVault.collateralAmount.scale),
              scale: currentVault.collateralAmount.scale
            }
      const actualPriceSynthetic =
        typeof allAssetPrice[currentVault.synthetic.toString()] !== 'undefined'
          ? allAssetPrice[currentVault.synthetic.toString()]
          : {
              val: new BN(10 ** currentVault.mintAmount.scale),
              scale: currentVault.mintAmount.scale
            }
      totalCollatera =
        totalCollatera +
        Number(
          printBN(
            userVault.collateralAmount.val
              .mul(actualPriceCollateral.val)
              .div(new BN(10 ** actualPriceCollateral.scale)),
            currentVault.collateralAmount.scale
          )
        )
      totalDebt =
        totalDebt +
        Number(
          printBN(
            userVault.syntheticAmount.val
              .mul(actualPriceSynthetic.val)
              .div(new BN(10 ** actualPriceSynthetic.scale)),
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

export const getLeverageVaultPairs = createSelector(
  vaults,
  synthetics,
  (allVaults, allSynthetics) => {
    return Object.values(allVaults).filter(
      vault =>
        typeof allSynthetics[vault.synthetic.toString()] !== 'undefined' &&
        typeof allSynthetics[vault.collateral.toString()] !== 'undefined'
    )
  }
)
export default exchangeSelectors
