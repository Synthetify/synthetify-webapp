import React from 'react'
import { storiesOf } from '@storybook/react'
import NavbarButton from './Button'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('navbar/button', module)
  .addDecorator(withKnobs)
  .add('button', () => <NavbarButton name='Staking' onClick={action('clicked')} />)
