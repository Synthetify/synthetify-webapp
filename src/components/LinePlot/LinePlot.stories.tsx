import React from 'react'
import { storiesOf } from '@storybook/react'
import LinePlot from './LinePlot'
import { data } from '../LinePlotContainer/mockData'

storiesOf('stats/topplot', module).add('line', () => <LinePlot data={data[0]} />)
