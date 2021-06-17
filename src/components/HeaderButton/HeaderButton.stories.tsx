import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import HeaderButton from './HeaderButton'
import DropdownHeaderButton from './DropdownHeaderButton'
import { toBlur } from '@consts/uiUtils'

storiesOf('buttons/HeaderButton', module)
  .addDecorator(withKnobs)
  .add('headerDefault', () => <HeaderButton name='Mainnet' onClick={action('clicked')} />)
  .add('headerToOverlay', () => (
    <div>
      <DropdownHeaderButton name='Open Dropdown'/>
      <br/>
      <div id={toBlur} style={{ color: '#00F9BB' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </div>
    </div>
  ))
