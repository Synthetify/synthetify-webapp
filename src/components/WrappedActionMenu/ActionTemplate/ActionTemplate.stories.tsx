import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionTemplate from '@components/WrappedActionMenu/ActionTemplate/ActionTemplate'
import { action } from '@storybook/addon-actions'
import { colors } from '@static/theme'
import BN from 'bn.js'

storiesOf('WrappedActionMenu/ActionContent', module).add('{template}', () => (
  <div style={{ maxWidth: 800, backgroundColor: colors.gray.component, padding: '30px' }}>
    <ActionTemplate
      action='{template}'
      maxAvailable={new BN(101_999_999)}
      maxDecimal={6}
      onClick={(_amount: BN, _decimal: number) => action('{template}')}
      currency='xUSD'
      sending={false}
      hasError={false}
    />
  </div>
))
