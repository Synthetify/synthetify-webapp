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
        debt: {
          amount: 5,
          usdValue: 3.14
        },
        collateral: {
          amount: 6,
          usdValue: 4.14
        }
      },
      {
        id: 'xETH',
        label: 'xETH',
        color: '#40BFA0',
        debt: {
          amount: 5,
          usdValue: 3.14
        },
        collateral: {
          amount: 4,
          usdValue: 2.14
        }
      },
      {
        id: 'xSOL',
        label: 'xSOL',
        color: '#117098',
        debt: {
          amount: 500000,
          usdValue: 30000.14
        },
        collateral: {
          amount: 60000,
          usdValue: 40000.14
        }
      },
      {
        id: 'xBNB',
        label: 'xBNB',
        color: '#BFB655',
        debt: {
          amount: 5,
          usdValue: 3.14
        },
        collateral: {
          amount: 4,
          usdValue: 2.14
        }
      },
      {
        id: 'xFTT',
        label: 'xFTT',
        color: '#1F70CF',
        debt: {
          amount: 50000000,
          usdValue: 30000000.14
        },
        collateral: {
          amount: 60000000,
          usdValue: 40000000.14
        }
      }
    ]}
  />
))
