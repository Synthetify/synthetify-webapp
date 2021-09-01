import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StatsCard from './StatsCard'

storiesOf('stats/Card', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30 }}>
      <StatsCard name='Volument' value='1000.00' />
    </div>
  ))
