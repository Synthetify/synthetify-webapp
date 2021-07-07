import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ValueCard from './ValueCard'

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
