import React from 'react'
import { storiesOf } from '@storybook/react'
import DeptPool from './DeptPool'

export interface Data {
    id: string
    label: string
    value: number
    color: string
    price: number
}

storiesOf('stats/deptPool', module)
.add('pool', ()=>(
    <DeptPool 
    name='Dept pool' 
    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quam diam, suscipit vitae bibendum vitae, dapibus vitae massa.'
    data = { data }/>
    ))


const data:Data[] = [{
    id: 'xBTC',
    label: 'xBTC',
    value: 1456,
    color: '#6372BE',
    price: 74000
  },
  {
    id: 'xETH',
    label: 'xETH',
    value: 2456,
    color: '#40BFA0',
    price: 74000
  },
  {
    id: 'xSOL',
    label: 'xSOL',
    value: 6544,
    color: '#117098',
    price: 7400
  },
  {
    id: 'xBNB',
    label: 'xBNB',
    value: 2374,
    color: '#BFB665',
    price: 740
  },
  {
    id: 'xFTT',
    label: 'xFTT',
    value: 3514,
    color: '#1F70CF',
    price: 74
  },
  {
    id: 'xUSD',
    label: 'xUSD',
    value: 2353,
    color: '#936BC7',
    price: 7.4
  },
  {
    id: 'xSRM',
    label: 'xSRM',
    value: 3450,
    color: '#39D3F5',
    price: 0.74
  },
  {
    id: 'xLTC',
    label: 'xLTC',
    value: 5670,
    color: '#DADCF1',
    price: 0.47
  },
  {
    id: 'xAAVE',
    label: 'xAAVE',
    value: 4565,
    color: '#C76BA2',
    price: 4.7
  },
  {
    id: 'xDOGE',
    label: 'xDOGE',
    value: 6545,
    color: '#D49347',
    price: 47
  },
  {
    id: 'xLUNA',
    label: 'xLUNA',
    value: 3756,
    color: '#DF3C3C',
    price: 470
  }]