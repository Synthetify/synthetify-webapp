import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { action } from '@storybook/addon-actions'

storiesOf('redesign/OutlinedButton', module)
  .addDecorator(withKnobs)
  .add('black', () => <OutlinedButton name='Mint' onClick={action('clicked')} />)
