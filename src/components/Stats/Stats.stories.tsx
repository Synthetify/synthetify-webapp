import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Stats from '@components/Stats/Stats'

storiesOf('Stats', module)
  .addDecorator(withKnobs)
  .add('plain', () => <Stats/>)
