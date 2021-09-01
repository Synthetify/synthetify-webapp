import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ExchangePlot from './ExchangePlot'
import { BN } from '@project-serum/anchor'

storiesOf('ui/exchangePlot', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 500 }}>
      <ExchangePlot
        tokenName='xBTC'
        supply={{ val: new BN(123456789), scale: 6 }}
        maxSupply={{ val: new BN(123456789), scale: 6 }}
        assetAddress='qwertyuiopasdfghjklzxcvbnm'
        price={{ val: new BN(123456789), scale: 6 }}
        data={[
          {
            id: 'fake corp. A',
            data: [
              { x: 0, y: 7 },
              { x: 1, y: 5 },
              { x: 2, y: 11 },
              { x: 3, y: 9 },
              { x: 4, y: 13 },
              { x: 7, y: 16 },
              { x: 9, y: 12 }
            ]
          }
        ]}
      />
    </div>
  ))
