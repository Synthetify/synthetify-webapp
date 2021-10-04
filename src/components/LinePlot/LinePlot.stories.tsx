import React from 'react'
import { storiesOf } from '@storybook/react'
import LinePlot from './LinePlot'
const setTimeAction = (index: number, serieId: string, timestamp: number, value: number) => {
  console.log(index, serieId, timestamp, value)
}
storiesOf('stats/topplot', module).add('line', () => (
  <LinePlot
    data={{
      id: 'default',
      data: [
        { x: 1624518498300, y: 0 },
        { x: 1631782783000, y: 42468.09 },
        { x: 1631785499000, y: 42468.09 },
        { x: 1631786772000, y: 42468.09 },
        { x: 1632229806000, y: 48840.3 },
        { x: 1632300034000, y: 48840.3 },
        { x: 1632394957000, y: 48840.3 }
      ]
    }}
    sign={'$'}
    setTimeActive={setTimeAction}
  />
))
