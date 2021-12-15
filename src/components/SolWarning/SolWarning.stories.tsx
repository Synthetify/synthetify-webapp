import React from 'react'
import { storiesOf } from '@storybook/react'
import { SolWarning } from './SolWarning'

storiesOf('modals/SolWarning', module)
  .add('main', () => (
    <SolWarning open={true}/>
  ))
