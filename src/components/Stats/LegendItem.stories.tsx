import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import LegendItem from './LegendItem'

storiesOf('stats/LegendItem', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30 }}>
      <LegendItem
        name='Variant'
        color='#ff0000'
      />
    </div>
  ))
  .add('withValue', () => (
    <div style={{ background: '#1B1C2A', padding: 30}}>
      <LegendItem
        name='Variant'
        percentage={28}
        price={25562}
        color='#ff0000'
      />
    </div>
  ))
