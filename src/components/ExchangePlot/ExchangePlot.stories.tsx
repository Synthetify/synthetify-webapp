import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import ExchangePlot from './ExchangePlot'
import { BN } from '@project-serum/anchor'
import { DEFAULT_PUBLICKEY } from '@consts/static'

storiesOf('ui/exchangePlot', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div style={{ width: 500 }}>
      <ExchangePlot
        tokenName='xBTC'
        supply={{ val: new BN(123456789), scale: 6 }}
        maxSupply={{ val: new BN(123456789), scale: 6 }}
        assetAddress={DEFAULT_PUBLICKEY}
        price={{ val: new BN(123456789), scale: 6 }}
        data={[
          { x: 1508328900000, y: 2.1 },
          { x: 1508328910000, y: 2.25 },
          { x: 1508328920000, y: 2.5 },
          { x: 1508328930000, y: 2.3 },
          { x: 1508328940000, y: 2.6 },
          { x: 1508328950000, y: 2.55 },
          { x: 1508328960000, y: 2.4 },
          { x: 1508328970000, y: 2.1 },
          { x: 1508328980000, y: 2.25 },
          { x: 1508328990000, y: 2.5 },
          { x: 1508329000000, y: 2.3 },
          { x: 1508329010000, y: 2.6 },
          { x: 1508329020000, y: 2.55 },
          { x: 1508329030000, y: 2.4 },
          { x: 1508329040000, y: 2.3 },
          { x: 1508329050000, y: 2.6 },
          { x: 1508329060000, y: 2.55 },
          { x: 1508329070000, y: 2.4 },
          { x: 1508329080000, y: 2.3 },
          { x: 1508329090000, y: 2.6 },
          { x: 1508329100000, y: 2.55 },
          { x: 1508329110000, y: 2.4 },
          { x: 1508329120000, y: 2.3 },
          { x: 1508329130000, y: 2.6 },
          { x: 1508329140000, y: 2.55 },
          { x: 1508329150000, y: 2.4 }
        ]}
      />
    </div>
  ))
