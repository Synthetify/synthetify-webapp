import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import DebtPoolComponent from './DebtPoolComponent'

storiesOf('ui/DebtPoolComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 30 }}>
      <DebtPoolComponent />
    </div>
  ))
