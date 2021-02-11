import React from 'react'
import { storiesOf } from '@storybook/react'
import SynthetifyIconHorizontal from './SynthetifyIconHorizontal'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('Icons/SynthetifyIconHorizontal', module)
  .addDecorator(withKnobs)
  .add('default', () => <SynthetifyIconHorizontal />)
