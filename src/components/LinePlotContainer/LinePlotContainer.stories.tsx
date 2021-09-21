import React from 'react'
import { storiesOf } from '@storybook/react'
import LinePlotContainer from './LinePlotContainer'

storiesOf('stats/topplotcontainer', module).add('line', () => (
  <LinePlotContainer
    data={[
      {
        id: 'default',
        points: [
          { x: 0, y: 1 },
          { x: 1, y: 1 }
        ]
      }
    ]}
  />
))
