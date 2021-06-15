import React from 'react'
import { storiesOf } from '@storybook/react'
import FilledButton from './FilledButton'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import HeaderButton from './HeaderButton'
import DropdownHeaderButton from './DropdownHeaderButton'
import DropdownMenu from './DropdownMenu'

storiesOf('buttons/FilledButton', module)
  .addDecorator(withKnobs)
  .add('black', () => <FilledButton name='Mint' onClick={action('clicked')} />)
  .add('white', () => (
    <FilledButton name='Set to max' onClick={action('clicked')} variant='white' />
  ))
  .add('headerDefault', () => <HeaderButton name='Mainnet' onClick={action('clicked')} />)
  .add('headerToOverlay', () => (
    <div>
      <DropdownHeaderButton dropdown={<DropdownMenu name='test' />} name='Open Dropdown' classToBlur='blur-at-overlay' />
      <div className='blur-at-overlay'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </div>
    </div>
  ))
