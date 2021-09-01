import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import data from './mockData/exampleDataChart.json'
import LineChart from './LineChart'

storiesOf('stats/visualization/LineChart', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 0, height:350 }}>
      <LineChart activeStat={'default'} data={data}/>
    </div>
  ))
