import { Grid } from '@material-ui/core'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { Vault } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import { ActionBorrow } from '../SwitchBorrow/ActionBorrow'
import ActionMenuBorrow, { IActionContents } from '../SwitchBorrow/ActionMenuBorrow'

export interface BorrowedPair extends Vault {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
}
interface IProp {
  pairs: BorrowedPair[]
}
export const WrappedBorrow: React.FC<IProp> = ({ pairs }) => {
  const [cRatio, setCRatio] = React.useState(100.0)
  const changeCRatio = (nr: number) => {
    setCRatio(nr)
  }

  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        interestRate={24.68}
        liquidationPriceTo={3.458}
        liquidationPriceFrom={8.456}
        collateralRatioTo={3.45}
        collateralRatioFrom={25.64}
        nameButton={'Add'}
        onClickSubmitButton={() => {}}
        pairs={pairs}
        minCRatio={75}
        sending={true}
      />
    ),
    repay: (
      <ActionBorrow
        cRatio={cRatio}
        interestRate={2.68}
        liquidationPriceTo={3.458}
        liquidationPriceFrom={80.456}
        collateralRatioTo={3.45}
        collateralRatioFrom={125.64}
        nameButton={'Withdraw'}
        onClickSubmitButton={() => {}}
        pairs={pairs}
        minCRatio={50}
        changeCRatio={changeCRatio}
        sending={false}
      />
    )
  }

  return (
    <Grid>
      <ActionMenuBorrow actionContents={actionContents} />
    </Grid>
  )
}
