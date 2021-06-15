import React from 'react'
import { storiesOf } from '@storybook/react'
import FilledButton from './FilledButton'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import HeaderButton from './HeaderButton'
import DropdownHeaderButton from './DropdownHeaderButton'

storiesOf('buttons/FilledButton', module)
  .addDecorator(withKnobs)
  .add('black', () => <FilledButton name='Mint' onClick={action('clicked')} />)
  .add('white', () => (
    <FilledButton name='Set to max' onClick={action('clicked')} variant='white' />
  ))
  .add('headerDefault', () => <HeaderButton name='Mainnet' onClick={action('clicked')} />)
  .add('headerToOverlay', () => (
    <div>
      <DropdownHeaderButton name='Open Dropdown' classToBlur='blur-at-overlay' />
      <div className='blur-at-overlay'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has

      </div>
    </div>
  ))
