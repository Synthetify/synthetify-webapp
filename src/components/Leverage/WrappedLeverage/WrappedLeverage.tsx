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
import { OpenLeverage } from '../OpenLeverage/OpenLeverage'
import { LeverageAction, IActionContents } from '../LeverageAction/LeverageAction'
import useStyles from './style'
import { ILeveragePair } from '@reducers/leverage'
import { calculateAmountAfterSwap, calculateFee, getLeverageLevel } from '@consts/leverageUtils'
import { CloseLeverage } from '../CloseLeverage/CloseLeverage'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { calculateAvailableWithdraw } from '@consts/borrowUtils'
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
  onClickOpenButton: (
    action: string,
    vaultSynthetic: PublicKey,
    vaultCollateral: PublicKey,
    actualCollateral: PublicKey,
    amountToken: BN,
    vaultType: number,
    leverage: number
  ) => void
  onClickCloseButton: (
    action: string,
    vaultSynthetic: PublicKey,
    vaultCollateral: PublicKey,
    amountToken: BN,
    vaultType: number,
    leverage: number
  ) => void
  setActualPair: (synthetic: PublicKey, collateral: PublicKey, vaultType: number) => void
  actualVault: {
    collateralAmount: Decimal
    borrowAmount: Decimal
  }
  totalGeneralAmount: {
    totalCollateralAmount: number
    totalDebtAmount: number
  }
  walletStatus: boolean
  noWalletHandler: (warningMessage: string) => void
  shortPairs: ILeveragePair[]
  longPairs: ILeveragePair[]
  assetPrices: { [key: string]: Decimal }
  feeData: Decimal
}
export const WrappedLeverage: React.FC<IProp> = ({
  allSynthetic,
  pairs,
  sending,
  hasError,
  userVaults,
  onClickOpenButton,
  onClickCloseButton,
  setActualPair,
  actualVault,
  totalGeneralAmount,
  walletStatus,
  noWalletHandler,
  shortPairs,
  longPairs,
  assetPrices,
  feeData
}) => {
  const classes = useStyles()
  const [cRatio, setCRatio] = React.useState<string>('500')
  const [amountToken, setAmountToken] = React.useState<BN>(new BN(0))
  const [liquidationPriceTo, setLiquidationPriceTo] = React.useState<number>(0)
  const [minCRatio, setMinCRatio] = React.useState<number>(100)
  const [leverageType, setLeverageType] = React.useState<string>('short')
  const [leverageStatus, setLeverageStatus] = React.useState<boolean>(false)
  const [pairIndex, setPairIndex] = React.useState<number | null>(null)
  const [leverageIndex, setLeverageIndex] = React.useState<number | null>(null)
  const [blockSubmitButton, setBlockSubmitButton] = React.useState<boolean>(true)
  const [blockCloseButton, setBlockCloseButton] = React.useState<boolean>(true)

  const [availableToClosePosition, setAvailableToClosePosition] = React.useState<boolean>(false)
  const [userVaultIndex, setUserVaultIndex] = React.useState<number | null>(null)
  const [closeStatus, setCloseStatus] = React.useState<boolean>(false)
  const [buyingValue, setBuyingValue] = React.useState<number>(0)
  const [showWarning, setShowWarning] = React.useState<boolean>(false)

  const [currentLeverageTable, setCurrentLeverageTable] = React.useState<ILeveragePair[]>(
    leverageType === 'short' ? shortPairs : longPairs
  )
  const [action, setAction] = React.useState('open')
  const [openCloseModal, setOpenCloseModal] = React.useState(false)
  const [fee, setFee] = React.useState<string>('0')
  const onClickResetButton = () => {
    setAmountToken(new BN(0))
    setCRatio('500')
    setLeverageIndex(null)
    setPairIndex(null)
  }
  const [closeAmount, setCloseAmount] = React.useState<BN>(new BN(0))
  const [closePercent, setClosePercent] = React.useState<number>(10)

  const onClickOpenLeverage = () => {
    if (pairIndex !== null && leverageIndex !== null) {
      onClickOpenButton(
        'open',
        currentLeverageTable[leverageIndex].synthetic,
        currentLeverageTable[leverageIndex].collateral,
        allSynthetic[pairIndex].syntheticData.assetAddress,
        amountToken,
        currentLeverageTable[leverageIndex].vaultType,
        Number(getLeverageLevel(Number(cRatio)))
      )
    }
  }
  const onSubmitCloseButton = () => {
    if (
      pairIndex !== null &&
      leverageIndex !== null &&
      userVaultIndex !== null &&
      typeof userVaults[userVaultIndex] !== 'undefined'
    ) {
      onClickCloseButton(
        'close',
        currentLeverageTable[leverageIndex].synthetic,
        currentLeverageTable[leverageIndex].collateral,
        closeAmount,
        currentLeverageTable[leverageIndex].vaultType,
        Number(getLeverageLevel(Number(userVaults[userVaultIndex].cRatio)))
      )
    }
    handleClose()
  }
  const availableClosePosition = (collateral: string, synthetic: string, vaultType: number) => {
    let index = -1
    if (synthetic === 'xUSD') {
      setLeverageType('long')
      index = longPairs.findIndex(
        element =>
          element.collateralSymbol === collateral &&
          element.syntheticSymbol === synthetic &&
          element.vaultType === vaultType
      )
    } else {
      setLeverageType('short')
      index = shortPairs.findIndex(
        element =>
          element.collateralSymbol === collateral &&
          element.syntheticSymbol === synthetic &&
          element.vaultType === vaultType
      )
    }
    setPairIndex(0)
    if (index >= 0) {
      if (
        userVaults.findIndex(
          element =>
            element.collateral === collateral &&
            element.borrowed === synthetic &&
            element.vaultType === vaultType
        ) >= 0
      ) {
        setAvailableToClosePosition(true)
      }

      setLeverageIndex(index)
    } else {
      setAvailableToClosePosition(false)
    }
  }

  const openCloseLeverage = () => {
    if (availableToClosePosition) {
      setOpenCloseModal(true)
      blurContent()
    } else {
      setAction('open')
      noWalletHandler('Open new positions first')
    }
  }
  const closePositionWithTable = (collateral: string, synthetic: string, vaultType: number) => {
    onChangeCloseModal(50)
    availableClosePosition(collateral, synthetic, vaultType)
    setCloseStatus(true)
  }
  const handleClose = () => {
    setCloseStatus(false)
    setAction('open')
    setOpenCloseModal(false)
    unblurContent()
  }
  const onChangeCloseModal = (value: number) => {
    setClosePercent(value)

    setCloseAmount(
      actualVault.borrowAmount.val
        .mul(new BN(Number(value / 100) * 10 ** actualVault.borrowAmount.scale))
        .div(new BN(10 ** actualVault.borrowAmount.scale))
    )
  }

  React.useEffect(() => {
    if (allSynthetic.length === 0) {
      setPairIndex(null)
    }
  }, [allSynthetic])
  React.useEffect(() => {
    setCurrentLeverageTable(leverageType === 'short' ? shortPairs : longPairs)
  }, [leverageType, leverageIndex, pairIndex])
  React.useEffect(() => {
    if (leverageIndex !== null && currentLeverageTable.length > 0) {
      const index = userVaults.findIndex(
        element =>
          element.collateral === currentLeverageTable[leverageIndex].collateralSymbol &&
          element.borrowed === currentLeverageTable[leverageIndex].syntheticSymbol &&
          element.vaultType === currentLeverageTable[leverageIndex].vaultType
      )
      if (index >= 0) {
        setUserVaultIndex(index)
      }
    }
  }, [leverageType, leverageIndex, pairIndex, currentLeverageTable.length, userVaults.length])

  React.useEffect(() => {
    if (currentLeverageTable.length > 0 && leverageIndex !== null) {
      const min =
        Math.pow(
          Number(
            printBN(
              currentLeverageTable[leverageIndex].collateralRatio.val,
              currentLeverageTable[leverageIndex].collateralRatio.scale
            )
          ) / 100,
          -1
        ) * 1.025
      if (min < 163) {
        setMinCRatio(163)
      } else {
        setMinCRatio(min)
      }

      setActualPair(
        currentLeverageTable[leverageIndex].synthetic,
        currentLeverageTable[leverageIndex].collateral,
        currentLeverageTable[leverageIndex].vaultType
      )
      const index = userVaults.findIndex(
        element =>
          leverageIndex !== null &&
          element.collateral === currentLeverageTable[leverageIndex].collateralSymbol &&
          element.borrowed === currentLeverageTable[leverageIndex].syntheticSymbol &&
          element.vaultType === currentLeverageTable[leverageIndex].vaultType
      )
      if (index >= 0) {
        setUserVaultIndex(index)
      }
    }
  }, [leverageIndex, currentLeverageTable.length])

  React.useEffect(() => {
    if (leverageStatus) {
      setLeverageIndex(null)
      setLeverageType('short')
    } else {
      setLeverageIndex(null)
      setLeverageType('long')
    }
  }, [leverageStatus])

  React.useEffect(() => {
    if (closeStatus) {
      openCloseLeverage()
    }
  }, [closeStatus])

  React.useEffect(() => {
    if (currentLeverageTable.length === 0 || leverageIndex === null || pairIndex === null) {
      setBlockSubmitButton(true)
      return
    }
    if (
      !amountToken.eq(new BN(0)) &&
      allSynthetic[pairIndex].syntheticData.balance.gte(amountToken)
    ) {
      setBlockSubmitButton(false)
      return
    }

    setBlockSubmitButton(true)
  }, [amountToken.toString(), leverageIndex, pairIndex, leverageType])

  React.useEffect(() => {
    if (currentLeverageTable.length > 0 && leverageIndex !== null && pairIndex !== null) {
      const collateral = {
        price: assetPrices[allSynthetic[pairIndex].syntheticData.assetAddress.toString()].val,
        publicKey: allSynthetic[pairIndex].syntheticData.assetAddress,
        assetScale: allSynthetic[pairIndex].syntheticData.supply.scale
      }
      const tokenToFee = {
        price: assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()].val,
        publicKey: currentLeverageTable[leverageIndex].synthetic,
        assetScale: currentLeverageTable[leverageIndex].maxBorrow.scale
      }
      const tokenFromFee = {
        price: assetPrices[currentLeverageTable[leverageIndex].collateral.toString()].val,
        publicKey: currentLeverageTable[leverageIndex].collateral,
        assetScale: currentLeverageTable[leverageIndex].collateralAmount.scale
      }
      const openFee = currentLeverageTable[leverageIndex].openFee

      setFee(
        calculateFee(
          collateral,
          tokenToFee,
          tokenFromFee,
          amountToken,
          feeData,
          cRatio,
          minCRatio.toFixed(10),
          openFee
        )
      )
    }
  }, [amountToken.toString(), cRatio, leverageIndex, pairIndex])

  React.useEffect(() => {
    if (
      currentLeverageTable.length > 0 &&
      pairIndex !== null &&
      leverageIndex !== null &&
      userVaultIndex !== null
    ) {
      const synthetic = allSynthetic.find(
        element =>
          element.syntheticData.symbol === currentLeverageTable[leverageIndex].syntheticSymbol
      )
      if (synthetic) {
        if (actualVault.borrowAmount.val.eq(new BN(0))) {
          setBlockCloseButton(true)
          return
        }
        setBlockCloseButton(
          !synthetic.syntheticData.balance
            .add(
              calculateAmountAfterSwap(
                assetPrices[currentLeverageTable[leverageIndex].collateral.toString()].val,
                assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()].val,
                currentLeverageTable[leverageIndex].collateralAmount.scale,
                currentLeverageTable[leverageIndex].maxBorrow.scale,
                calculateAvailableWithdraw(
                  assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()].val,
                  assetPrices[currentLeverageTable[leverageIndex].collateral.toString()].val,
                  currentLeverageTable[leverageIndex].maxBorrow.scale,
                  currentLeverageTable[leverageIndex].collateralAmount.scale,
                  minCRatio.toFixed(12),
                  actualVault.collateralAmount.val,
                  new BN(0),
                  actualVault.borrowAmount.val
                )
                  .mul(
                    new BN(
                      Number(0.9) * 10 ** currentLeverageTable[leverageIndex].collateralAmount.scale
                    )
                  )
                  .div(new BN(10 ** currentLeverageTable[leverageIndex].collateralAmount.scale)),
                feeData
              ).amount
            )
            .gt(
              closeAmount
                .mul(
                  new BN(Number(0.25) * 10 ** currentLeverageTable[leverageIndex].maxBorrow.scale)
                )
                .div(new BN(10 ** currentLeverageTable[leverageIndex].maxBorrow.scale))
            )
        )
        return
      }

      setBlockCloseButton(true)
    }
  }, [closeAmount.toString(), actualVault])
  React.useEffect(() => {
    if (currentLeverageTable.length > 0 && leverageIndex !== null && pairIndex !== null) {
      setShowWarning(
        allSynthetic[pairIndex].syntheticData.symbol !==
          currentLeverageTable[leverageIndex].collateralSymbol
      )
    }
  }, [leverageIndex, pairIndex])
  const actionContents: IActionContents = {
    open: (
      <OpenLeverage
        action={'open'}
        liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
        allSynthetic={allSynthetic}
        leverageType={leverageType}
        leveragePairs={leverageType === 'short' ? shortPairs : longPairs}
        pairIndex={pairs.length !== 0 ? pairIndex : null}
        setPairIndex={setPairIndex}
        vaultAmount={actualVault}
        walletStatus={walletStatus}
        noWalletHandler={noWalletHandler}
        leverageIndex={leverageIndex}
        setLeverageIndex={setLeverageIndex}
        currentLeverage={getLeverageLevel(Number(cRatio))}
        setLiquidationPriceTo={setLiquidationPriceTo}
        cRatio={cRatio}
        amountToken={amountToken}
        setAmountToken={setAmountToken}
        price={{
          collateralPrice:
            currentLeverageTable.length > 0 && leverageIndex !== null
              ? assetPrices[currentLeverageTable[leverageIndex].collateral.toString()]
              : { val: new BN(1000000), scale: 6 },
          syntheticPrice:
            currentLeverageTable.length > 0 && leverageIndex !== null
              ? assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()]
              : { val: new BN(1000000), scale: 6 }
        }}
        buyingValue={buyingValue}
        setBuyingValue={setBuyingValue}
      />
    ),
    close: (
      <CloseLeverage
        open={openCloseModal}
        handleClose={handleClose}
        tokenFrom={
          currentLeverageTable.length > 0 && leverageIndex !== null
            ? currentLeverageTable[leverageIndex].collateralSymbol
            : ''
        }
        tokenTo={
          currentLeverageTable.length > 0 && leverageIndex !== null
            ? currentLeverageTable[leverageIndex].syntheticSymbol
            : ''
        }
        leverage={getLeverageLevel(
          availableToClosePosition &&
            userVaultIndex !== null &&
            typeof userVaults[userVaultIndex] !== 'undefined'
            ? Number(userVaults[userVaultIndex].cRatio)
            : 500
        )}
        onChange={onChangeCloseModal}
        onSubmitButton={onSubmitCloseButton}
        percent={closePercent}
        amount={
          currentLeverageTable.length > 0 && leverageIndex !== null
            ? { val: closeAmount, scale: currentLeverageTable[leverageIndex].maxBorrow.scale }
            : { val: new BN(0), scale: 0 }
        }
        blockButton={blockCloseButton}
      />
    )
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.actionGrid}>
        <Grid>
          <LeverageAction
            actionContents={actionContents}
            liquidationPriceTo={liquidationPriceTo > 0 ? liquidationPriceTo : 0}
            cRatio={cRatio}
            onClickSubmitButton={onClickOpenLeverage}
            onClickResetButton={onClickResetButton}
            minCRatio={minCRatio}
            changeCustomCRatio={(value: string) => {
              setCRatio(value)
            }}
            currentLeverage={getLeverageLevel(Number(cRatio))}
            maxLeverage={getLeverageLevel(Number(minCRatio))}
            setLeverageStatus={setLeverageStatus}
            leverageType={leverageType}
            blockSubmitButton={blockSubmitButton}
            action={action}
            setAction={setAction}
            openCloseLeverage={
              leverageIndex !== null
                ? () => {
                    setCloseStatus(false)
                    closePositionWithTable(
                      currentLeverageTable[leverageIndex].collateralSymbol,
                      currentLeverageTable[leverageIndex].syntheticSymbol,
                      currentLeverageTable[leverageIndex].vaultType
                    )
                  }
                : () => {
                    noWalletHandler('Open new positions first')
                  }
            }
            openCloseModal={openCloseModal}
            sending={sending}
            hasError={hasError}
            fee={fee}
            showWarning={
              currentLeverageTable.length > 0 && pairIndex !== null && leverageIndex !== null
                ? {
                    status: showWarning,
                    tokenFrom: allSynthetic[pairIndex].syntheticData.symbol,
                    tokenTo: currentLeverageTable[leverageIndex].collateralSymbol
                  }
                : { status: false, tokenFrom: ' ', tokenTo: ' ' }
            }
          />
        </Grid>

        {userVaults.filter(element => element.collateral[0] === 'x' && element.borrowed[0] === 'x')
          .length !== 0 ? (
          <BorrowTable
            userVaults={userVaults.filter(
              element => element.collateral[0] === 'x' && element.borrowed[0] === 'x'
            )}
            setValueWithTable={availableClosePosition}
            active={
              currentLeverageTable.length > 0 && leverageIndex !== null
                ? {
                    collateral: currentLeverageTable[leverageIndex].collateralSymbol,
                    synthetic: currentLeverageTable[leverageIndex].syntheticSymbol
                  }
                : undefined
            }
            vaultType={
              currentLeverageTable.length > 0 && leverageIndex !== null
                ? currentLeverageTable[leverageIndex].vaultType
                : -1
            }
            page={'leverage'}
            closePositionWithTable={closePositionWithTable}
          />
        ) : null}
      </Grid>
      <Grid className={classes.borrowInfoGrid}>
        {currentLeverageTable.length > 0 && leverageIndex !== null && pairIndex !== null ? (
          <BorrowInfo
            collateralAmount={totalGeneralAmount.totalCollateralAmount.toString()}
            debtAmount={totalGeneralAmount.totalDebtAmount.toString()}
            collateral={currentLeverageTable[leverageIndex].collateralSymbol}
            chooseCollateral={allSynthetic[pairIndex].syntheticData.symbol}
            borrowed={currentLeverageTable[leverageIndex].syntheticSymbol}
            limit={Number(
              printBN(
                currentLeverageTable[leverageIndex].maxBorrow.val.sub(
                  currentLeverageTable[leverageIndex].mintAmount.val
                ),
                currentLeverageTable[leverageIndex].maxBorrow.scale
              )
            )}
            liqRatio={currentLeverageTable[leverageIndex].liquidationThreshold}
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
            callPrice={assetPrices[currentLeverageTable[leverageIndex].collateral.toString()]}
            borrPrice={
              leverageType === 'short'
                ? assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()]
                : assetPrices[currentLeverageTable[leverageIndex].collateral.toString()]
            }
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
            vaultType={currentLeverageTable[leverageIndex].vaultType}
            page={'leverage'}
            fee={fee}
            buying={buyingValue.toFixed(2)}
          />
        ) : (
          <BorrowInfo
            collateralAmount={totalGeneralAmount.totalCollateralAmount.toString()}
            debtAmount={totalGeneralAmount.totalDebtAmount.toString()}
            collateral={' '}
            chooseCollateral={' '}
            borrowed={' '}
            cRatio={0}
            limit={0}
            liqRatio={{ val: new BN(0), scale: 0 }}
            collateralAddress={DEFAULT_PUBLICKEY}
            borrowedAddress={DEFAULT_PUBLICKEY}
            borrowedSign={' '}
            amountSign={'$'}
            callPrice={{ val: new BN(0), scale: 0 }}
            borrPrice={{ val: new BN(0), scale: 0 }}
            interestRate={'0'}
            openFee={0}
            vaultType={-1}
            page={'leverage'}
          />
        )}
      </Grid>
    </Grid>
  )
}
