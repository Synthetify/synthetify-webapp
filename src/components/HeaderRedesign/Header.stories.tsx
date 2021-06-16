import React from 'react'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { storiesOf } from '@storybook/react'

import Header from './Header'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf('ui/HeaderRedesign', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Header address={DEFAULT_PUBLICKEY.toString()} />
  })
  .add('connected', () => {
    return <Header address='B6D50000474B' typeOfWallet='phantom'/>
  })
