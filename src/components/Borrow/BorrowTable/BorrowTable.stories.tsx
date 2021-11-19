import React from 'react'
import { storiesOf } from '@storybook/react'
import { BorrowTable } from './BorrowTable'
import { OwnedVaults } from '../WrappedBorrow/WrappedBorrow'

storiesOf('Borrow/table', module).add('default', () =>
  React.createElement(() => {
    const [active, setActive] = React.useState(false)
    const ownedVaults: OwnedVaults[] = [
      {
        collateral: 'WSOL',
        borrowed: 'xSOL',
        currentDebt: 11999.4325,
        deposited: 101035.4215,
        depositedSign: 'xSOL',
        cRatio: '125.645',
        interestRate: '25.4545',
        liquidationPrice: '125.32654',
        maxBorrow: '300',
        currentDebtSign: '$'
      },
      {
        collateral: 'WSOL',
        borrowed: 'xSOL',
        currentDebt: 11999.4325,
        deposited: 101035.4215,
        depositedSign: 'xSOL',
        cRatio: '125.645',
        interestRate: '25.4545',
        liquidationPrice: '125.32654',
        maxBorrow: '300',
        currentDebtSign: '$'
      }
    ]
    return (
      <div style={{ background: '#0C0D2C', height: '100vh' }}>
        <BorrowTable
          ownedVaults={ownedVaults}
          setValueWithTable={() => {
            setActive(true)
            console.log('set value with tables')
          }}
          active={active}
        />
      </div>
    )
  })
)
