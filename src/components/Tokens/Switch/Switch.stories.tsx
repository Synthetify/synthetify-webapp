import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Switch from './Switch'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('Tokens/Switch', module)
  .addDecorator(withKnobs)
  .add('switch', () => (
    <div
      style={{ backgroundColor: colors.navy.component, color: colors.white.main, padding: '10px' }}>
      <Switch onChange={action('switch menu')} />
    </div>
  ))
