import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { action } from '@storybook/addon-actions'

storiesOf('WrappedActionMenu/ActionContent', module).add('{template}', () => (
  <div style={{ maxWidth: 800 }}>
    <ActionTemplate action='{template}' onClick={action('{template}')} />
  </div>
))
