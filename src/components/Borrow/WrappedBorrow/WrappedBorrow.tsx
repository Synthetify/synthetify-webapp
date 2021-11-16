import { printBN } from '@consts/utils'
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
  const [interestRate, setInterestRate] = React.useState(1)
  const [liquidationPrice, setLiquidationPrice] = React.useState(1)
  const changeCRatio = (nr: number) => {
    setCRatio(nr)
  }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)

  const minCRatio =
    pairIndex !== null
      ? Math.pow(
          Number(
            printBN(pairs[pairIndex].collateralRatio.val, pairs[pairIndex].collateralRatio.scale)
          ) / 100,
          -1
        )
      : 0

  const changeValueFromTable = (cRatio: number, interestRate: number, liquidationPrice: number) => {
    setCRatio(cRatio)
    setInterestRate(interestRate)
    setLiquidationPrice(liquidationPrice)
  }
  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        interestRate={interestRate}
        liquidationPriceTo={liquidationPrice}
        liquidationPriceFrom={0}
        collateralRatioTo={0}
        collateralRatioFrom={0}
        nameButton={'Add'}
        onClickSubmitButton={() => {}}
        pairs={pairs}
        minCRatio={minCRatio}
        sending={true}
        onSelectPair={setPairIndex}
        hasError={false}
        changeValueFromTable={changeValueFromTable}
      />
    ),
    repay: (
      <ActionBorrow
        cRatio={cRatio}
        interestRate={interestRate}
        liquidationPriceTo={1}
        liquidationPriceFrom={1}
        collateralRatioTo={1}
        collateralRatioFrom={1}
        nameButton={'Withdraw'}
        onClickSubmitButton={() => {}}
        pairs={pairs}
        minCRatio={minCRatio}
        changeCRatio={changeCRatio}
        sending={false}
        onSelectPair={setPairIndex}
        hasError={false}
        changeValueFromTable={changeValueFromTable}
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
