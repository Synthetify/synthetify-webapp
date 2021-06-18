// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SwitchMenu from '@components/SwitchMenu/SwitchMenu'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import ActionMenu from '@components/SwitchMenu/ActionMenu'

storiesOf('menu/switchMenu', module)
  .addDecorator(withKnobs)
  .add('Max width', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
      <SwitchMenu items={['Option1', 'Option2', 'Option3']} onChange={action('switch menu')} />
    </div>
  ))
  .add('Actions', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
      <ActionMenu onChange={action('change action')} />
    </div>
  ))
