import React from 'react'
import { Grid } from '@material-ui/core'
import { storiesOf } from '@storybook/react'
import { BorrowInfo } from './BorrowInfo'
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { BN } from '@project-serum/anchor'

storiesOf('Borrow/Info', module).add('default', () => (
  <Grid
    style={{
      background: '#0C0D2C',
      width: '100vw',
      height: '100vh',
      paddingTop: '50px',
      paddingBottom: '50px'
    }}>
    <BorrowInfo
      collateralAmount={'12.075884'}
      debtAmount={'0.1723'}
      collateral={'WSOL'}
      borrowed={'xSOL'}
      limit={20.3453}
      collateralAddress={DEFAULT_PUBLICKEY}
      borrowedAddress={DEFAULT_PUBLICKEY}
      borrowedSign={'xSOL'}
      amountSign={'$'}
      callPrice={{ val: new BN(0), scale: 0 }}
      borrPrice={{ val: new BN(0), scale: 0 }}
      interestRate={''}
      liqRatio={{ val: new BN(0), scale: 0 }}
      cRatio={0}
      openFee={0}
      vaultType={0}
      page={'vault'}
    />
  </Grid>
))
