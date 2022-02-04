import React from 'react'
import { storiesOf } from '@storybook/react'
import DebtPoolLegendTable from './DebtPoolLegendTable'

storiesOf('stats/debtPoolLegendTable', module).add('legend', () => (
  <DebtPoolLegendTable
    data={[
      {
        id: 'xBTC',
        label: 'xBTC',
        color: '#6372BE',
        percent: 0.01,
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
        percent: 0.01,
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
        percent: 18.97,
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
        percent: 0.01,
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
        percent: 80,
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
