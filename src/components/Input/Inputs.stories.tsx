import React from 'react'
import { storiesOf } from '@storybook/react'
import AmountInput from './AmountInput'
import AmountInputWithLabel from './AmountInputWithLabel'

import { withKnobs } from '@storybook/addon-knobs'

storiesOf('inputs/amount', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: '#1E1B23', padding: '10px' }}>
      <AmountInput setValue={(value: string) => value} currency={'xUSD'} />
    </div>
  ))
  .add('labeled', () => (
    <div style={{ backgroundColor: '#1E1B23', padding: '30px' }}>
      <AmountInputWithLabel setValue={(value: string) => value} currency={'xUSD'} />
    </div>
  ))
