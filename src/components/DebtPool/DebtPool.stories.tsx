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
          amount: 500,
          usdValue: 300.14
        },
        collateral: {
          amount: 600,
          usdValue: 400.14
        }
      },
      {
        id: 'xETH',
        label: 'xETH',
        color: '#40BFA0',
        debt: {
          amount: 50,
          usdValue: 30.14
        },
        collateral: {
          amount: 40,
          usdValue: 20.14
        }
      },
      {
        id: 'xSOL',
        label: 'xSOL',
        color: '#117098',
        debt: {
          amount: 5000,
          usdValue: 300.14
        },
        collateral: {
          amount: 6000,
          usdValue: 400.14
        }
      },
      {
        id: 'xBNB',
        label: 'xBNB',
        color: '#BFB655',
        debt: {
          amount: 200,
          usdValue: 300.14
        },
        collateral: {
          amount: 400,
          usdValue: 500.14
        }
      },
      {
        id: 'xFTT',
        label: 'xFTT',
        color: '#1F70CF',
        debt: {
          amount: 5000,
          usdValue: 3000.14
        },
        collateral: {
          amount: 6000,
          usdValue: 4000.14
        }
      }
    ]}
  />
))
