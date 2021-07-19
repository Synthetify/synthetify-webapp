import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ValueCard from './ValueCard'
import ProgressCard from './ProgressCard'

storiesOf('cards/Value', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30, paddingTop: 90 }}>
      <ValueCard
        name='Staked Value'
        hint='Amount of money you’ve deciced to keep on your virtual wallet.'
        value='100.00'
        sign='$'
        decimals={2}
      />
    </div>
  ))
  .add('progress', () => (
    <div style={{ background: '#1B1C2A', padding: 30, paddingTop: 90 }}>
      <ProgressCard
        name='Debt status'
        hint='Current value of your debt in comparison to your collateral value and max borrow'
        current={50}
        sign={'$'}
        max={100}
        topIndicator={'Current debt'}
        topIndicatorValue={50}
        bottomIndicator={'Max borrow'}
        bottomIndicatorValue={75}
      />
    </div>
  ))
