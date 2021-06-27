import React from 'react'
import { storiesOf } from '@storybook/react'
import AmountInput from './AmountInput'
import AmountInputWithLabel from './AmountInputWithLabel'

import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'

storiesOf('inputs/amount', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
      <AmountInput currency={'xUSD'} />
    </div>
  ))
  .add('labeled', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '30px' }}>
      <AmountInputWithLabel currency={'xUSD'} />
    </div>
  ))
