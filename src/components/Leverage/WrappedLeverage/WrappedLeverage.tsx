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
import { calculateFee, getLeverageLevel } from '@consts/leverageUtils'
import { CloseLeverage } from '../CloseLeverage/CloseLeverage'
import { blurContent, unblurContent } from '@consts/uiUtils'
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
  onClickSubmitButton: (
    action: string,
    vaultSynthetic: PublicKey,
    vaultCollateral: PublicKey,
    actualCollateral: PublicKey,
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
  onClickSubmitButton,
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
  const onClickOpenLeverage = () => {
    if (pairIndex !== null && leverageIndex !== null) {
      onClickSubmitButton(
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

  const openCloseLeverage = () => {
    if (true) {
      setOpenCloseModal(true)
      blurContent()
    } else {
      setAction('open')
      noWalletHandler('Open new positions first')
    }
  }

  const handleClose = () => {
    setAction('open')
    setOpenCloseModal(false)
    unblurContent()
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
        ) * 1.02
      )
      setActualPair(
        currentLeverageTable[leverageIndex].synthetic,
        currentLeverageTable[leverageIndex].collateral,
        currentLeverageTable[leverageIndex].vaultType
      )
    }
  }, [leverageIndex, pairIndex])

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
  }, [amountToken.toString(), leverageIndex, pairIndex])

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
      />
    ),
    close: (
      <CloseLeverage
        open={openCloseModal}
        handleClose={handleClose}
        tokenFrom={'xUSD'}
        tokenTo={'xETH'}
        leverage={'3.33'}
        percent={50}
        amount={'0.0052564'}
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
            openCloseLeverage={openCloseLeverage}
            openCloseModal={openCloseModal}
            sending={sending}
            hasError={hasError}
            fee={fee}
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
              assetPrices[currentLeverageTable[leverageIndex].collateral.toString()].val,
              assetPrices[currentLeverageTable[leverageIndex].collateral.toString()].scale
            )}
            borrPrice={printBN(
              assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()].val,
              assetPrices[currentLeverageTable[leverageIndex].synthetic.toString()].scale
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
            vaultType={currentLeverageTable[leverageIndex].vaultType}
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
            vaultType={-1}
          />
        )}
      </Grid>
    </Grid>
  )
}
