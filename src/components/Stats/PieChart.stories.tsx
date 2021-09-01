import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import data from './mockData/exampleDataPie.json'
import PieChart from './PieChart'

storiesOf('stats/visualization/PieChart', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ background: '#1B1C2A', padding: 0, height:350 }}>
      <PieChart data={data}/>
    </div>
  ))
