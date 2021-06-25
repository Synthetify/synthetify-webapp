import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'

storiesOf('WrappedActionMenu/ActionContent', module).add('{template}', () => (
  <div style={{ maxWidth: 800, backgroundColor: colors.gray.component, padding: '30px' }}>
    <ActionTemplate action='{template}' onClick={action('{template}')} />
  </div>
))
