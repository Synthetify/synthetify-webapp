import React from 'react'
import { storiesOf } from '@storybook/react'
import LegendDeptPool from './LegendDeptPool'

export interface Data {
    id: string
    label: string
    value: number
    color: string
    price: number
}

storiesOf('stats/deptPool', module)
.add('legend', ()=>(
    <LegendDeptPool 
    name='Dept pool' 
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam diam, suscipit vitae bibendum vitae, dapibus vitae massa.'
    data = { data }/>
    ))