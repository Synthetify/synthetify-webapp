import React from 'react'
import { storiesOf } from '@storybook/react'
import CommonButton from './CommonButton'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('buttons/CommonButton', module)
  .addDecorator(withKnobs)
  .add('default', () => <CommonButton name='Read litepaper' onClick={action('clicked')} />)
