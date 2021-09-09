import React from 'react'
import { storiesOf } from '@storybook/react'
import { StatsCollateralChart, CoinToChart } from '@components/Stats/StatsCollateralChart/StatsCollateral'

const large: CoinToChart[] = [
  {
    name: 'xBTC',
    percent: '20',
    color: '#6372BE'
  },
  {
    name: 'xETH',
    percent: '15',
    color: '#40BFA0'
  },
  {
    name: 'xSOL',
    percent: '10',
    color: '#117098'
  },
  {
    name: 'xBNB',
    percent: '7',
    color: '#BFB665'
  },

  {
    name: 'xFTT',
    percent: '6.8',
    color: '#1F70CF'
  },
  {
    name: 'xUSD',
    percent: '5',
    color: '#936BC7'
  },
  {
    name: 'xSRM',
    percent: '5',
    color: '#39D3F5'
  },
  {
    name: 'xLTC',
    percent: '4.5',
    color: '#DADCF1'
  },
  {
    name: 'xAAVE',
    percent: '3.3',
    color: '#C76BA2'
  },
  {
    name: 'xDOGE',
    percent: '2.9',
    color: '#D49347'
  },
  {
    name: 'xLUNA',
    percent: '2.2',
    color: '#DF3C3C'
  }
]

const medium: CoinToChart[] = [
  {
    name: 'xBTC',
    percent: '40',
    color: '#6372BE'
  },
  {
    name: 'xETH',
    percent: '25',
    color: '#40BFA0'
  },
  {
    name: 'xSOL',
    percent: '21',
    color: '#117098'
  },
  {
    name: 'xBNB',
    percent: '10',
    color: '#BFB665'
  },

  {
    name: 'xFTT',
    percent: '4',
    color: '#1F70CF'
  }
]

const small: CoinToChart[] = [
  {
    name: 'xBTC',
    percent: '70',
    color: '#6372BE'
  },
  {
    name: 'xETH',
    percent: '20',
    color: '#40BFA0'
  },
  {
    name: 'xSOL',
    percent: '10',
    color: '#117098'
  }
]

storiesOf('StatsCollateral', module)
  .add('large', () => (
    <StatsCollateralChart data={large}/>
  ))
  .add('medium', () => (
    <StatsCollateralChart data={medium}/>
  ))

  .add('small', () => (
    <StatsCollateralChart data={small}/>
  ))
