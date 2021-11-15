import { Grid } from '@material-ui/core'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Vault } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import { BorrowInfo } from '../BorrowInfo/BorrowInfo'
import { ActionBorrow } from '../SwitchBorrow/ActionBorrow'
import ActionMenuBorrow, { IActionContents } from '../SwitchBorrow/ActionMenuBorrow'
import useStyles from './style'
export interface BorrowedPair extends Vault {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
}
interface IProp {
  pairs: BorrowedPair[]
}
export const WrappedBorrow: React.FC<IProp> = ({ pairs }) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState(100.0)
  const changeCRatio = (nr: number) => {
    setCRatio(nr)
  }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)

  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        interestRate={0}
        liquidationPriceTo={0}
        liquidationPriceFrom={0}
        collateralRatioTo={0}
        collateralRatioFrom={0}
        nameButton={'Add'}
        onClickSubmitButton={() => {}}
        pairs={pairs}
        minCRatio={75}
        sending={true}
        onSelectPair={setPairIndex}
        hasError={false}
      />
    ),
    repay: (
      <ActionBorrow
        cRatio={cRatio}
        interestRate={1}
        liquidationPriceTo={1}
        liquidationPriceFrom={1}
        collateralRatioTo={1}
        collateralRatioFrom={1}
        nameButton={'Withdraw'}
        onClickSubmitButton={() => {}}
        pairs={pairs}
        minCRatio={50}
        changeCRatio={changeCRatio}
        sending={false}
        onSelectPair={setPairIndex}
        hasError={false}
      />
    )
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.actionGrid}>
        <ActionMenuBorrow actionContents={actionContents} />
      </Grid>
      <Grid className={classes.borrowInfoGrid}>
        <BorrowInfo
          collateralAmount={0}
          debtAmount={0}
          collateral={pairIndex !== null ? pairs[pairIndex].collateralData.symbol : ''}
          borrowed={pairIndex !== null ? pairs[pairIndex].syntheticData.symbol : ''}
          limit={0}
          reserve={0}
          collateralAddress={pairIndex !== null ? pairs[pairIndex].collateral : new PublicKey(0)}
          borrowedAddress={pairIndex !== null ? pairs[pairIndex].synthetic : new PublicKey(0)}
          collateralSign={''}
          borrowedSign={''}
          amountSign={''}
        />
      </Grid>
    </Grid>
  )
}
