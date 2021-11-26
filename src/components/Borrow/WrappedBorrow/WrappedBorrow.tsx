import { printBN, printBNtoBN } from '@consts/utils'
import { Grid } from '@material-ui/core'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Vault } from '@synthetify/sdk/lib/exchange'
import BN from 'bn.js'
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
  debtAmount: number
  collateralAmount: number
  addCollateral: (
    synthetic: PublicKey,
    collateral: PublicKey,
    collateralAmount: BN,
    syntheticAmount: BN
  ) => void
  borrowSynthetic: (
    synthetic: PublicKey,
    collateral: PublicKey,
    collateralAmount: BN,
    syntheticAmount: BN
  ) => void
  withdrawCollateral: () => void
  repaySynthetic: () => void
}
export const WrappedBorrow: React.FC<IProp> = ({
  pairs,
  sending,
  hasError,
  ownedVaults,
  collateralAmount,
  debtAmount,
  addCollateral,
  borrowSynthetic,
  withdrawCollateral,
  repaySynthetic
}) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState(0)
  const [interestRate, setInterestRate] = React.useState(0)
  const [liquidationPriceTo, setLiquidationPriceTo] = React.useState(1)
  const [liquidationPriceFrom, setLiquidationPriceFrom] = React.useState(1)

  const changeCRatio = (nr: number) => {
    setCRatio(Number(nr.toFixed(2)))
  }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [cRatioFrom, setCRatioFrom] = React.useState(100)
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
  }

  const actionOnSubmit = (
    action: string,
    synthetic: PublicKey,
    synScale: number,
    amountBorrow: string,
    collateral: PublicKey,
    amountCollateral: string,
    collScale: number
  ) => {
    switch (action) {
      case 'borrow': {
        borrowSynthetic(
          synthetic,
          collateral,
          printBNtoBN(amountCollateral, collScale),
          printBNtoBN(amountBorrow, synScale)
        )
        break
      }
      case 'add': {
        addCollateral(
          synthetic,
          collateral,
          printBNtoBN(amountCollateral, collScale),
          printBNtoBN(amountBorrow, synScale)
        )
        break
      }
      case 'withdraw': {
        withdrawCollateral()
        break
      }
      case 'repay': {
        repaySynthetic()
        if (amountBorrow !== '') {
          withdrawCollateral()
        }
        break
      }
    }
  }

  React.useEffect(() => {
    // todo change the calculation method when writing functionality
    setCRatioFrom(minCRatio)
  }, [cRatio])

  React.useEffect(() => {
    // todo przeniesc do actionBorrow, tutaj to sie nei przyda
    setInterestRate(
      pairIndex !== null
        ? Number(
            printBN(pairs[pairIndex].debtInterestRate.val, pairs[pairIndex].debtInterestRate.scale)
          ) * 100
        : 0
    )
    setLiquidationPriceFrom(
      pairIndex !== null
        ? Number(
            printBN(
              pairs[pairIndex].collateralData.price.val,
              pairs[pairIndex].collateralData.price.scale
            )
          )
        : 0
    )
    setLiquidationPriceTo(
      pairIndex !== null
        ? Number(
            printBN(
              pairs[pairIndex].collateralData.price.val,
              pairs[pairIndex].collateralData.price.scale
            )
          ) *
            Number(
              printBN(
                pairs[pairIndex].liquidationThreshold.val,
                pairs[pairIndex].liquidationThreshold.scale
              )
            )
        : 0
    )
  }, [pairIndex])

  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        action={'borrow'}
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        interestRate={interestRate}
        liquidationPriceTo={liquidationPriceTo}
        liquidationPriceFrom={liquidationPriceFrom}
        collateralRatioTo={cRatio}
        collateralRatioFrom={cRatioFrom}
        onClickSubmitButton={actionOnSubmit}
        pairs={pairs}
        minCRatio={minCRatio}
        sending={sending}
        onSelectPair={setPairIndex}
        hasError={hasError}
        changeValueFromTable={changeValueFromTable}
        vaultAmount={{
          collateralAmount: {
            val: new BN(0),
            scale: 0
          },
          borrowAmount: {
            val: new BN(0),
            scale: 0
          }
        }}
      />
    ),
    repay: (
      <ActionBorrow
        action={'repay'}
        cRatio={cRatio}
        interestRate={interestRate}
        liquidationPriceTo={liquidationPriceTo}
        liquidationPriceFrom={liquidationPriceFrom}
        collateralRatioTo={cRatioFrom}
        collateralRatioFrom={cRatio}
        onClickSubmitButton={actionOnSubmit}
        pairs={pairs}
        minCRatio={minCRatio}
        changeCRatio={changeCRatio}
        sending={sending}
        onSelectPair={setPairIndex}
        hasError={hasError}
        changeValueFromTable={changeValueFromTable}
        vaultAmount={{
          collateralAmount: {
            val: new BN(0),
            scale: 0
          },
          borrowAmount: {
            val: new BN(0),
            scale: 0
          }
        }}
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
          limit={
            pairIndex !== null
              ? Number(
                  printBN(
                    pairs[pairIndex].collateralData.balance,
                    pairs[pairIndex].collateralData.assetIndex
                  )
                )
              : 0
          }
          reserve={
            pairIndex !== null
              ? Number(
                  printBN(
                    pairs[pairIndex].collateralAmount.val,
                    pairs[pairIndex].collateralAmount.scale
                  )
                )
              : 0
          }
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
