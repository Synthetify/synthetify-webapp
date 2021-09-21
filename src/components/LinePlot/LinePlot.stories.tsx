import React from 'react'
import { storiesOf } from '@storybook/react'
import LinePlot from './LinePlot'

storiesOf('stats/topplot', module).add('line', () => (
  <LinePlot
    data={{
      id: 'default',
      data: [
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ]
    }}
  />
))
