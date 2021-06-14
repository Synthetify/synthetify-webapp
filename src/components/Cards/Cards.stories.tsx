import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ValueCard from './ValueCard'

storiesOf('cards/Value', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: '#0E0C12', padding: '50px' }}>
      <ValueCard name='Staked Value' value='100.00$' />
    </div>
  ))
