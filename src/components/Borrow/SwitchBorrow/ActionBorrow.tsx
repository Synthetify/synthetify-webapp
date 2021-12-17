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
  calculateAvailableBorrowAndWithdraw,
  calculateLiqAndCRatio
} from '../borrowUtils'
import { MAX_U64 } from '@consts/static'
import { ActionType } from '@reducers/vault'
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
    action: ActionType,
    synthetic: PublicKey,
    collateral: PublicKey,
    collateralAmount: BN,
    syntheticAmount: BN
  ) => void
  pairs: BorrowedPair[]
  changeCRatio: (nr: string) => void
  sending: boolean
  onSelectPair: (nr: number) => void
  hasError?: boolean
  vaultAmount: { collateralAmount: Decimal; borrowAmount: Decimal }
  availableTo: BN
  availableFrom: BN
  setLiquidationPriceTo: (nr: number) => void
  setLiquidationPriceFrom: (nr: number) => void
  setAvailableBorrow: (nr: BN) => void
  setAvailableWithdraw: (nr: BN) => void
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
  setLiquidationPriceTo,
  setLiquidationPriceFrom,
  setAvailableBorrow,
  setAvailableWithdraw
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
    if(action==='borrow'){
      setOption(true)
    }
  }
  const onClosePopover = () => {
    setAnchorEl(null)
    setOption(false)
  }
  const [openOption, setOption] = React.useState(false)
  const [customCRatio, setCustomCRatio] = React.useState('')
  const [pairIndex, setPairIndex] = React.useState<number | null>(pairs.length ? 0 : null)
  const [nameSubmitButton, setNameSubmitButton] = React.useState('add')
  const [actionSubmit, setActionSubmit] = React.useState<ActionType>(
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
      repay: 'Repaying',
      none: '---'
    }
    if (sending) {
      return `${actionToNoun[actionSubmit]} in progress`
    }
    const actionToPastNoun: { [key in ActionType]: string } = {
      add: 'added',
      withdraw: 'withdrawn',
      borrow: 'borrowed',
      repay: 'repaid',
      none: '---'
    }
    if (showOperationProgressFinale && !hasError) {
      return `Successfully ${actionToPastNoun[nameSubmitButton.toLowerCase() as ActionType]}`
    }
    if (showOperationProgressFinale && hasError) {
      return `${actionToNoun[actionSubmit]} failed`
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
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }


  }, [sending])

  React.useEffect(() => {
    calculationVauleInput()
  }, [cRatio])

  React.useEffect(() => {
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
    }
  }, [pairIndex])

  React.useEffect(() => {

    if (pairIndex !== null) {
      const availableData = calculateAvailableBorrowAndWithdraw(
        tokenTo,
        tokenFrom,
        cRatio !== '---' ? cRatio : minCRatio.toString(),
        vaultAmount.collateralAmount.val,
        amountCollateral,
        vaultAmount.borrowAmount.val,
        amountBorrow,
        minCRatio.toString()
      )
      setAvailableBorrow(availableData.availableBorrow)
      setAvailableWithdraw(availableData.availableWithdraw)
    }
    
    blockSubmitButton()
    setActionOnSubmitButton()
  }, [
    cRatio,
    amountBorrow,
    amountCollateral,
    pairIndex,
    tokenFrom.priceVal.toString(),
    tokenTo.priceVal.toString(),
    vaultAmount
  ])

  React.useEffect(() => {
    if (pairIndex !== null) {
      const calculateData = calculateLiqAndCRatio(
        action,
        tokenFrom.priceVal,
        amountCollateral,
        vaultAmount.collateralAmount.val,
        tokenTo.priceVal,
        amountBorrow,
        vaultAmount.borrowAmount.val,
        pairs[pairIndex].liquidationThreshold,
        tokenTo.assetScale,
        tokenFrom.assetScale
      )
      setLiquidationPriceTo(calculateData.liquidationTo)
      setLiquidationPriceFrom(calculateData.liquidationFrom)
      setCRatioTo(calculateData.cRatioTo)
      setCRatioFrom(calculateData.cRatioFrom)
    }
  }, [amountBorrow, amountCollateral, pairIndex])

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
        setActionSubmit('add')
        setNameSubmitButton('add')
      }
      if (amountCollateral.isZero() && !amountBorrow.isZero()) {
        setActionSubmit('borrow')
        setNameSubmitButton('borrow')
      }
      if (!amountCollateral.isZero() && !amountBorrow.isZero()) {
        setActionSubmit('borrow')
        setNameSubmitButton('Add/Borrow')
      }
    } else {
      if (!amountCollateral.isZero() && amountBorrow.isZero()) {
        setActionSubmit('withdraw')
        setNameSubmitButton('Withdraw')
      }
      if (amountCollateral.isZero() && !amountBorrow.isZero()) {
        setActionSubmit('repay')
        setNameSubmitButton('Repay')
      }
      if (!amountCollateral.isZero() && !amountBorrow.isZero()) {
        setActionSubmit('repay')
        setNameSubmitButton('Withdraw/Repay')
      }
    }
  }

  const calculationVauleInput = () => {
    if (!amountBorrow.eq(new BN(0))) {
      let amount = new BN(0)
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
        amount = calculateAmountBorrow(
          tokenTo.priceVal,
          tokenTo.assetScale,
          tokenFrom.priceVal,
          tokenFrom.assetScale,
          amountCollateral,
          cRatio
        )
      } else {
        amount = calculateAmountBorrow(
          tokenTo.priceVal,
          tokenTo.assetScale,
          tokenFrom.priceVal,
          tokenFrom.assetScale,
          amountCollateral,
          minCRatio.toString()
        )
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
          tokenTo.priceVal,
          tokenTo.assetScale,
          tokenFrom.priceVal,
          tokenFrom.assetScale,
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
                      changeCRatio('---')
                    } else {
                      setAmountCollateralString(printBN(availableFrom, tokenFrom.assetScale))
                      setMaxBehaviorFrom('number')
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
                  {action==='borrow'? cRatio: minCRatio.toFixed(0)}
                  {cRatio != '---'|| action === 'repay' ? '%' : null}
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
                  setAmountBorrow(availableTo)
                  setMaxBehaviorTo('maxU64')
                  setAmountBorrowString('Max')
                  changeCRatio('---')
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
              <Grid container alignItems='center'>
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
                  actionSubmit,
                  pairIndex != null ? pairs[pairIndex].synthetic : new PublicKey('0'),
                  pairIndex != null ? pairs[pairIndex].collateral : new PublicKey('0'),
                  maxBehaviorFrom === 'maxU64' ? MAX_U64 : amountCollateral,
                  maxBehaviorTo === 'maxU64' ? MAX_U64 : amountBorrow
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
