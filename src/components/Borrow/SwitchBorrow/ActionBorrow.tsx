import React from 'react'
import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { Grid, Typography, Divider, Popover, Button, Input, Hidden } from '@material-ui/core'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import { BN } from '@project-serum/anchor'
import { printBN, stringToMinDecimalBN } from '@consts/utils'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'
import { PublicKey } from '@solana/web3.js'
import {
  calculateAmountBorrow,
  calculateAvailableBorrowAndWithdraw,
  calculateLiqAndCRatio,
  checkActionIsAvailable,
  getProgressMessage,
  getProgressState,
  setActionOnSubmitButton,
  changeInputSynthetic,
  changeInputCollateral,
  getAssetFromAndTo
} from '../borrowUtils'
import { MAX_U64 } from '@consts/static'
import { ActionType } from '@reducers/vault'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import useStyles from './style'
import { Decimal } from '@synthetify/sdk/lib/exchange'
import classNames from 'classnames'
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
    syntheticAmount: BN,
    vaultType: number
  ) => void
  pairs: BorrowedPair[]
  changeCRatio: (nr: string) => void
  sending: boolean
  pairIndex: number | null
  setPairIndex: (nr: number) => void
  hasError?: boolean
  vaultAmount: { collateralAmount: Decimal; borrowAmount: Decimal }
  availableTo: BN
  availableFrom: BN
  setLiquidationPriceTo: (nr: number) => void
  setLiquidationPriceFrom: (nr: number) => void
  setAvailableBorrow: (nr: BN) => void
  setAvailableWithdraw: (nr: BN) => void
  walletStatus: boolean
  noWalletHandler: () => void
  cRatioStatic: string[]
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
  pairIndex,
  setPairIndex,
  vaultAmount,
  availableTo,
  availableFrom,
  setLiquidationPriceTo,
  setLiquidationPriceFrom,
  setAvailableBorrow,
  setAvailableWithdraw,
  walletStatus,
  noWalletHandler,
  cRatioStatic
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
    if (action === 'borrow') {
      setOption(true)
    }
  }
  const onClosePopover = () => {
    setAnchorEl(null)
    setOption(false)
  }
  const [openOption, setOption] = React.useState(false)
  const [customCRatio, setCustomCRatio] = React.useState('')
  const [nameSubmitButton, setNameSubmitButton] = React.useState('add')
  const [submitMessage, setSubmitMessage] = React.useState('add')
  const [actionSubmit, setActionSubmit] = React.useState<ActionType>(
    action === 'borrow' ? 'add' : 'withdraw'
  )
  const [cRatioTo, setCRatioTo] = React.useState<number | string>(0)
  const [cRatioFrom, setCRatioFrom] = React.useState<number | string>(0)
  const [maxBehaviorTo, setMaxBehaviorTo] = React.useState('number')
  const [maxBehaviorFrom, setMaxBehaviorFrom] = React.useState('number')
  const [tokenFrom, tokenTo] = getAssetFromAndTo(
    pairIndex !== null ? pairs[pairIndex] : null,
    availableFrom,
    availableTo
  )
  const [showOperationProgressFinale, setShowOperationProgressFinale] = React.useState(false)
  const [blockButton, setBlockButton] = React.useState(false)
  const [amountInputTouched, setAmountInputTouched] = React.useState(false)
  const [resultStatus, setResultStatus] = React.useState('none')

  const changeCustomCRatio = () => {
    if (customCRatio && customCRatio >= minCRatio.toFixed(2)) {
      changeCRatio(customCRatio)
      setCustomCRatio(customCRatio)
    } else {
      changeCRatio(minCRatio.toFixed(2))
      setCustomCRatio(minCRatio.toFixed(2))
    }
  }

  const setMaxAmountInputTo = () => {
    if (pairIndex !== null) {
      switch (true) {
        case cRatio === '---' && action === 'borrow':
          setAmountBorrow(availableTo)
          setMaxBehaviorTo('maxU64')
          setAmountBorrowString('Max')
          break
        case cRatio === '---' &&
          action === 'repay' &&
          pairs[pairIndex].syntheticData.balance.gte(vaultAmount.borrowAmount.val):
          setAmountBorrow(availableTo)
          setMaxBehaviorTo('maxU64')
          setAmountBorrowString('Max')
          break
        default: {
          setAmountBorrow(availableTo)
          setMaxBehaviorTo('number')
          setAmountBorrowString(printBN(availableTo, tokenTo.assetScale))
        }
      }

      if (cRatio === '---') {
        if (
          pairs[pairIndex].syntheticData.balance.lte(vaultAmount.borrowAmount.val) &&
          action === 'repay'
        ) {
          setAmountBorrow(availableTo)
          setMaxBehaviorTo('number')
          setAmountBorrowString(printBN(availableTo, tokenTo.assetScale))
          return
        }
        setAmountBorrow(availableTo)
        setMaxBehaviorTo('maxU64')
        setAmountBorrowString('Max')
        return
      }
      setAmountBorrow(availableTo)
      setMaxBehaviorTo('number')
      setAmountBorrowString(printBN(availableTo, tokenTo.assetScale))
    }
  }

  const setMaxAmountInputFrom = () => {
    if (pairIndex !== null) {
      setAmountCollateral(availableFrom)
      if (action !== 'borrow' && cRatio === '---') {
        setAmountCollateralString('Max')
        setMaxBehaviorFrom('maxU64')
      } else {
        setAmountCollateralString(printBN(availableFrom, tokenFrom.assetScale))
        setMaxBehaviorFrom('number')
      }
    }
  }
  const resetValue = () => {
    setAmountBorrowString('')
    setAmountCollateralString('')
    setAmountBorrow(new BN(0))
    setAmountCollateral(new BN(0))
    setMaxBehaviorTo('number')
    setMaxBehaviorFrom('number')
    setAmountInputTouched(false)
  }
  React.useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
    if (!sending || hasError) {
      resetValue()
    }
  }, [sending])

  React.useEffect(() => {
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }
  }, [amountCollateralString, amountBorrowString])

  React.useEffect(() => {
    if (pairIndex !== null) {
      resetValue()
    }
  }, [pairIndex])

  React.useEffect(() => {
    if (!amountCollateral.eq(new BN(0))) {
      const openFeeBN = stringToMinDecimalBN(
        pairIndex !== null
          ? (
              Number(printBN(pairs[pairIndex].openFee.val, pairs[pairIndex].openFee.scale)) * 100
            ).toString()
          : '0'
      )
      const amount = calculateAmountBorrow(
        tokenTo.priceVal,
        tokenTo.assetScale,
        tokenFrom.priceVal,
        tokenFrom.assetScale,
        amountCollateral,
        cRatio !== '---' ? cRatio : minCRatio.toString()
      )
        .mul(new BN(10).pow(new BN(openFeeBN.decimal + 2)))
        .div(new BN(10).pow(new BN(openFeeBN.decimal + 2)).add(openFeeBN.BN))
      setAmountBorrow(amount)
      setAmountBorrowString(printBN(amount, tokenTo.assetScale))
    }
  }, [cRatio])

  React.useEffect(() => {
    if (pairIndex !== null) {
      setMinCRatio(
        Math.pow(
          Number(
            printBN(pairs[pairIndex].collateralRatio.val, pairs[pairIndex].collateralRatio.scale)
          ) / 100,
          -1
        )
      )
      setLiquidationPriceTo(0)
      setLiquidationPriceFrom(0)
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
        minCRatio.toString(),
        (
          Number(printBN(pairs[pairIndex].openFee.val, pairs[pairIndex].openFee.scale)) * 100
        ).toString()
      )
      setAvailableBorrow(availableData.availableBorrow)
      setAvailableWithdraw(availableData.availableWithdraw)
    }
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
    blockSubmitButton()
    const buttonDetails = setActionOnSubmitButton(action, amountCollateral, amountBorrow)
    setActionSubmit(buttonDetails.actionSubmit)
    setNameSubmitButton(buttonDetails.nameSubmitButton)
    if (resultStatus === 'none') {
      setSubmitMessage(buttonDetails.actionSubmit)
    }
  }, [availableFrom, availableTo])

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
  }, [amountBorrow, amountCollateral])

  const blockSubmitButton = () => {
    if (pairIndex === null) {
      setBlockButton(true)
      return
    }
    if (amountCollateral.isZero() && amountBorrow.isZero()) {
      setBlockButton(true)
      return
    }
    setBlockButton(
      !checkActionIsAvailable(
        pairIndex,
        amountCollateral,
        amountBorrow,
        availableFrom,
        availableTo,
        maxBehaviorTo,
        maxBehaviorFrom
      )
    )
  }

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
                setValue={(value: string) => {
                  if (!amountInputTouched) {
                    setAmountInputTouched(true)
                  }
                  if (value.match(/^\d*\.?\d*$/)) {
                    const limitedNumber = value.includes('.')
                      ? value.substr(0, value.indexOf('.')) +
                        value.substr(value.indexOf('.'), tokenFrom.assetScale + 1)
                      : value
                    const inputData = changeInputCollateral(
                      limitedNumber,
                      tokenTo,
                      tokenFrom,
                      cRatio,
                      pairIndex !== null
                        ? (
                            Number(
                              printBN(pairs[pairIndex].openFee.val, pairs[pairIndex].openFee.scale)
                            ) * 100
                          ).toString()
                        : '0'
                    )
                    setMaxBehaviorFrom('number')
                    setAmountCollateral(inputData.amountCollBN)
                    setAmountCollateralString(limitedNumber)
                    if (cRatio !== '---') {
                      setAmountBorrow(inputData.amountBorBN)
                      setAmountBorrowString(inputData.amountBorBNString)
                    }
                  }
                }}
                placeholder={'0.0'}
                onMaxClick={setMaxAmountInputFrom}
                pairs={pairs.map(pair => ({
                  symbol2: pair.syntheticData.symbol,
                  symbol1: pair.collateralData.symbol
                }))}
                current={pairIndex !== null ? tokenFrom.symbol : null}
                onSelect={(chosen: number) => {
                  setPairIndex(chosen)
                }}
                className={classes.input}
                selectText='Select'
                walletConnected={walletStatus}
                noWalletHandler={noWalletHandler}
              />
              <Typography
                className={classes.desc}
                onClick={setMaxAmountInputFrom}
                style={{ cursor: 'pointer' }}>
                Available collateral:{' '}
                <AnimatedNumber
                  value={printBN(availableFrom, tokenFrom.assetScale)}
                  formatValue={(value: number) => value.toFixed(10)}
                  duration={300}
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
                      Number(cRatio === '---' && cRatioTo !== 'NaN' ? cRatioTo : cRatio) >=
                      Number(minCRatio)
                        ? colors.green.button
                        : colors.red.error
                  }}>
                  {action === 'borrow' ? (
                    cRatio === '---' ? (
                      cRatioTo === 'NaN' ? (
                        cRatio
                      ) : cRatioTo < 9999 ? (
                        cRatioTo
                      ) : (
                        <AllInclusiveIcon
                          style={{
                            height: '0.75em',
                            fontWeight: 900,
                            stroke: 'currentcolor',
                            strokeWidth: 1.5
                          }}
                        />
                      )
                    ) : (
                      cRatio
                    )
                  ) : (
                    minCRatio.toFixed(2)
                  )}
                  {'%'}
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
                    {cRatioStatic.map(element =>
                      Number(element) > minCRatio ? (
                        <Button
                          key={element}
                          className={classes.popoverButton}
                          value={Number(element)}
                          onClick={event => changeCRatio(event.currentTarget.value)}>
                          {element}%
                        </Button>
                      ) : null
                    )}
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
              setValue={(value: string) => {
                if (!amountInputTouched) {
                  setAmountInputTouched(true)
                }
                if (value.match(/^\d*\.?\d*$/)) {
                  const limitedNumber = value.includes('.')
                    ? value.substr(0, value.indexOf('.')) +
                      value.substr(value.indexOf('.'), tokenTo.assetScale + 1)
                    : value
                  const inputData = changeInputSynthetic(limitedNumber, tokenTo, tokenFrom, cRatio)
                  setMaxBehaviorTo('number')
                  setAmountBorrow(inputData.amountBorBN)
                  setAmountBorrowString(limitedNumber)
                  if (cRatio !== '---') {
                    setAmountCollateralString(inputData.amountCollString)
                    setAmountCollateral(inputData.amountCollBN)
                  }
                }
              }}
              placeholder={'0.0'}
              onMaxClick={setMaxAmountInputTo}
              pairs={pairs.map(pair => ({
                symbol2: pair.syntheticData.symbol,
                symbol1: pair.collateralData.symbol
              }))}
              current={pairIndex !== null ? tokenTo.symbol : null}
              onSelect={(chosen: number) => {
                setPairIndex(chosen)
              }}
              className={classes.input}
              selectText='Select'
              walletConnected={walletStatus}
              noWalletHandler={noWalletHandler}
            />
            <Typography
              className={classes.desc}
              onClick={setMaxAmountInputTo}
              style={{ cursor: 'pointer' }}>
              {action === 'borrow' ? 'Available to borrow: ' : 'Available to repay: '}
              <AnimatedNumber
                value={printBN(availableTo, tokenTo.assetScale)}
                formatValue={(value: string) => Number(value).toFixed(10)}
                duration={300}
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
                    /* eslint-disable @typescript-eslint/indent */
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
                  duration={300}
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
                      liquidationPriceFrom >= liquidationPriceTo
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
                  <AnimatedNumber
                    value={liquidationPriceTo}
                    formatValue={(value: number) => value.toFixed(3)}
                    duration={300}
                  />{' '}
                  $
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Typography className={classes.infoTitle}>Collateral ratio:</Typography>
              <Grid container alignItems='center'>
                <Grid className={classes.infoValueFrom}>
                  <Grid container direction='row' alignItems='center'>
                    {cRatioFrom < 9999 ? (
                      cRatioFrom
                    ) : (
                      <AllInclusiveIcon style={{ height: '0.75em' }} />
                    )}
                    {cRatioFrom !== 'NaN' ? '%' : ''}
                  </Grid>
                </Grid>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      Number(cRatioTo === 'NaN' ? minCRatio : cRatioTo) >= Number(cRatioFrom)
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Grid className={classes.infoValueTo}>
                  <Grid container direction='row' alignItems='center'>
                    {cRatioTo < 9999 ? (
                      cRatioTo
                    ) : (
                      <AllInclusiveIcon
                        style={{
                          height: '0.75em',
                          fontWeight: 900,
                          stroke: 'currentcolor',
                          strokeWidth: 1.2
                        }}
                      />
                    )}
                    {cRatioTo !== 'NaN' ? '%' : ''}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttonAction} container>
            <Progress
              state={getProgressState(
                sending,
                hasError,
                showOperationProgressFinale,
                blockButton,
                amountInputTouched,
                resultStatus,
                setResultStatus
              )}
              message={getProgressMessage(
                sending,
                hasError,
                actionSubmit,
                showOperationProgressFinale,
                submitMessage,
                blockButton,
                amountInputTouched,
                resultStatus
              )}
            />
            <OutlinedButton
              name={nameSubmitButton}
              color='secondary'
              className={classNames(
                classes.actionButton,
                action === 'repay' ? classes.fontRepay : null
              )}
              onClick={() => {
                onClickSubmitButton(
                  actionSubmit,
                  pairIndex !== null ? pairs[pairIndex].synthetic : new PublicKey('0'),
                  pairIndex !== null ? pairs[pairIndex].collateral : new PublicKey('0'),
                  maxBehaviorFrom === 'maxU64' ? MAX_U64 : amountCollateral,
                  maxBehaviorTo === 'maxU64' ? MAX_U64 : amountBorrow,
                  pairIndex !== null ? pairs[pairIndex].vaultType : 0
                )
              }}
              disabled={blockButton}
              fontWeight={900}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
