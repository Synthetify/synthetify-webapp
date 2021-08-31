import React from 'react'
import { storiesOf } from '@storybook/react'
import DebtPool from './DebtPool'
import { data } from '@containers/DebtPoolContainer/mockData'

storiesOf('stats/debtPool', module).add('pool', () => (
  <DebtPool
    title='Debt pool'
    subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    data={data}
  />
))
