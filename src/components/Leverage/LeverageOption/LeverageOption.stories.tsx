import React from 'react'
import { storiesOf } from '@storybook/react'
import { LeverageOption } from './LeverageOption'

storiesOf('Leverage', module).add('leverage option', () => (
  <LeverageOption
    onClickSubmitButton={() => {
      console.log('submit button')
    }}
    onClickResetButton={() => {
      console.log('restart button')
    }}
    minCRatio={200}
    liquidationPriceTo={0.85}
    cRatio={'400'}
    changeCustomCRatio={(value: string) => {
      console.log('value', value)
    }}
    currentLeverage={'1.33'}
    action={'Open'}
    setLeverageStatus={(status: boolean) => {
      console.log('status', status)
    }}
    leverageType={''}
    blockSubmitButton={false}
  />
))
