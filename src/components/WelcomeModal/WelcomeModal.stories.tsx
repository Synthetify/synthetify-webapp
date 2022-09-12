import { storiesOf } from '@storybook/react'
import React from 'react'
import WelcomeModal from './WelcomeModal'

storiesOf('modal/welcomeModal', module).add('welcomeModal', () => (
  <WelcomeModal open={false} handleClose={function (value: boolean): void {}} />
))
