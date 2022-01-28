import { DEFAULT_PUBLICKEY } from '@consts/static'
import { printBN } from '@consts/utils'
import { Grid } from '@material-ui/core'
import { UserVaults } from '@selectors/exchange'
import { ExchangeSyntheticTokens, ILeverageSynthetic } from '@selectors/solanaWallet'
import { PublicKey } from '@solana/web3.js'
import { Decimal, Vault } from '@synthetify/sdk/lib/exchange'
import BN from 'bn.js'
import React from 'react'
import { BorrowInfo } from '@components/Borrow/BorrowInfo/BorrowInfo'
import { BorrowTable } from '@components/Borrow/BorrowTable/BorrowTable'
import { ActionLeverage } from '../SwitchLeverage/ActionLeverage'
import ActionMenuLeverage, { IActionContents } from '../SwitchLeverage/ActionMenuLeverage'
import useStyles from './style'
import { ILeveragePair } from '@reducers/leverage'
export interface BorrowedPair extends Vault {
  collateralData: { reserveBalance: number; symbol: string; price: Decimal; balance: BN }
  syntheticData: ExchangeSyntheticTokens
}

interface IProp {
  allSynthetic: ILeverageSynthetic[]
  pairs: BorrowedPair[]
  userVaults: UserVaults[]
  sending: boolean
  hasError: boolean | undefined
  onClickSubmitButton: () => void
  setActualPair: (synthetic: PublicKey, collateral: PublicKey, vaultType: number) => void
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
  shortPairs: ILeveragePair[]
  longPairs: ILeveragePair[]
}
export const WrappedLeverage: React.FC<IProp> = ({
  allSynthetic,
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
  noWalletHandler,
  shortPairs,
  longPairs
}) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState('500')
  const [liquidationPriceTo, setLiquidationPriceTo] = React.useState(0)
  const [liquidationPriceFrom, setLiquidationPriceFrom] = React.useState(0)
  const [minCRatio, setMinCRatio] = React.useState<number>(1)
  const [leverageType, setLeverageType] = React.useState<string>('short')

  // const changeCRatio = (nr: string) => {
  //   setCRatio(nr)
  // }
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [leverageIndex, setLeverageIndex] = React.useState<number | null>(pairs.length ? 0 : null)

  // const changeValueFromTable = (collSymbol: string, synthSymbol: string, vaultType: number) => {
  //   const index = allSynthetic.findIndex(element => element.syntheticData.symbol === collSymbol)
  //   const leverageIndex = shortPairs
  //     .concat(longPairs)
  //     .findIndex(element => element.syntheticSymbol === synthSymbol)
  //   setPairIndex(index)
  //   setLeverageIndex(leverageIndex)
  // }

  const onClickRestartButton = () => {}
  React.useEffect(() => {}, [pairIndex])

  React.useEffect(() => {
    if (allSynthetic.length === 0) {
      setPairIndex(null)
    }
  }, [allSynthetic])

  const actionContents: IActionContents = {
    open: (
      <ActionLeverage
        action={'open'}
        liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
        liquidationPriceFrom={liquidationPriceFrom > 0 ? liquidationPriceFrom : 0}
        allSynthetic={allSynthetic}
        leveragePairs={leverageType === 'short' ? shortPairs : longPairs}
        sending={sending}
        pairIndex={pairs.length !== 0 ? pairIndex : null}
        setPairIndex={setPairIndex}
        hasError={hasError}
        vaultAmount={actualVault}
        walletStatus={walletStatus}
        noWalletHandler={noWalletHandler}
        leverageIndex={leverageIndex}
        setLeverageIndex={setLeverageIndex}
      />
    ),
    close: (
      <ActionLeverage
        action={'close'}
        liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
        liquidationPriceFrom={liquidationPriceFrom > 0 ? liquidationPriceFrom : 0}
        allSynthetic={allSynthetic}
        leveragePairs={leverageType === 'short' ? shortPairs : longPairs}
        sending={sending}
        pairIndex={pairs.length !== 0 ? pairIndex : null}
        setPairIndex={setPairIndex}
        hasError={hasError}
        vaultAmount={actualVault}
        walletStatus={walletStatus}
        noWalletHandler={noWalletHandler}
        leverageIndex={leverageIndex}
        setLeverageIndex={setLeverageIndex}
      />
    )
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.actionGrid}>
        <Grid>
          <ActionMenuLeverage
            actionContents={actionContents}
            liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
            cRatio={cRatio}
            onClickSubmitButton={onClickSubmitButton}
            onClickRestartButton={onClickRestartButton}
            minCRatio={minCRatio}
            changeCustomCRatio={(value: string) => {
              setCRatio(value)
            }}
          />
        </Grid>

        {userVaults.length !== 0 ? <BorrowTable userVaults={userVaults} /> : null}
      </Grid>
      <Grid className={classes.borrowInfoGrid}>
        {/* {pairs.length !== 0 && pairIndex !== null ? (
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
            openFee={
              Number(printBN(pairs[pairIndex].openFee.val, pairs[pairIndex].openFee.scale)) * 100
            }
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
            openFee={0}
          />
        )} */}
      </Grid>
    </Grid>
  )
}
