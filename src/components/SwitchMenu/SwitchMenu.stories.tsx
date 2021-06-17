// eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SwitchMenu from '@components/SwitchMenu/SwitchMenu'
import { action } from '@storybook/addon-actions'

storiesOf('menu/switchMenu', module)
  .addDecorator(withKnobs)
  .add('operations', () => (
    <SwitchMenu
      items={['Mint', 'Deposit', 'Withdraw', 'Burn', 'Rewards']}
      maxWidth={800}
      onChange={action('switch menu')}
    />
  ))
