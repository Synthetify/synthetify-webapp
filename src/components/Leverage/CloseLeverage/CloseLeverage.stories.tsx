import React from 'react'
import { storiesOf } from '@storybook/react'
import { CloseLeverage } from './CloseLeverage'
import { BN } from '@project-serum/anchor'

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
    amount={{ val: new BN(1000000), scale: 6 }}
    onChange={() => {
      console.log('onchange')
    }}
    onSubmitButton={() => {
      console.log('onchange')
    }}
    blockButton={false}
  />
))
