import React from 'react'
import { storiesOf } from '@storybook/react'
import LinePlotContainer from './LinePlotContainer'
let menuOption: string = 'Value'
const setMenuOption = (value: string) => {
  menuOption = value
}
const setTimeAction = (index: number, serieId: string, timestamp: number, value: number) => {
  console.log(index, serieId, timestamp, value)
}
storiesOf('stats/topplotcontainer', module).add('line', () => (
  <LinePlotContainer
    data={data}
    infoData={{ name: 'Volume', value: 1000, percent: '20' }}
    menuOption={menuOption}
    setMenuOption={setMenuOption}
    setTimeActive={setTimeAction}
  />
))
const data = [
  {
    id: 'default',
    points: [
      {
        x: 11630913611000,
        y: 140
      },
      {
        x: 1630913621000,
        y: 210
      },
      {
        x: 1630913631000,
        y: 230
      },
      {
        x: 1630913641000,
        y: 240
      },
      {
        x: 1630913651300,
        y: 187
      },
      {
        x: 1630820060000,
        y: 167
      },
      {
        x: 163082006000,
        y: 107
      },
      {
        x: 1630820062000,
        y: 107
      },
      {
        x: 1630820063000,
        y: 80
      },
      {
        x: 1630820064000,
        y: 200
      },
      {
        x: 1629005661000,
        y: 157
      },
      {
        x: 1629005662003,
        y: 50
      },
      {
        x: 1629005663000,
        y: 181
      }
    ]
  },
  {
    id: 'volume',
    points: [
      {
        x: 11630913611000,
        y: 140
      },
      {
        x: 1630913621000,
        y: 210
      },
      {
        x: 1630913631000,
        y: 230
      },
      {
        x: 1630913641000,
        y: 240
      },
      {
        x: 1630913651300,
        y: 187
      },
      {
        x: 1630820060000,
        y: 167
      },
      {
        x: 163082006000,
        y: 107
      },
      {
        x: 1630820062000,
        y: 107
      },
      {
        x: 1630820063000,
        y: 80
      },
      {
        x: 1630820064000,
        y: 200
      },
      {
        x: 1629005661000,
        y: 157
      },
      {
        x: 1629005662003,
        y: 50
      },
      {
        x: 1629005663000,
        y: 181
      }
    ]
  },
  {
    id: 'mint',
    points: [
      {
        x: 11630913611000,
        y: 140
      },
      {
        x: 1630913621000,
        y: 210
      },
      {
        x: 1630913631000,
        y: 230
      },
      {
        x: 1630913641000,
        y: 240
      },
      {
        x: 1630913651300,
        y: 187
      },
      {
        x: 1630913661000,
        y: 167
      },
      {
        x: 1630913671000,
        y: 107
      },
      {
        x: 1630913681000,
        y: 107
      },
      {
        x: 1630913691000,
        y: 80
      },
      {
        x: 1630913771000,
        y: 200
      },
      {
        x: 1630913871000,
        y: 157
      },
      {
        x: 1630913971003,
        y: 50
      },
      {
        x: 1630913911000,
        y: 181
      }
    ]
  },
  {
    id: 'burn',
    points: [
      { x: 1624518498300, y: 0 },
      { x: 1627110498000, y: 0 },
      { x: 1631782783000, y: 42468.09 },
      { x: 1631785499000, y: 42468.09 },
      { x: 1631786772000, y: 42468.09 },
      { x: 1632229806000, y: 48840.3 },
      { x: 1632300034000, y: 48840.3 },
      { x: 1632394957000, y: 48840.3 }
    ]
  },
  {
    id: 'userCount',
    points: [
      {
        x: 11630913611000,
        y: 140
      },
      {
        x: 1630913621000,
        y: 210
      },
      {
        x: 1630913631000,
        y: 230
      },
      {
        x: 1630913641000,
        y: 240
      },
      {
        x: 1630913651300,
        y: 187
      },
      {
        x: 1630820060000,
        y: 167
      },
      {
        x: 163082006000,
        y: 107
      },
      {
        x: 1630820062000,
        y: 107
      },
      {
        x: 1630820063000,
        y: 80
      },
      {
        x: 1630820064000,
        y: 200
      },
      {
        x: 1629005661000,
        y: 157
      },
      {
        x: 1629005662003,
        y: 50
      },
      {
        x: 1629005663000,
        y: 181
      }
    ]
  }
]
