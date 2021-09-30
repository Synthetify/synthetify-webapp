import React from 'react'
import { storiesOf } from '@storybook/react'
import LegendDebtPool from './LegendDebtPool'

storiesOf('stats/debtPool', module).add('legend', () => (
  <LegendDebtPool
    data={[
      {
        id: 'xBTC',
        label: 'xBTC',
        value: 1456,
        color: '#6372BE',
        price: 7445665,
        percent: 8
      },
      {
        id: 'xETH',
        label: 'xETH',
        value: 2456,
        color: '#40BFA0',
        price: 740345546,
        percent: 8
      },
      {
        id: 'xSOL',
        label: 'xSOL',
        value: 6544,
        color: '#117098',
        price: 74456,
        percent: 8
      },
      {
        id: 'xBNB',
        label: 'xBNB',
        value: 2374,
        color: '#BFB655',
        price: 7345,
        percent: 8
      },
      {
        id: 'xFTT',
        label: 'xFTT',
        value: 3514,
        color: '#1F70CF',
        price: 345,
        percent: 8
      }
    ]}
  />
))
