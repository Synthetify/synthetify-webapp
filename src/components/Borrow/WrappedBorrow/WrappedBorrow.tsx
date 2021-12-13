import { printBN, printBNtoBN } from '@consts/utils'
import { Grid } from '@material-ui/core'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Decimal, Vault, VaultEntry } from '@synthetify/sdk/lib/exchange'
import BN from 'bn.js'
import React from 'react'
import { BorrowInfo } from '../BorrowInfo/BorrowInfo'
import { BorrowTable } from '../BorrowTable/BorrowTable'
import { calculateAvailableBorrow, calculateAvailableWithdraw } from '../borrowUtils'
import { ActionBorrow } from '../SwitchBorrow/ActionBorrow'
import ActionMenuBorrow, { IActionContents } from '../SwitchBorrow/ActionMenuBorrow'
import useStyles from './style'
export interface BorrowedPair extends Vault {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
}
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
export interface OwnedVaults extends VaultEntry {
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
  hasError: boolean | undefined
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
  withdrawCollateral: (
    synthetic: PublicKey,
    collateral: PublicKey,
    collateralAmount: BN,
    syntheticAmount: BN
  ) => void
  repaySynthetic: (
    synthetic: PublicKey,
    collateral: PublicKey,
    collateralAmount: BN,
    syntheticAmount: BN
  ) => void
  setActualPair: (synthetic: PublicKey, collateral: PublicKey) => void
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
  repaySynthetic,
  setActualPair
}) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState('---')
  const [liquidationPriceTo, setLiquidationPriceTo] = React.useState(0)
  const [liquidationPriceFrom, setLiquidationPriceFrom] = React.useState(0)
  const [availableAdd, setAvailableAdd] = React.useState(new BN(0))
  const [availableBorrow, setAvailableBorrow] = React.useState(new BN(0))
  const [availableWithdraw, setAvailableWithdraw] = React.useState(new BN(0))
  const [availableRepay, setAvailableRepay] = React.useState(new BN(0))
  const [vaultAmount, setVaultAmount] = React.useState<{
    collateralAmount: Decimal
    borrowAmount: Decimal
  }>({
    collateralAmount: {
      val: new BN(0),
      scale: 0
    },
    borrowAmount: {
      val: new BN(0),
      scale: 0
    }
  })
  const changeCRatio = (nr: string) => {
    setCRatio(nr)
  }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)

  const changeValueFromTable = (cRatio: number, interestRate: number, liquidationPrice: number) => {
    console.log('change pair', cRatio, interestRate, liquidationPrice)
  }

  const actionOnSubmit = (
    action: string,
    synthetic: PublicKey,
    amountBorrow: BN,
    collateral: PublicKey,
    amountCollateral: BN
  ) => {
    switch (action) {
      case 'borrow': {
        borrowSynthetic(synthetic, collateral, amountCollateral, amountBorrow)
        break
      }
      case 'add': {
        addCollateral(synthetic, collateral, amountCollateral, amountBorrow)
        break
      }
      case 'withdraw': {
        withdrawCollateral(synthetic, collateral, amountCollateral, amountBorrow)
        break
      }
      case 'repay': {
        repaySynthetic(synthetic, collateral, amountCollateral, amountBorrow)
        break
      }
    }
  }
  React.useEffect(() => {
    ownedVaults.find(element => {
      if (pairIndex !== null && element.collateral === pairs[pairIndex].collateralData.symbol) {
        setVaultAmount({
          collateralAmount: element.collateralAmount,
          borrowAmount: element.syntheticAmount
        })
        if (pairs[pairIndex].syntheticData.balance.gt(vaultAmount.borrowAmount.val)) {
          setAvailableRepay(element.syntheticAmount.val)
        } else {
          setAvailableRepay(pairs[pairIndex].syntheticData.balance)
        }
      }
    })
    if (pairIndex !== null) {
      setActualPair(pairs[pairIndex].synthetic, pairs[pairIndex].collateral)
      setAvailableAdd(pairs[pairIndex].collateralData.balance)
    }
  }, [pairIndex, sending, hasError])
  const calculateLiquidation = (
    priceFrom: BN,
    amountCollateral: BN,
    vaultAmountCollatera: BN,
    priceTo: BN,
    amountBorrow: BN,
    vaultAmountBorrow: BN,
    liqThreshold: Decimal,
    assetScaleTo: number,
    assetScaleFrom: number
  ) => {
    setLiquidationPriceTo(
      pairIndex !== null
        ? Number(
          calculateLiqPrice(
            priceFrom,
            amountCollateral.add(vaultAmountCollatera),
            priceTo,
            amountBorrow.add(vaultAmountBorrow),
            liqThreshold,
            assetScaleTo,
            assetScaleFrom
          )
        )
        : 0
    )
    setLiquidationPriceFrom(
      pairIndex !== null
        ? Number(
          calculateLiqPrice(
            priceFrom,
            vaultAmountCollatera,
            priceTo,
            vaultAmountBorrow,
            liqThreshold,
            assetScaleTo,
            assetScaleFrom
          )
        )
        : 0
    )
  }
  const calculateAvailableBorrowAndWithdraw = (
    assetTo: AssetPriceData,
    assetFrom: AssetPriceData,
    cRatio: string,
    vaultEntryAmountCollateral: BN,
    amountCollateral: BN,
    vaultEntryAmountBorrow: BN,
    amountBorrow: BN
  ) => {
    setAvailableBorrow(
      calculateAvailableBorrow(
        assetTo,
        assetFrom,
        cRatio,
        vaultEntryAmountCollateral,
        amountCollateral,
        vaultEntryAmountBorrow
      )
    )
    setAvailableWithdraw(
      calculateAvailableWithdraw(
        assetTo,
        assetFrom,
        cRatio,
        vaultEntryAmountCollateral,
        amountBorrow,
        vaultEntryAmountBorrow
      )
    )
  }

  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        action={'borrow'}
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        liquidationPriceTo={liquidationPriceTo}
        liquidationPriceFrom={liquidationPriceFrom}
        onClickSubmitButton={actionOnSubmit}
        pairs={pairs}
        sending={sending}
        onSelectPair={setPairIndex}
        hasError={hasError}
        vaultAmount={vaultAmount}
        availableTo={availableBorrow}
        availableFrom={availableAdd}
        calculateLiquidation={calculateLiquidation}
        calculateAvailableBorrowAndWithdraw={calculateAvailableBorrowAndWithdraw}
      />
    ),
    repay: (
      <ActionBorrow
        action={'repay'}
        cRatio={cRatio}
        liquidationPriceTo={liquidationPriceTo}
        liquidationPriceFrom={liquidationPriceFrom}
        onClickSubmitButton={actionOnSubmit}
        pairs={pairs}
        changeCRatio={changeCRatio}
        sending={sending}
        onSelectPair={setPairIndex}
        hasError={hasError}
        vaultAmount={vaultAmount}
        availableTo={availableRepay}
        availableFrom={availableWithdraw}
        calculateLiquidation={calculateLiquidation}
        calculateAvailableBorrowAndWithdraw={calculateAvailableBorrowAndWithdraw}
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

const calculateLiqPrice = (
  priceFrom: BN,
  amountCollateral: BN,
  priceTo: BN,
  amountBorrow: BN,
  liqThreshold: Decimal,
  assetScaleTo: number,
  assetScaleFrom: number
) => {
  const amountUSDBorrow = amountBorrow.mul(priceTo)
  if (amountBorrow.eq(new BN(0)) || amountCollateral.eq(new BN(0))) {
    return printBN(
      priceFrom.mul(liqThreshold.val).div(new BN(10).pow(new BN(liqThreshold.scale))),
      assetScaleFrom + 2
    )
  } else {
    return printBN(
      amountUSDBorrow.div(
        liqThreshold.val.mul(amountCollateral).div(new BN(10).pow(new BN(liqThreshold.scale)))
      ),
      assetScaleTo + 2
    )
  }
}
