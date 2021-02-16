import React from 'react'
import { storiesOf } from '@storybook/react'
import SendMoneyModal from './SendMoneyModal'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { BN } from '@project-serum/anchor'

storiesOf('modal/SendMoneyModal', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    return (
      <SendMoneyModal
        loading={boolean('loading', false)}
        open
        handleClose={() => {
          console.log('close SendMoneyModal')
        }}
        onSend={() => {
          console.log('send SendMoneyModal')
        }}
        balance={new BN(123)}
      />
    )
  })
  .add('success', () => {
    return (
      <SendMoneyModal
        loading={boolean('loading', false)}
        open
        txid='CUTTyQkxPa6HaA1aLWqihmAv9S9ZES38TNXdPvfj8dh3'
        handleClose={() => {
          console.log('close SendMoneyModal')
        }}
        onSend={() => {
          console.log('send SendMoneyModal')
        }}
        balance={new BN(123)}
      />
    )
  })
