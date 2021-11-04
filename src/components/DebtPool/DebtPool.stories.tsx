import React from 'react'
import { storiesOf } from '@storybook/react'
import DebtPool from './DebtPool'
storiesOf('stats/debtPool', module).add('pool', () => (
  <DebtPool
    title='Debt pool'
    subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    data={[
      {
        id: 'xBTC',
        label: 'xBTC',
        color: '#6372BE',
        percent: 27.37,
        debt: {
          amount: 500,
          usdValue: 300.14
        },
        collateral: {
          amount: 600,
          usdValue: 400.14
        },
        value: 100
      },
      {
        id: 'xETH',
        label: 'xETH',
        color: '#40BFA0',
        percent: 9.11,
        debt: {
          amount: 50,
          usdValue: 30.14
        },
        collateral: {
          amount: 40,
          usdValue: 20.14
        },
        value: 10
      },
      {
        id: 'xSOL',
        label: 'xSOL',
        color: '#117098',
        percent: 33.28,
        debt: {
          amount: 5000,
          usdValue: 300.14
        },
        collateral: {
          amount: 6000,
          usdValue: 400.14
        },
        value: 100
      },
      {
        id: 'xBNB',
        label: 'xBNB',
        color: '#BFB655',
        percent: 13.37,
        debt: {
          amount: 200,
          usdValue: 300.14
        },
        collateral: {
          amount: 400,
          usdValue: 500.14
        },
        value: 200
      },
      {
        id: 'xFTT',
        label: 'xFTT',
        color: '#1F70CF',
        percent: 50.04,
        debt: {
          amount: 5000,
          usdValue: 3000.14
        },
        collateral: {
          amount: 6000,
          usdValue: 4000.14
        },
        value: 1000
      }
    ]}
  />
))
