import React from 'react'
import { storiesOf } from '@storybook/react'
import CopyToolTip from './CopyToolTip'
import { withKnobs } from '@storybook/addon-knobs'
import { Typography } from '@material-ui/core'
storiesOf('tooltip/Copy', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <CopyToolTip text='Text to copy'>
      <Typography variant='body2'> Hello</Typography>
    </CopyToolTip>
  ))
