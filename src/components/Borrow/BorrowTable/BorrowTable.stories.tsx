import React from 'react'
import { storiesOf } from '@storybook/react'
import { BorrowTable } from './BorrowTable'
import { UserVaults } from '@selectors/exchange'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'

storiesOf('Borrow/table', module).add('default', () =>
  React.createElement(() => {
    const userVaults: UserVaults[] = [
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
        currentDebtSign: '$',
        minCRatio: 100,
        lastAccumulatedInterestRate: { val: new BN(0), scale: 0 },
        syntheticAmount: { val: new BN(0), scale: 0 },
        collateralAmount: { val: new BN(0), scale: 0 },
        owner: new PublicKey(0),
        vault: new PublicKey(0)
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
        currentDebtSign: '$',
        minCRatio: 100,
        lastAccumulatedInterestRate: { val: new BN(0), scale: 0 },
        syntheticAmount: { val: new BN(0), scale: 0 },
        collateralAmount: { val: new BN(0), scale: 0 },
        owner: new PublicKey(0),
        vault: new PublicKey(0)
      }
    ]
    return (
      <div style={{ background: '#0C0D2C', height: '100vh' }}>
        <BorrowTable
          userVaults={userVaults}
          setValueWithTable={() => {
            console.log('set value with tables')
          }}
          active={'Sol'}
        />
      </div>
    )
  })
)
