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
import { getLeverageLevel } from '@consts/leverageUtils'
import { SwitchButton } from '../SwitchButton/SwitchButton'
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
  const [minCRatio, setMinCRatio] = React.useState<number>(100)
  const [leverageType, setLeverageType] = React.useState<string>('short')
  const [leverageStatus, setLeverageStatus] = React.useState(false)
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [leverageIndex, setLeverageIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [currentLeverageTable, setCurrentLeverageTable] = React.useState<ILeveragePair[]>(
    leverageType === 'short' ? shortPairs : longPairs
  )
  const onClickRestartButton = () => {}

  React.useEffect(() => {
    if (allSynthetic.length === 0) {
      setPairIndex(null)
    }
  }, [allSynthetic])
  React.useEffect(() => {
    setCurrentLeverageTable(leverageType === 'short' ? shortPairs : longPairs)
  }, [leverageType, leverageIndex])
  React.useEffect(() => {
    if (currentLeverageTable.length > 0 && leverageIndex !== null) {
      setMinCRatio(
        Math.pow(
          Number(
            printBN(
              currentLeverageTable[leverageIndex].collateralRatio.val,
              currentLeverageTable[leverageIndex].collateralRatio.scale
            )
          ) / 100,
          -1
        )
      )
      setActualPair(
        currentLeverageTable[leverageIndex].synthetic,
        currentLeverageTable[leverageIndex].collateral,
        currentLeverageTable[leverageIndex].vaultType
      )
    }
  }, [leverageIndex])

  React.useEffect(() => {
    if (leverageStatus) {
      setLeverageType('long')
    } else {
      setLeverageType('short')
    }
  }, [leverageStatus])

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
        currentLeverage={getLeverageLevel(Number(cRatio))}
        setLiquidationPriceTo={setLiquidationPriceTo}
        setLiquidationPriceFrom={setLiquidationPriceFrom}
        cRatio={cRatio}
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
        currentLeverage={getLeverageLevel(Number(cRatio))}
        setLiquidationPriceTo={setLiquidationPriceTo}
        setLiquidationPriceFrom={setLiquidationPriceFrom}
        cRatio={cRatio}
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
            currentLeverage={getLeverageLevel(Number(cRatio))}
            maxLeverage={getLeverageLevel(Number(minCRatio))}
            switchButton={
              <SwitchButton
                leverStatus={leverageStatus}
                setLeverStatus={setLeverageStatus}
                leverType={leverageType}
              />
            }
          />
        </Grid>

        {userVaults.length !== 0 ? <BorrowTable userVaults={userVaults} /> : null}
      </Grid>
      <Grid className={classes.borrowInfoGrid}>
        {currentLeverageTable.length > 0 && leverageIndex !== null ? (
          <BorrowInfo
            collateralAmount={totalGeneralAmount.totalCollateralAmount.toString()}
            debtAmount={totalGeneralAmount.totalDebtAmount.toString()}
            collateral={currentLeverageTable[leverageIndex].collateralSymbol}
            borrowed={currentLeverageTable[leverageIndex].syntheticSymbol}
            limit={Number(
              printBN(
                currentLeverageTable[leverageIndex].maxBorrow.val.sub(
                  currentLeverageTable[leverageIndex].mintAmount.val
                ),
                currentLeverageTable[leverageIndex].maxBorrow.scale
              )
            )}
            liqRatio={Number(
              Math.pow(
                Number(
                  printBN(
                    currentLeverageTable[leverageIndex].liquidationThreshold.val,
                    currentLeverageTable[leverageIndex].liquidationThreshold.scale
                  )
                ),
                -1
              ) * 100
            )}
            cRatio={
              Math.pow(
                Number(
                  printBN(
                    currentLeverageTable[leverageIndex].collateralRatio.val,
                    currentLeverageTable[leverageIndex].collateralRatio.scale
                  )
                ),
                -1
              ) * 100
            }
            collateralAddress={currentLeverageTable[leverageIndex].collateral}
            borrowedAddress={currentLeverageTable[leverageIndex].synthetic}
            borrowedSign={currentLeverageTable[leverageIndex].syntheticSymbol}
            amountSign={'$'}
            callPrice={printBN(
              currentLeverageTable[leverageIndex].collateralPrice.val,
              currentLeverageTable[leverageIndex].collateralPrice.scale
            )}
            borrPrice={printBN(
              currentLeverageTable[leverageIndex].syntheticPrice.val,
              currentLeverageTable[leverageIndex].syntheticPrice.scale
            )}
            interestRate={printBN(
              currentLeverageTable[leverageIndex].debtInterestRate.val,
              currentLeverageTable[leverageIndex].debtInterestRate.scale - 4
            )}
            openFee={
              Number(
                printBN(
                  currentLeverageTable[leverageIndex].openFee.val,
                  currentLeverageTable[leverageIndex].openFee.scale
                )
              ) * 100
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
        )}
      </Grid>
    </Grid>
  )
}
