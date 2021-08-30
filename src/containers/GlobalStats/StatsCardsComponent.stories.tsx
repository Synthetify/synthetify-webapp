import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import StatsCardsComponent from './StatsCardsComponent'

storiesOf('ui/StatsCardsComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30 }}>
      <StatsCardsComponent />
    </div>
  ))
