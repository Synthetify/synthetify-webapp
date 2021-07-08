import React from 'react'
import { storiesOf } from '@storybook/react'
import RewardsTab from '@components/WrappedActionMenu/RewardsTab/RewardsTab'
import { colors } from '@static/theme'

storiesOf('WrappedActionMenu/RewardsTab', module).add('rewards tab', () => (
  <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
    <RewardsTab />
  </div>
))
