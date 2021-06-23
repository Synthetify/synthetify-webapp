import { storiesOf } from '@storybook/react'
import WrappedActionMenu from '@components/WrappedActionMenu/WrappedActionMenu'
import React from 'react'
import { colors } from '@static/theme'

storiesOf('WrappedActionMenu', module).add('mint mock', () => (
  <div style={{ backgroundColor: colors.gray.background, padding: '10px' }}>
    <WrappedActionMenu maxWidth={850} />
  </div>
))
