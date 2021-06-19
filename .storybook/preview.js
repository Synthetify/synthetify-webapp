import React from 'react'

import { addDecorator, addParameters } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import { themes } from '@storybook/theming'
import { theme } from '../src/static/theme'
import { StylesProvider } from '@material-ui/core'
addDecorator(muiTheme([theme]))
addDecorator(storyFn => <StylesProvider injectFirst>{storyFn()}</StylesProvider>)
addParameters({
  backgrounds: [
    { name: 'dark', value: '#202020', default: true },
    { name: 'light', value: '#FFFFFF' }
  ],
  options: { theme: themes.dark }
})
