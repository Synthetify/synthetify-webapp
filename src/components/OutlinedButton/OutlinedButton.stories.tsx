import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { action } from '@storybook/addon-actions'

storiesOf('buttons/OutlinedButton', module)
  .addDecorator(withKnobs)
  .add('primary-enable', () => (
    <OutlinedButton name='Mint' color='primary' onClick={action('clicked')} />
  ))
  .add('secondary-enable', () => (
    <OutlinedButton name='Mint' color='secondary' onClick={action('clicked')} />
  ))
  .add('primary-disable', () => (
    <OutlinedButton name='Mint' disabled={true} color='primary' onClick={action('clicked')} />
  ))
  .add('secondary-disable', () => (
    <OutlinedButton name='Mint' disabled={true} color='secondary' onClick={action('clicked')} />
  ))
