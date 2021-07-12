import React from 'react'
import { storiesOf } from '@storybook/react'
import { colors } from '@static/theme'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import BN from 'bn.js'

const loremHint =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet varius orci.'

storiesOf('WrappedActionMenu/RewardsTab', module)
  .add('amount per round line', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
      <RewardsLine
        name='Amount per round'
        nonBracket='points'
        nonBracketValue={new BN(1e8)}
        hint={loremHint}
        bottomHint='Time remaining: 10:10:10'
      />
    </div>
  ))
  .add('current round line', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
      <RewardsLine
        name='Current round'
        nonBracket='points'
        bracket={'SNY'}
        nonBracketValue={new BN(14 * 1e5)}
        bracketValue={new BN(28 * 1e5)}
        hint={loremHint}
      />
    </div>
  ))
