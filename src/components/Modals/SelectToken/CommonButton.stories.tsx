import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { SelectToken, TokenNameWithIcon } from '@components/Modals/SelectToken/SelectToken'
import { Box } from '@material-ui/core'

const tokens: TokenNameWithIcon[] = [{ name: 'SNY', icon: '@static/icons/sny.png' }]

storiesOf('modals/selectModal', module)
  .addDecorator(withKnobs)
  .add('default', () =>
    <SelectToken open={true} onClose={() => {}}><Box>Test</Box></SelectToken>
  )
