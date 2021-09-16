import React from 'react'
import { storiesOf } from '@storybook/react'
import DebtPool from './DebtPool'
import { data } from '@containers/DebtPoolContainer/mockData'
import { Provider } from 'react-redux'
import { store } from '@store/index'

storiesOf('stats/debtPool', module)
  .addDecorator((Story) => <Provider store={store}>{<Story />}</Provider>)
  .add('pool', () => (
    <DebtPool
      title='Debt pool'
      subTitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      data={data}
    />
  ))
