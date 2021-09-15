import React from 'react'
import { storiesOf } from '@storybook/react'
import { colors } from '@static/theme'
import { RewardsLine } from '@components/WrappedActionMenu/RewardsTab/RewardsLine/RewardsLine'
import Rewards1 from '@static/svg/rewards1.svg'
import BN from 'bn.js'

import { Provider } from 'react-redux'
import { store } from '../../../../store/index'

const loremHint =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet varius orci.'

storiesOf('WrappedActionMenu/RewardsTab', module)
.addDecorator((Story) => <Provider store={store}>{<Story />}</Provider>)
  .add('amount per round line', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <RewardsLine
        name='Amount per round'
        nonBracket='points'
        nonBracketValue={new BN(1e8)}
        hint={loremHint}
        timeRemainingEndSlot={new BN(1e7)}
        slot={1e7 - 300}
        icon={Rewards1}
        tooltipPlacement={'left'}
      />
    </div>
  ))
  .add('current round line', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <RewardsLine
        name='Current round'
        nonBracket='points'
        bracket='SNY'
        nonBracketValue={new BN(14 * 1e5)}
        bracketValue={new BN(28 * 1e5)}
        hint={loremHint}
        timeRemainingEndSlot={new BN(1e7)}
        slot={1e7 - 300}
        icon={Rewards1}
        tooltipPlacement={'left'}
      />
    </div>
  )
  )
