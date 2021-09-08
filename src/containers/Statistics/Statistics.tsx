import React from 'react'
<<<<<<< HEAD
import { ColStatistics } from '@components/Statistics/StatisticCollateral'

export const Statistics: React.FC = () => {
  return (
    <div>
      <ColStatistics />
=======
import { useSelector } from 'react-redux'
import { keySelectors, AnyProps } from './../../store/selectors/helpers'
import { createSelector } from '@reduxjs/toolkit'
import { collateralValue, debtInterestRate } from '@selectors/exchange'
import { IExchange, exchangeSliceName } from './../../store/reducers/exchange'
import { transformBN, printBN } from '@consts/utils'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'

const store = (s: AnyProps) => s[exchangeSliceName] as IExchange

export const {
  assets,
  synthetics,
  collaterals,
  mintAuthority,
  swap,
  state,
  exchangeAccount
} = keySelectors(store, [
  'assets',
  'synthetics',
  'collaterals',
  'mintAuthority',
  'swap',
  'state',
  'exchangeAccount'
])

export const getCollateral = createSelector(
  exchangeAccount,
  collaterals,
  assets, (account, allColaterals, assets) => {
    if (account.address.equals(DEFAULT_PUBLICKEY)) {
      return new BN(0)
    }

    let val: BN = new BN(0)
  }
)

export const Statistics: React.FC = () => {

  return (
    <div>
>>>>>>> dev
    </div>
  )
}
