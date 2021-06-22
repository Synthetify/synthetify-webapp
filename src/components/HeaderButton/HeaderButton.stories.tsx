import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import HeaderButton from './HeaderButton'
import DropdownHeaderButton from './DropdownHeaderButton'
import { toBlur } from '@consts/uiUtils'
import { Typography } from '@material-ui/core'
import { colors } from '@static/theme'

storiesOf('buttons/HeaderButton', module)
  .addDecorator(withKnobs)
  .add('headerDefault', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <HeaderButton name='Mainnet' onClick={(chosen: string) => action(`chosen: ${chosen}`)} />
    </div>
  ))
  .add('headerToOverlay', () => (
    <div style={{ backgroundColor: colors.black.header, padding: '100px' }}>
      <DropdownHeaderButton name='Open Dropdown' />
      <br />
      <div id={toBlur} style={{ color: '#00F9BB' }}>
        <Typography variant='body2'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </div>
    </div>
  ))
