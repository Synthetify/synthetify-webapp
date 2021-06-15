import React from 'react'
import { storiesOf } from '@storybook/react'
import FilledButton from './FilledButton'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import HeaderButton from './HeaderButton'
storiesOf('buttons/FilledButton', module)
  .addDecorator(withKnobs)
  .add('black', () => <FilledButton name='Mint' onClick={action('clicked')} />)
  .add('white', () => <FilledButton name='Set to max' onClick={action('clicked')} variant='white'/>)
  .add('header', () => <HeaderButton name='Mainnet' onClick={action('clicked')}/>)
