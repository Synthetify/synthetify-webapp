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
import { printBN, printBNtoBN, stringToMinDecimalBN, transformBN } from '@consts/utils'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'
import { PublicKey } from '@solana/web3.js'
import {
  calculateCRatio,
  calculateAmountCollateral,
  calculateAmountBorrow,
  calculateAvailableBorrowAndWithdraw,
  calculateLiqAndCRatio,
  checkActionIsAvailable,
  getProgressMessage,
  getProgressState,
  setActionOnSubmitButton,
  changeInputSynthetic,
  changeInputCollateral
} from '../borrowUtils'
import { MAX_U64 } from '@consts/static'
import { ActionType } from '@reducers/vault'
import AllInclusiveIcon from '@material-ui/icons/AllInclusive'
import AllInclusiveOutlinedIcon from '@material-ui/icons/AllInclusiveOutlined'
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded'
import useStyles from './style'
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
  noWalletHandler
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
      changeCRatio(minCRatio.toString())
      setCustomCRatio(minCRatio.toFixed(2))
    }
  }

  const [showOperationProgressFinale, setShowOperationProgressFinale] = React.useState(false)

  const setMaxAmountInputTo = () => {
    if (pairIndex !== null) {
      if (Number(cRatio).toFixed(2) !== minCRatio.toFixed(2)) {
        setAmountBorrow(availableTo)
        setMaxBehaviorTo('maxU64')
        setAmountBorrowString('Max')
      } else {
        setAmountBorrow(availableTo)
        setMaxBehaviorTo('number')
        setAmountBorrowString(printBN(availableTo, tokenTo.assetScale))
      }
    }
  }

  const setMaxAmountInputFrom = () => {
    if (pairIndex !== null) {
      setAmountCollateral(availableFrom)
      if (action !== 'borrow' && Number(cRatio).toFixed(2) !== minCRatio.toFixed(2)) {
        setAmountCollateralString('Max')
        setMaxBehaviorFrom('maxU64')
      } else {
        setAmountCollateralString(printBN(availableFrom, tokenFrom.assetScale))
        setMaxBehaviorFrom('number')
      }
    }
  }
  React.useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
    if (showOperationProgressFinale) {
      setShowOperationProgressFinale(false)
    }
    if (!sending) {
      setAmountBorrowString('')
      setAmountCollateralString('')
      setAmountBorrow(new BN(0))
      setAmountCollateral(new BN(0))
    }
  }, [sending])

  React.useEffect(() => {
    if (!amountCollateral.eq(new BN(0))) {
      let amount
      if (cRatio !== '---') {
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
        minCRatio.toString()
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

  const [blockButton, setBlockButton] = React.useState(false)
  const blockSubmitButton = () => {
    if (pairIndex === null) {
      setBlockButton(true)
    } else {
      if (amountCollateral.isZero() && amountBorrow.isZero()) {
        setBlockButton(true)
      } else {
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
    }
  }

  const cRatioStatic = ['300', '400', '500', '750', '1000']
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
                  if (value.match(/^\d*\.?\d*$/)) {
                    const inputData = changeInputCollateral(value, tokenTo, tokenFrom, cRatio)
                    setMaxBehaviorFrom('number')
                    setAmountCollateral(inputData.amountCollBN)
                    setAmountCollateralString(value)
                    if (cRatio !== '---') {
                      setAmountBorrow(inputData.amountBorBN)
                      setAmountBorrowString(inputData.amountBorBNString)
                    }
                  }
                }}
                placeholder={'0.0'}
                onMaxClick={setMaxAmountInputFrom}
                pairs={pairs.map(pair => ({
                  symbol1: pair.syntheticData.symbol,
                  symbol2: pair.collateralData.symbol
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
                  formatValue={(value: number) => value.toFixed(8)}
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
                      Number(
                        cRatio === '---' && cRatioTo !== 'NaN'? cRatioTo : cRatio
                      ) >= Number(minCRatio)
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
              setValue={(value: string) => {
                if (value.match(/^\d*\.?\d*$/)) {
                  const inputData = changeInputSynthetic(value, tokenTo, tokenFrom, cRatio)
                  setMaxBehaviorTo('number')
                  setAmountBorrow(inputData.amountBorBN)
                  setAmountBorrowString(value)
                  if (cRatio !== '---') {
                    setAmountCollateralString(inputData.amountCollString)
                    setAmountCollateral(inputData.amountCollBN)
                  }
                }
              }}
              placeholder={'0.0'}
              onMaxClick={setMaxAmountInputTo}
              pairs={pairs.map(pair => ({
                symbol1: pair.syntheticData.symbol,
                symbol2: pair.collateralData.symbol
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
                formatValue={(value: string) => Number(value).toFixed(8)}
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
                <Typography className={classes.infoValueFrom}>
                  <Grid container direction='row' alignItems='center'>
                    {cRatioFrom < 9999 ? (
                      cRatioFrom
                    ) : (
                      <AllInclusiveIcon style={{ height: '0.75em' }} />
                    )}
                    {cRatioFrom !== 'NaN' ? '%' : ''}
                  </Grid>
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      Number(cRatioTo === 'NaN' ? minCRatio : cRatioTo) >= Number(cRatioFrom)
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueTo}>
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
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttonAction} container>
            <Progress
              state={getProgressState(sending, hasError, showOperationProgressFinale, blockButton)}
              message={getProgressMessage(
                sending,
                hasError,
                actionSubmit,
                showOperationProgressFinale,
                nameSubmitButton,
                blockButton
              )}
            />
            <OutlinedButton
              name={nameSubmitButton}
              color='secondary'
              className={classes.actionButton}
              onClick={() => {
                onClickSubmitButton(
                  actionSubmit,
                  pairIndex !== null ? pairs[pairIndex].synthetic : new PublicKey('0'),
                  pairIndex !== null ? pairs[pairIndex].collateral : new PublicKey('0'),
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
