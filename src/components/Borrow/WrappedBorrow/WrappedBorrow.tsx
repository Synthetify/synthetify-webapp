/* eslint-disable @typescript-eslint/indent */
import { DEFAULT_PUBLICKEY } from '@consts/static'
import { printBN } from '@consts/utils'
import { Grid } from '@material-ui/core'
import { ActionType } from '@reducers/vault'
import { UserVaults } from '@selectors/exchange'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Decimal, Vault } from '@synthetify/sdk/lib/exchange'
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

interface IProp {
  pairs: BorrowedPair[]
  userVaults: UserVaults[]
  sending: boolean
  hasError: boolean | undefined
  onClickSubmitButton: (
    action: ActionType,
    synthetic: PublicKey,
    collateral: PublicKey,
    collateralAmount: BN,
    syntheticAmount: BN
  ) => void
  setActualPair: (synthetic: PublicKey, collateral: PublicKey) => void
  availableCollateral: BN
  availableRepay: BN
  actualVault: {
    collateralAmount: Decimal
    borrowAmount: Decimal
  }
  totalGeneralAmount: {
    totalCollateralAmount: number
    totalDebtAmount: number
  }
  walletStatus: boolean
  noWalletHandler: () => void
}
export const WrappedBorrow: React.FC<IProp> = ({
  pairs,
  sending,
  hasError,
  userVaults,
  onClickSubmitButton,
  setActualPair,
  availableCollateral,
  availableRepay,
  actualVault,
  totalGeneralAmount,
  walletStatus,
  noWalletHandler
}) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState('---')
  const [liquidationPriceTo, setLiquidationPriceTo] = React.useState(0)
  const [liquidationPriceFrom, setLiquidationPriceFrom] = React.useState(0)
  const [availableBorrow, setAvailableBorrow] = React.useState(new BN(0))
  const [availableWithdraw, setAvailableWithdraw] = React.useState(new BN(0))
  const changeCRatio = (nr: string) => {
    setCRatio(nr)
  }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)

  const changeValueFromTable = (collSymbol: string, synthSymbol: string) => {
    const index = pairs.findIndex(
      element =>
        element.collateralData.symbol === collSymbol && element.syntheticData.symbol === synthSymbol
    )
    setPairIndex(index)
  }
  React.useEffect(() => {
    if (pairIndex !== null) {
      setActualPair(pairs[pairIndex].synthetic, pairs[pairIndex].collateral)
    }
  }, [pairIndex])

  const actionContents: IActionContents = {
    borrow: (
      <ActionBorrow
        action={'borrow'}
        cRatio={cRatio}
        changeCRatio={changeCRatio}
        liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
        liquidationPriceFrom={liquidationPriceFrom > 0 ? liquidationPriceFrom : 0}
        onClickSubmitButton={onClickSubmitButton}
        pairs={pairs}
        sending={sending}
        pairIndex={pairIndex}
        setPairIndex={setPairIndex}
        hasError={hasError}
        vaultAmount={actualVault}
        availableTo={availableBorrow}
        availableFrom={availableCollateral}
        setLiquidationPriceTo={setLiquidationPriceTo}
        setLiquidationPriceFrom={setLiquidationPriceFrom}
        setAvailableBorrow={setAvailableBorrow}
        setAvailableWithdraw={setAvailableWithdraw}
        walletStatus={walletStatus}
        noWalletHandler={noWalletHandler}
      />
    ),
    repay: (
      <ActionBorrow
        action={'repay'}
        cRatio={cRatio}
        liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
        liquidationPriceFrom={liquidationPriceFrom > 0 ? liquidationPriceFrom : 0}
        onClickSubmitButton={onClickSubmitButton}
        pairs={pairs}
        changeCRatio={changeCRatio}
        sending={sending}
        pairIndex={pairIndex}
        setPairIndex={setPairIndex}
        hasError={hasError}
        vaultAmount={actualVault}
        availableTo={availableRepay}
        availableFrom={availableWithdraw}
        setLiquidationPriceTo={setLiquidationPriceTo}
        setLiquidationPriceFrom={setLiquidationPriceFrom}
        setAvailableBorrow={setAvailableBorrow}
        setAvailableWithdraw={setAvailableWithdraw}
        walletStatus={walletStatus}
        noWalletHandler={noWalletHandler}
      />
    )
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.actionGrid}>
        <ActionMenuBorrow actionContents={actionContents} />
        <BorrowTable
          userVaults={userVaults}
          setValueWithTable={changeValueFromTable}
          active={pairIndex !== null ? pairs[pairIndex].collateralData.symbol : null}
        />
      </Grid>
      <Grid className={classes.borrowInfoGrid}>
        {pairIndex !== null ? (
          <BorrowInfo
            collateralAmount={totalGeneralAmount.totalCollateralAmount.toString()}
            debtAmount={totalGeneralAmount.totalDebtAmount.toString()}
            collateral={pairs[pairIndex].collateralData.symbol}
            borrowed={pairs[pairIndex].syntheticData.symbol}
            limit={Number(
              printBN(
                pairs[pairIndex].maxBorrow.val.sub(pairs[pairIndex].mintAmount.val),
                pairs[pairIndex].maxBorrow.scale
              )
            )}
            liqRatio={Number(
              Math.pow(
                Number(
                  printBN(
                    pairs[pairIndex].liquidationThreshold.val,
                    pairs[pairIndex].liquidationThreshold.scale
                  )
                ),
                -1
              ) * 100
            )}
            cRatio={
              Math.pow(
                Number(
                  printBN(
                    pairs[pairIndex].collateralRatio.val,
                    pairs[pairIndex].collateralRatio.scale
                  )
                ),
                -1
              ) * 100
            }
            collateralAddress={pairs[pairIndex].collateral}
            borrowedAddress={pairs[pairIndex].synthetic}
            borrowedSign={pairs[pairIndex].syntheticData.symbol}
            amountSign={'$'}
            callPrice={printBN(
              pairs[pairIndex].collateralData.price.val,
              pairs[pairIndex].collateralData.price.scale
            )}
            borrPrice={printBN(
              pairs[pairIndex].syntheticData.price.val,
              pairs[pairIndex].syntheticData.price.scale
            )}
            interestRate={printBN(
              pairs[pairIndex].debtInterestRate.val,
              pairs[pairIndex].debtInterestRate.scale - 4
            )}
          />
        ) : (
          <BorrowInfo
            collateralAmount={totalGeneralAmount.totalCollateralAmount.toString()}
            debtAmount={totalGeneralAmount.totalDebtAmount.toString()}
            collateral={' '}
            borrowed={' '}
            cRatio={0}
            limit={0}
            liqRatio={0}
            collateralAddress={DEFAULT_PUBLICKEY}
            borrowedAddress={DEFAULT_PUBLICKEY}
            borrowedSign={' '}
            amountSign={'$'}
            callPrice={'0'}
            borrPrice={'0'}
            interestRate={'0'}
          />
        )}
      </Grid>
    </Grid>
  )
}
