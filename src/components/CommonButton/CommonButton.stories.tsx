import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import MaxButton from './MaxButton'
import { colors } from '@static/theme'
storiesOf('buttons/CommonButton', module)
  .addDecorator(withKnobs)
  .add('maxButton', () => (
    <div style={{ backgroundColor: colors.gray.component, padding: '10px' }}>
      <MaxButton onClick={action('clicked')} />
    </div>
  ))
