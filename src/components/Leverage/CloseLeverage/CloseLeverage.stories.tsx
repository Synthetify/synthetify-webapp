import React from 'react'
import { storiesOf } from '@storybook/react'
import { CloseLeverage } from './CloseLeverage'

storiesOf('Leverage', module).add('closeLeverage', () => (
  <CloseLeverage
    open={true}
    handleClose={() => {
      console.log('close')
    }}
    tokenFrom={'xUSD'}
    tokenTo={'xETH'}
    leverage={'2'}
    percent={24}
    amount={'0.004'}
    onChange={() => {
      console.log('onchange')
    }}
    onSubmitButton={() => {
      console.log('onchange')
    }}
    blockButton={false}
  />
))
