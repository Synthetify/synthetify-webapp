import React from 'react'
import { storiesOf } from '@storybook/react'
import AmountWithMaxInput from './AmountWithMaxInput'
import { withKnobs } from '@storybook/addon-knobs'
import { colors } from '@static/theme'

storiesOf('inputs/amountWithMaxButton', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ backgroundColor: colors.navy.component, padding: '10px' }}>
      <AmountWithMaxInput setValue={() => {}} placeholder={'0.0'} onMaxClick={() => {}} />
    </div>
  ))
