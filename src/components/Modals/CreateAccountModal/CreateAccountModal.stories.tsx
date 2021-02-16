import React from 'react'
import { storiesOf } from '@storybook/react'
import CreateAccount from './CreateAccountModal'
import { withKnobs, boolean } from '@storybook/addon-knobs'

storiesOf('modal/CreateAccount', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    return (
      <CreateAccount
        loading={boolean('loading', false)}
        open
        handleClose={() => {
          console.log('close CreateAccount')
        }}
        onSend={() => {
          console.log('send CreateAccount')
        }}
      />
    )
  })
  .add('success', () => {
    return (
      <CreateAccount
        loading={boolean('loading', false)}
        open
        address='CUTTyQkxPa6HaA1aLWqihmAv9S9ZES38TNXdPvfj8dh3'
        handleClose={() => {
          console.log('close CreateAccount')
        }}
        onSend={() => {
          console.log('send CreateAccount')
        }}
      />
    )
  })
