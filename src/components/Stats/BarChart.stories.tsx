import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import data from './mockData/exampleDataBar.json'
import BarChart from './BarChart'

storiesOf('stats/visualization/BarChart', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 0, height:100 }}>
      <BarChart data={data}/>
    </div>
  ))
