import React from 'react'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { Grid, Typography, Divider, Popover, Button, Input, Hidden } from '@material-ui/core'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import { Decimal, Vault } from '@synthetify/sdk/lib/exchange'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import { printBN, printBNtoBN, stringToMinDecimalBN, transformBN } from '@consts/utils'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'
import { PublicKey } from '@solana/web3.js'
import {
  calculateCRatio,
  calculateAmountCollateral,
  calculateAmountBorrow,
  calculateAvailableWithdraw
} from '../borrowUtils'
import { MAX_U64 } from '@consts/static'

type ActionType = 'add' | 'withdraw' | 'borrow' | 'repay'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
interface IProp {
  action: string
  cRatio: string
  liquidationPriceTo: number
  liquidationPriceFrom: number
  onClickSubmitButton: (
    action: string,
    synthetic: PublicKey,
    amountBorrow: BN,
    collateral: PublicKey,
    amountCollateral: BN
  ) => void
  pairs: BorrowedPair[]
  changeCRatio: (nr: string) => void
  sending: boolean
  onSelectPair: (nr: number) => void
  hasError: boolean | undefined
  vaultAmount: { collateralAmount: Decimal; borrowAmount: Decimal }
  availableTo: BN
  availableFrom: BN
  calculateLiquidation: (
    action: string,
    priceFrom: BN,
    amountCollateral: BN,
    vaultAmountCollatera: BN,
    priceTo: BN,
    amountBorrow: BN,
    vaultAmountBorrow: BN,
    liqThreshold: Decimal,
    assetScaleTo: number,
    assetScaleFrom: number
  ) => void
  calculateAvailableBorrowAndWithdraw: (
    assetTo: AssetPriceData,
    assetFrom: AssetPriceData,
    cRatio: string,
    vaultEntryAmountCollateral: BN,
    amountCollateral: BN,
    vaultEntryAmountBorrow: BN,
    amountBorrow: BN
  ) => void
}
export const ActionBorrow: React.FC<IProp> = ({
  action,
  cRatio,
  liquidationPriceTo,
  liquidationPriceFrom,
  onClickSubmitButton,
  pairs,
  changeCRatio,
  sending,
  hasError,
  onSelectPair,
  vaultAmount,
  availableTo,
  availableFrom,
  calculateLiquidation,
  calculateAvailableBorrowAndWithdraw
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [amountBorrow, setAmountBorrow] = React.useState<BN>(new BN(0))
  const [amountCollateral, setAmountCollateral] = React.useState<BN>(new BN(0))
  const [amountBorrowString, setAmountBorrowString] = React.useState('')
  const [amountCollateralString, setAmountCollateralString] = React.useState('')
  const [minCRatio, setMinCRatio] = React.useState<number>(1)
  const onClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setOption(true)
  }
  const onClosePopover = () => {
    setAnchorEl(null)
    setOption(false)
  }
  const [openOption, setOption] = React.useState(false)
  const [customCRatio, setCustomCRatio] = React.useState('')
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [nameSubmitButton, setNameSubmitButton] = React.useState<ActionType>(
    action === 'borrow' ? 'add' : 'withdraw'
  )
  const [cRatioTo, setCRatioTo] = React.useState<number | string>(0)
  const [cRatioFrom, setCRatioFrom] = React.useState<number | string>(0)
  const [maxBehaviorTo, setMaxBehaviorTo] = React.useState('number')
  const [maxBehaviorFrom, setMaxBehaviorFrom] = React.useState('number')
  const getAssetInAndFor = (pair: BorrowedPair | null): [AssetPriceData, AssetPriceData] => {
    if (pair === null) {
      return [
        {
          priceVal: new BN(0),
          assetScale: 0,
          symbol: null,
          maxAvailable: new BN(0),
          balance: new BN(0)
        },
        {
          priceVal: new BN(0),
          assetScale: 0,
          symbol: null,
          maxAvailable: new BN(0),
          balance: new BN(0)
        }
      ]
    }
    const collateral: AssetPriceData = {
      priceVal: pair.collateralData.price.val,
      assetScale: pair.collateralData.reserveBalance.scale,
      symbol: pair.collateralData.symbol,
      maxAvailable: availableFrom,
      balance: pair.collateralData.balance
    }

    const synthetic: AssetPriceData = {
      priceVal: pair.syntheticData.price.val,
      assetScale: pair.syntheticData.supply.scale,
      symbol: pair.syntheticData.symbol,
      maxAvailable: availableTo,
      balance: pair.syntheticData.balance
    }

    return [collateral, synthetic]
  }
  const [tokenFrom, tokenTo] = getAssetInAndFor(pairIndex !== null ? pairs[pairIndex] : null)

  const changeCustomCRatio = () => {
    if (customCRatio) {
      changeCRatio(customCRatio)
      setCustomCRatio(customCRatio)
    } else {
      changeCRatio(minCRatio.toFixed(2))
      setCustomCRatio(minCRatio.toFixed(2))
    }
  }
  const getProgressState = () => {
    if (sending) {
      return 'progress'
    }
    if (showOperationProgressFinale && hasError) {
      return 'failed'
    }

    if (showOperationProgressFinale && !hasError) {
      return 'success'
    }
    if (blockButton) {
      return 'failed'
    }
    return 'none'
  }
  const getProgressMessage = () => {
    const actionToNoun: { [key in ActionType]: string } = {
      add: 'Adding',
      withdraw: 'Withdrawing',
      borrow: 'Borrowing',
      repay: 'Repaying'
    }
    if (sending) {
      return `${actionToNoun[nameSubmitButton]} in progress`
    }
    const actionToPastNoun: { [key in ActionType]: string } = {
      add: 'added',
      withdraw: 'withdrawn',
      borrow: 'borrowed',
      repay: 'Repaid'
    }
    if (showOperationProgressFinale && !hasError) {
      return `Successfully ${actionToPastNoun[nameSubmitButton.toLowerCase() as ActionType]}`
    }
    if (showOperationProgressFinale && hasError) {
      return `${actionToNoun[nameSubmitButton]} failed`
    }
    if (blockButton) {
      return 'Invalid value'
    }
  }
  const [showOperationProgressFinale, setShowOperationProgressFinale] = React.useState(false)

  React.useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
  }, [sending])

  React.useEffect(() => {
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }
    if (pairIndex !== null) {
      setMinCRatio(
        Number(
          Math.pow(
            Number(
              printBN(pairs[pairIndex].collateralRatio.val, pairs[pairIndex].collateralRatio.scale)
            ) / 100,
            -1
          ).toFixed(2)
        )
      )
      calculateAvailableBorrowAndWithdraw(
        tokenTo,
        tokenFrom,
        cRatio !== '---' ? cRatio : minCRatio.toString(),
        vaultAmount.collateralAmount.val,
        amountCollateral,
        vaultAmount.borrowAmount.val,
        amountBorrow
      )
    }

    calculateLiquidation(
      action,
      tokenFrom.priceVal,
      amountCollateral,
      vaultAmount.collateralAmount.val,
      tokenTo.priceVal,
      amountBorrow,
      vaultAmount.borrowAmount.val,
      pairIndex !== null ? pairs[pairIndex].liquidationThreshold : { val: new BN(1), scale: 1 },
      tokenTo.assetScale,
      tokenFrom.assetScale
    )
    const ratioTo = calculateCRatio(
      tokenTo,
      action === 'borrow'
        ? amountBorrow.add(vaultAmount.borrowAmount.val)
        : vaultAmount.borrowAmount.val.sub(amountBorrow),
      tokenFrom,
      action === 'borrow'
        ? amountCollateral.add(vaultAmount.collateralAmount.val)
        : vaultAmount.collateralAmount.val.sub(amountCollateral)
    )
    if (ratioTo === 'NaN' || ratioTo.lt(new BN(0))) {
      setCRatioTo('NaN')
    } else {
      setCRatioTo(Math.floor(Number(printBN(ratioTo, 0)) / 100))
    }
    const ratioFrom = calculateCRatio(
      tokenTo,
      vaultAmount.borrowAmount.val,
      tokenFrom,
      vaultAmount.collateralAmount.val
    )
    if (ratioFrom === 'NaN') {
      setCRatioFrom(ratioFrom)
    } else {
      setCRatioFrom(Math.floor(Number(printBN(ratioFrom, 0)) / 100))
    }

    blockSubmitButton()
    setActionOnSubmitButton()
  }, [
    cRatio,
    minCRatio,
    amountBorrow,
    amountCollateral,
    pairIndex,
    tokenFrom.priceVal.toString(),
    tokenTo.priceVal.toString(),
    vaultAmount,
    sending,
    hasError
  ])

  React.useEffect(() => {
    calculationVauleInput()

    blockSubmitButton()
    setActionOnSubmitButton()
  }, [cRatio])

  const [blockButton, setBlockButton] = React.useState(false)
  const blockSubmitButton = () => {
    if (pairIndex === null) {
      setBlockButton(true)
    } else {
      if (amountCollateral.isZero() && amountBorrow.isZero()) {
        setBlockButton(true)
      } else {
        setBlockButton(!checkActionIsAvailable())
      }
    }
  }
  const checkActionIsAvailable = () => {
    if (pairIndex === null) {
      return false
    }
    if (!amountCollateral.isZero())
      if (availableFrom.lt(amountCollateral)) {
        return false
      }
    if (!amountBorrow.isZero())
      if (availableTo.lt(amountBorrow)) {
        return false
      }

    return true
  }
  const setActionOnSubmitButton = () => {
    if (action === 'borrow') {
      if (!amountCollateral.isZero() && amountBorrow.isZero()) {
        setNameSubmitButton('add')
      }
      if (amountCollateral.isZero() && !amountBorrow.isZero()) {
        setNameSubmitButton('borrow')
      }
      if (!amountCollateral.isZero() && !amountBorrow.isZero()) {
        setNameSubmitButton('borrow')
      }
    } else {
      if (!amountCollateral.isZero() && amountBorrow.isZero()) {
        setNameSubmitButton('withdraw')
      }
      if (amountCollateral.isZero() && !amountBorrow.isZero()) {
        setNameSubmitButton('repay')
      }
      if (!amountCollateral.isZero() && !amountBorrow.isZero()) {
        setNameSubmitButton('repay')
      }
    }
  }

  const calculationVauleInput = () => {
    if (!amountBorrow.eq(new BN(0))) {
      let amount
      if (cRatio != '---') {
        amount = calculateAmountCollateral(tokenTo, tokenFrom, amountBorrow, cRatio)
      } else {
        amount = calculateAmountCollateral(tokenTo, tokenFrom, amountBorrow, minCRatio.toString())
      }

      setAmountCollateral(amount)
      setAmountCollateralString(printBN(amount, tokenFrom.assetScale))
    } else if (!amountCollateral.eq(new BN(0))) {
      let amount
      if (cRatio != '---') {
        amount = calculateAmountBorrow(tokenTo, tokenFrom, amountCollateral, cRatio)
      } else {
        amount = calculateAmountBorrow(tokenTo, tokenFrom, amountCollateral, minCRatio.toString())
      }
      setAmountBorrow(amount)
      setAmountBorrowString(printBN(amount, tokenTo.assetScale))
    }
  }

  const changeInputCollateral = (value: string) => {
    if (value.match(/^\d*\.?\d*$/)) {
      const BNValue = stringToMinDecimalBN(value)
      const difDecimal = tokenFrom.assetScale - BNValue.decimal
      setMaxBehaviorFrom('number')
      setAmountCollateral(BNValue.BN.mul(new BN(10).pow(new BN(difDecimal))))
      setAmountCollateralString(value)

      if (cRatio != '---') {
        const amount = calculateAmountBorrow(
          tokenTo,
          tokenFrom,
          printBNtoBN(value, tokenFrom.assetScale),
          cRatio
        )
        setAmountBorrow(amount)
        setAmountBorrowString(printBN(amount, tokenTo.assetScale))
      }
    }
  }
  const changeInputSynthetic = (value: string) => {
    if (value.match(/^\d*\.?\d*$/)) {
      const BNValue = stringToMinDecimalBN(value)
      const difDecimal = tokenTo.assetScale - BNValue.decimal
      setMaxBehaviorTo('number')
      setAmountBorrow(BNValue.BN.mul(new BN(10).pow(new BN(difDecimal))))
      setAmountBorrowString(value)
      if (cRatio != '---') {
        const amount = calculateAmountCollateral(
          tokenTo,
          tokenFrom,
          printBNtoBN(value, tokenTo.assetScale),
          cRatio
        )
        setAmountCollateralString(printBN(amount, tokenFrom.assetScale))

        setAmountCollateral(amount)
      }
    }
  }
  const cRatioStatic = ['300', '400', '550', '750', '1000']
  return (
    <Grid>
      <Grid className={classes.root}>
        <Grid className={classes.middleGrid}>
          <Grid className={classes.collateralContainer}>
            <Grid style={{ width: '100%' }}>
              <Typography className={classes.title}>
                {action === 'borrow' ? 'Add collateral' : 'Withdraw collateral'}
              </Typography>
              <ExchangeAmountInput
                value={amountCollateralString}
                setValue={changeInputCollateral}
                placeholder={'0.0'}
                onMaxClick={() => {
                  if (pairIndex !== null) {
                    setAmountCollateral(availableFrom)

                    if (action != 'borrow') {
                      setAmountCollateralString('Max')
                      setMaxBehaviorFrom('maxU64')
                    } else {
                      setAmountCollateralString(printBN(availableFrom, tokenTo.assetScale))
                      setMaxBehaviorFrom('number')
                    }
                    if (cRatio != '---') {
                      const tmp = calculateAmountBorrow(tokenTo, tokenFrom, availableFrom, cRatio)
                      setAmountBorrow(tmp)
                      setAmountBorrowString(printBN(tmp, tokenTo.assetScale))
                    }
                  }
                }}
                pairs={pairs.map(pair => ({
                  symbol1: pair.syntheticData.symbol,
                  symbol2: pair.collateralData.symbol
                }))}
                current={pairIndex !== null ? tokenFrom.symbol : null}
                onSelect={(chosen: number) => {
                  setPairIndex(chosen)
                  onSelectPair(chosen)
                }}
                className={classes.input}
                selectText='Select'
              />
              <Typography className={classes.desc}>
                Available collateral:{' '}
                <AnimatedNumber
                  value={printBN(availableFrom, tokenFrom.assetScale)}
                  formatValue={(value: number) => value.toFixed(4)}
                />
              </Typography>
            </Grid>
            <Grid className={classes.cRatioGrid}>
              <Grid className={classes.cRatioBack}>
                <Typography className={classes.cRatioTitle}>
                  <Hidden xsDown>Collateral Ratio</Hidden>
                  <Hidden smUp>C-Ratio</Hidden>
                </Typography>
                <Divider />
                <Button
                  className={classes.cRatioButton}
                  classes={{ endIcon: classes.endIcon }}
                  endIcon={<DownIcon />}
                  onClick={onClickPopover}
                  style={{
                    color:
                      cRatio != '---' && Number(cRatio) >= Number(minCRatio)
                        ? colors.green.button
                        : colors.red.error
                  }}>
                  {cRatio}
                  {cRatio != '---' ? '%' : null}
                </Button>
                <Popover
                  classes={{ paper: classes.popover }}
                  open={openOption}
                  anchorEl={anchorEl}
                  onClose={onClosePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                  }}>
                  <Grid className={classes.popoverBack}>
                    <Button
                      className={classes.popoverButton}
                      value={'---'}
                      onClick={event => changeCRatio(event.currentTarget.value)}>
                      ---
                    </Button>
                    <Button
                      className={classes.popoverButton}
                      value={minCRatio}
                      onClick={() => changeCRatio(minCRatio.toFixed(2))}>
                      Min: <span className={classes.minValue}>{minCRatio.toFixed(0)}%</span>
                    </Button>
                    <Input
                      className={classes.popoverInput}
                      classes={{ input: classes.customInput }}
                      disableUnderline
                      value={customCRatio}
                      placeholder={'custom'}
                      onChange={event => {
                        if (event.currentTarget.value.match(/^\d/)) {
                          setCustomCRatio(event.currentTarget.value)
                        }
                      }}
                      onBlur={changeCustomCRatio}
                    />
                    {cRatioStatic.map(element => {
                      if (Number(element) > minCRatio) {
                        return (
                          <Button
                            className={classes.popoverButton}
                            value={Number(element)}
                            onClick={event => changeCRatio(event.currentTarget.value)}>
                            {element}%
                          </Button>
                        )
                      }
                    })}
                  </Grid>
                </Popover>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ width: '100%' }}>
            <Typography className={classes.title}>
              {' '}
              {action === 'borrow' ? 'Max borrow' : 'Repay'}
            </Typography>
            <ExchangeAmountInput
              value={amountBorrowString}
              setValue={changeInputSynthetic}
              placeholder={'0.0'}
              onMaxClick={() => {
                if (pairIndex !== null) {
                  console.log(availableTo.toString())
                  setAmountBorrow(availableTo)
                  setMaxBehaviorTo('maxU64')
                  setAmountBorrowString('Max')
                  if (cRatio != '---') {
                    const tmp = calculateAmountCollateral(tokenTo, tokenFrom, availableTo, cRatio)
                    setAmountCollateral(tmp)
                    setAmountCollateralString(printBN(tmp, tokenFrom.assetScale))
                  }
                }
              }}
              pairs={pairs.map(pair => ({
                symbol1: pair.syntheticData.symbol,
                symbol2: pair.collateralData.symbol
              }))}
              current={pairIndex !== null ? tokenTo.symbol : null}
              onSelect={(chosen: number) => {
                setPairIndex(chosen)
                onSelectPair(chosen)
              }}
              className={classes.input}
              selectText='Select'
            />
            <Typography className={classes.desc}>
              {action === 'borrow' ? 'Available to borrow: ' : 'Available to repay: '}
              <AnimatedNumber
                value={printBN(availableTo, tokenTo.assetScale)}
                formatValue={(value: string) => Number(value).toFixed(6)}
              />
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid className={classes.bottomGrid}>
          <Grid className={classes.bottomInfo}>
            <Grid>
              <Typography className={classes.infoTitle}>Interest rate:</Typography>
              <Typography className={classes.infoValueTo}>
                <AnimatedNumber
                  value={
                    pairIndex !== null
                      ? Number(
                          printBN(
                            pairs[pairIndex].debtInterestRate.val,
                            pairs[pairIndex].debtInterestRate.scale
                          )
                        ) * 100
                      : 0
                  }
                  formatValue={(value: number) => value.toFixed(2)}
                />
                %
              </Typography>
            </Grid>
            <Grid>
              <Typography className={classes.infoTitle}>Liquidation price:</Typography>

              <Grid container alignItems='center'>
                <Typography className={classes.infoValueFrom}>
                  {liquidationPriceFrom.toFixed(3)}$
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceTo >= liquidationPriceFrom
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
                  <AnimatedNumber
                    value={liquidationPriceTo}
                    formatValue={(value: number) => value.toFixed(3)}
                  />{' '}
                  $
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Typography className={classes.infoTitle}>Collateral ratio:</Typography>
              <Grid container>
                <Typography className={classes.infoValueFrom}>
                  {cRatioFrom}
                  {cRatioFrom != 'NaN' ? '%' : ''}
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      cRatio != '---' && Number(cRatio) >= Number(minCRatio)
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
                  {' '}
                  {cRatioTo}
                  {cRatioTo != 'NaN' ? '%' : ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttonAction} container>
            <Progress state={getProgressState()} message={getProgressMessage()} />
            <OutlinedButton
              name={nameSubmitButton}
              color='secondary'
              className={classes.actionButton}
              onClick={() => {
                onClickSubmitButton(
                  nameSubmitButton,
                  pairIndex != null ? pairs[pairIndex].synthetic : new PublicKey('0'),
                  maxBehaviorTo === 'maxU64' ? MAX_U64 : amountBorrow,
                  pairIndex != null ? pairs[pairIndex].collateral : new PublicKey('0'),
                  maxBehaviorFrom === 'maxU64' ? MAX_U64 : amountCollateral
                )
              }}
              disabled={blockButton}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
