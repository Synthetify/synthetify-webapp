import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import SwitchMenu, { IMenuItem } from '@components/SwitchMenu/SwitchMenu'
import { action } from '@storybook/addon-actions'
import ActionMenu, { IActionContents } from '@components/SwitchMenu/ActionMenu'
import { colors } from '@static/theme'
import { Grid } from '@material-ui/core'

const exampleItems: IMenuItem = {
  option1: 'Content1',
  option2: 'Content2',
  option3: 'Content3',
  option4: 'Content4',
  option5: 'Content5'
}

const actionContents: IActionContents = {
  mint: 'mint',
  deposit: 'deposit',
  withdraw: 'withdraw',
  burn: 'burn',
  rewards: 'rewards'
}

storiesOf('menu/switchMenu', module)
  .addDecorator(withKnobs)
  .add('Max width', () => (
    <div
      style={{ backgroundColor: colors.gray.component, color: colors.white.main, padding: '10px' }}>
      <SwitchMenu menuItems={exampleItems} onChange={action('switch menu')} />
    </div>
  ))
  .add('Actions', () => (
    <div
      style={{ backgroundColor: colors.gray.component, color: colors.white.main, padding: '10px' }}>
      <Grid style={{ maxWidth: 800 }}>
        <ActionMenu actionContents={actionContents} onChange={action('change action')} />
      </Grid>
    </div>
  ))
