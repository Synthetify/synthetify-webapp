import React from 'react'
import { storiesOf } from '@storybook/react'
import { SwitchButton } from './SwitchButton'

storiesOf('Leverage', module).add('switch button', () => (
  <SwitchButton
    setLeverStatus={(val: boolean) => {
      console.log('status', val)
    }}
    firstOption={'first'}
    secondOption={'second'}
  />
))
