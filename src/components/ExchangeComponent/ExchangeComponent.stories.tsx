import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ExchangeComponent from './ExchangeComponent'

storiesOf('ui/exchangeComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30, paddingTop: 90 }}>
      <ExchangeComponent />
    </div>
  ))
