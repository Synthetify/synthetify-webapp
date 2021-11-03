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
          amount: 6,
          usdValue: 4.14
        }
      },
      {
        id: 'xSOL',
        label: 'xSOL',
        color: '#117098',
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
        id: 'xBNB',
        label: 'xBNB',
        color: '#BFB655',
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
        id: 'xFTT',
        label: 'xFTT',
        color: '#1F70CF',
        debt: {
          amount: 5,
          usdValue: 3.14
        },
        collateral: {
          amount: 6,
          usdValue: 4.14
        }
      }
    ]}
  />
))
