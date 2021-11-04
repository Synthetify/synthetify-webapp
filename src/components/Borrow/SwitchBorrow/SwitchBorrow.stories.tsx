import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Grid } from '@material-ui/core'
import ActionMenuBorrow, { IActionContents } from './ActionMenuBorrow'
import { ActionBorrow } from './ActionBorrow'

const pairs = [
  {
    symbol1: 'xUSD',
    symbol2: 'USDC'
  },
  {
    symbol1: 'xSOL',
    symbol2: 'WSOL'
  }
]
const actionContents: IActionContents = {
  borrow: (
    <ActionBorrow
      availableCollateral={45.55512141}
      availableBorrow={12.000058445}
      cRatio={25.64}
      interestRate={24.68}
      liquidationPriceTo={3.458}
      liquidationPriceFrom={8.456}
      collateralRatioTo={3.45}
      collateralRatioFrom={25.64}
      nameButton={'Add'}
      onClickButton={() => {}}
      pairs={pairs}
    />
  ),
  repay: (
    <ActionBorrow
      availableCollateral={5.555141}
      availableBorrow={1.000058445}
      cRatio={125.64}
      interestRate={2.68}
      liquidationPriceTo={3.458}
      liquidationPriceFrom={80.456}
      collateralRatioTo={3.45}
      collateralRatioFrom={125.64}
      nameButton={'Withdraw'}
      onClickButton={() => {}}
      pairs={pairs}
    />
  )
}
storiesOf('borrow/switchBorrow', module)
  .addDecorator(withKnobs)

  .add('Actions', () => (
    <div style={{ padding: '24px' }}>
      <Grid style={{ maxWidth: 980 }}>
        <ActionMenuBorrow actionContents={actionContents} onChange={action('change action')} />
      </Grid>
    </div>
  ))
