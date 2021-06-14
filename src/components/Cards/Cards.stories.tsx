import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import ValueCard from './ValueCard'

storiesOf('cards/Value', module)
  .addDecorator(withKnobs)
  .add('default', () => <ValueCard name='Read litepaper' onClick={action('clicked')} />)
