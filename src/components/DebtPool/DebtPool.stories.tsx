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
        value: 1456,
        color: '#6372BE',
        price: 7445665
      },
      {
        id: 'xETH',
        label: 'xETH',
        value: 2456,
        color: '#40BFA0',
        price: 740345546
      },
      {
        id: 'xSOL',
        label: 'xSOL',
        value: 6544,
        color: '#117098',
        price: 74456
      },
      {
        id: 'xBNB',
        label: 'xBNB',
        value: 2374,
        color: '#BFB655',
        price: 7345
      },
      {
        id: 'xFTT',
        label: 'xFTT',
        value: 3514,
        color: '#1F70CF',
        price: 345
      }
    ]}
  />
))
