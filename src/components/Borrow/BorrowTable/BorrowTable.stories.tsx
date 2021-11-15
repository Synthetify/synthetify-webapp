import React from 'react'
import { storiesOf } from '@storybook/react'
import { BorrowTable } from './BorrowTable'

storiesOf('Borrow/table', module).add('default', () =>
  React.createElement(() => {
    const [active, setActive] = React.useState(false)

    return (
      <div style={{ background: '#0C0D2C', height: '100vh' }}>
        <BorrowTable
          collateral={'WSOL'}
          borrowed={'xSOL'}
          currentDebt={11999.4325}
          deposited={101035.4215}
          depositedSign={'xSOL'}
          cRatio={'125.645'}
          interestRate={'25.4545'}
          liquidationPrice={'125.32654'}
          maxBorrow={'300'}
          setValueWithTable={() => {
            setActive(true)
            console.log('set value with tables')
          }}
          active={active}
          currentDebtSign={'xUSD'}
        />
      </div>
    )
  })
)
