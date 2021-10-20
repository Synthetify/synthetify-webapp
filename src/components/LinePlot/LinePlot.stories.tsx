import React from 'react'
import { storiesOf } from '@storybook/react'
import LinePlot from './LinePlot'
const setTimeAction = (index: number, serieId: string, timestamp: number, value: number) => {
  console.log(index, serieId, timestamp, value)
}
const fillData = () => {
  const tmp: Array<{ x: number; y: number }> = []
  for (let i = 1624518498300; i < 1624518498300 + 200; i++) {
    tmp.push({ x: i, y: i % 100 })
  }
  return tmp
}
storiesOf('stats/topplot', module).add('line', () => (
  <LinePlot
    data={{
      id: 'default',
      data: fillData()
    }}
    sign={'$'}
    setTimeActive={setTimeAction}
  />
))
