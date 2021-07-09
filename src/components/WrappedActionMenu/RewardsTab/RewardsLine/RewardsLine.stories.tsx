import React from 'react'
import { storiesOf } from '@storybook/react'
import { colors } from '@static/theme'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/RewardsTab', module).add('rewards line', () => (
  <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
    <RewardsLine
      name='Amount per round'
      points={new BN(1e8)}
      hint='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet varius orci.'
      bottomHint='Time remaining: 10:10:10'
    />
  </div>
))
