import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { StatisticsCard } from './StatisticsCard'
import { StatisticCardAll } from './StatisticCardAll'
storiesOf('cards/Statistics', module)
  .addDecorator(withKnobs)
  .add('Collateral', () => (
    <div style={{ height: 184, width: 636 }}>
      <StatisticsCard
        name='Collateral'
        value={23450456}
        desc={
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos iure sit doloremque rem nulla fuga optio dolor sunt eligendi culpa.'
        }
      />
    </div>
  ))
  .add('Volume', () => (
    <div style={{ height: 184, width: 636 }}>
      <StatisticsCard
        name='Volume'
        value={23450456}
        desc={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac tellus sed sapien. '
        }
      />
    </div>
  ))
  .add('Mint', () => (
    <div style={{ height: 184, width: 636 }}>
      <StatisticsCard name='Mint' value={450000} desc={'Lorem ipsum dolor sit amet.'} />
    </div>
  ))
  .add('Debt', () => (
    <div style={{ height: 184, width: 636 }}>
      <StatisticsCard
        name='Debt'
        value={24456000}
        desc={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
      />
    </div>
  ))
  .add('Fee', () => (
    <div style={{ height: 184, width: 636 }}>
      <StatisticsCard name='Fee' value={450000} desc={'Lorem ipsum dolor sit amet.'} />
    </div>
  ))

storiesOf('cards/StatisticsAll', module).add('Container', () => (
  <div style={{ background: '#0C0D2C', width: '100%', margin: '0 auto' }}>
    <StatisticCardAll
      data={{
        volume: 0,
        mint: 0,
        fee: 0
      }}
      debtCurrent={[{
        id: 'default',
        value: 1,
        price: 1
      }]}
      collateralValue={100}
    />
  </div>
))
