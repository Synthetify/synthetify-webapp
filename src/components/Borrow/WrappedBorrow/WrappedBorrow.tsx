import { printBN } from '@consts/utils'
import { Grid } from '@material-ui/core'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Vault } from '@synthetify/sdk/lib/exchange'
import React from 'react'
import { BorrowInfo } from '../BorrowInfo/BorrowInfo'
import { BorrowTable } from '../BorrowTable/BorrowTable'
import { ActionBorrow } from '../SwitchBorrow/ActionBorrow'
import ActionMenuBorrow, { IActionContents } from '../SwitchBorrow/ActionMenuBorrow'
import useStyles from './style'
export interface BorrowedPair extends Vault {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
}
export interface OwnedVaults {
  borrowed: string
  collateral: string
  deposited: number
  depositedSign: string
  cRatio: string
  currentDebt: number
  currentDebtSign: string
  maxBorrow: string
  interestRate: string
  liquidationPrice: string
}
interface IProp {
  pairs: BorrowedPair[]
  ownedVaults: OwnedVaults[]
  sending: boolean
  hasError: boolean
  limit: number
  reserve: number
  debtAmount: number
  collateralAmount: number
  addCollateral: () => void
  borrowSynthetic: () => void
  withdrawCollateral: () => void
  repaySynthetic: () => void
}
export const WrappedBorrow: React.FC<IProp> = ({
  pairs,
  sending,
  hasError,
  ownedVaults,
  limit,
  reserve,
  collateralAmount,
  debtAmount,
  addCollateral,
  borrowSynthetic,
  withdrawCollateral,
  repaySynthetic
}) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState(100.0)
  const [interestRate, setInterestRate] = React.useState(1)
  const [liquidationPriceTo, setLiquidationPriceTo] = React.useState(1)
  const [liquidationPriceFrom, setLiquidationPriceFrom] = React.useState(1)

  const changeCRatio = (nr: number) => {
    setCRatioTo(cRatio / 10)
    setCRatio(nr)
  }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [cRatioTo, setCRatioTo] = React.useState(cRatio / 10)
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
    setLiquidationPriceTo(liquidationPrice)
    setCRatioTo(cRatio / 10)
  }

  const actionOnSubmit = (action: string) => {
    switch (action) {
      case 'borrow': {
        borrowSynthetic()
        break
      }
      case 'add': {
        addCollateral()
        break
      }
      case 'withdraw': {
        withdrawCollateral()
        break
      }
      case 'repay': {
        repaySynthetic()
        break
      }
    }
  }

  React.useEffect(() => {
    // todo change the calculation method when writing functionality
    setCRatioTo(cRatio / 10)
  }, [cRatio])
  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        action={'borrow'}
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        interestRate={interestRate}
        liquidationPriceTo={liquidationPriceTo}
        liquidationPriceFrom={liquidationPriceFrom}
        collateralRatioTo={cRatioTo}
        collateralRatioFrom={cRatio}
        onClickSubmitButton={actionOnSubmit}
        pairs={pairs}
        minCRatio={minCRatio}
        sending={sending}
        onSelectPair={setPairIndex}
        hasError={hasError}
        changeValueFromTable={changeValueFromTable}
      />
    ),
    repay: (
      <ActionBorrow
        action={'repay'}
        cRatio={cRatio}
        interestRate={interestRate}
        liquidationPriceTo={liquidationPriceTo}
        liquidationPriceFrom={liquidationPriceFrom}
        collateralRatioTo={cRatioTo}
        collateralRatioFrom={cRatio}
        onClickSubmitButton={actionOnSubmit}
        pairs={pairs}
        minCRatio={minCRatio}
        changeCRatio={changeCRatio}
        sending={sending}
        onSelectPair={setPairIndex}
        hasError={hasError}
        changeValueFromTable={changeValueFromTable}
      />
    )
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.actionGrid}>
        <ActionMenuBorrow actionContents={actionContents} />
        <BorrowTable
          ownedVaults={ownedVaults}
          setValueWithTable={changeValueFromTable}
          active={false}
        />
      </Grid>
      <Grid className={classes.borrowInfoGrid}>
        <BorrowInfo
          collateralAmount={collateralAmount}
          debtAmount={debtAmount}
          collateral={pairIndex !== null ? pairs[pairIndex].collateralData.symbol : ''}
          borrowed={pairIndex !== null ? pairs[pairIndex].syntheticData.symbol : ''}
          limit={limit}
          reserve={reserve}
          collateralAddress={pairIndex !== null ? pairs[pairIndex].collateral : new PublicKey(0)}
          borrowedAddress={pairIndex !== null ? pairs[pairIndex].synthetic : new PublicKey(0)}
          collateralSign={pairIndex !== null ? pairs[pairIndex].collateralData.symbol : ''}
          borrowedSign={pairIndex !== null ? pairs[pairIndex].syntheticData.symbol : ''}
          amountSign={'$'}
        />
      </Grid>
    </Grid>
  )
}
