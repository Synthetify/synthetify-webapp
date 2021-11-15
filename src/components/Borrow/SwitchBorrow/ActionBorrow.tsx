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
import { printBN } from '@consts/utils'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
import { BorrowTable } from '../BorrowTable/BorrowTable'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'

type ActionType = 'add' | 'withdraw'
interface AssetPriceData {
  priceVal: BN
  assetScale: number
  symbol: string | null
  maxAvailable: BN
  balance: BN
}
interface IProp {
  cRatio: number
  interestRate: number
  liquidationPriceTo: number
  liquidationPriceFrom: number
  collateralRatioTo: number
  collateralRatioFrom: number
  nameButton: string
  onClickSubmitButton: () => void
  pairs: BorrowedPair[]
  minCRatio: number
  changeCRatio: (nr: number) => void
  sending: boolean
  onSelectPair: (nr: number) => void
  hasError: boolean
}
export const ActionBorrow: React.FC<IProp> = ({
  cRatio,
  interestRate,
  liquidationPriceTo,
  liquidationPriceFrom,
  collateralRatioTo,
  collateralRatioFrom,
  nameButton,
  onClickSubmitButton,
  pairs,
  minCRatio,
  changeCRatio,
  sending,
  hasError,
  onSelectPair
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [amountBorrow, setAmountBorrow] = React.useState('')
  const [amountCollateral, setAmountCollateral] = React.useState('')
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
      maxAvailable: pair.maxBorrow.val,
      balance: pair.collateralData.balance
    }

    const synthetic: AssetPriceData = {
      priceVal: pair.syntheticData.price.val,
      assetScale: pair.syntheticData.supply.scale,
      symbol: pair.syntheticData.symbol,
      maxAvailable: pair.syntheticData.maxSupply.val,
      balance: pair.syntheticData.balance
    }

    return [collateral, synthetic]
  }
  const [tokenFrom, tokenTo] = getAssetInAndFor(pairIndex !== null ? pairs[pairIndex] : null)

  const changeCustomCRatio = () => {
    if (customCRatio) {
      changeCRatio(Number(customCRatio))
      setCustomCRatio(customCRatio)
    } else {
      changeCRatio(minCRatio)
      setCustomCRatio(minCRatio.toString())
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
    return 'none'
  }
  const getProgressMessage = () => {
    const actionToNoun: { [key in ActionType]: string } = {
      add: 'Adding',
      withdraw: 'Withdrawing'
    }
    if (sending) {
      return `${actionToNoun[nameButton.toLowerCase() as ActionType]} in progress`
    }
    const actionToPastNoun: { [key in ActionType]: string } = {
      add: 'added',
      withdraw: 'withdrawn'
    }
    if (showOperationProgressFinale && !hasError) {
      return `Successfully ${actionToPastNoun[nameButton.toLowerCase() as ActionType]}`
    }
    if (showOperationProgressFinale && hasError) {
      return `${actionToNoun[nameButton.toLowerCase() as ActionType]} failed`
    }
  }
  const [showOperationProgressFinale, setShowOperationProgressFinale] = React.useState(false)

  React.useEffect(() => {
    if (sending) {
      setShowOperationProgressFinale(true)
    }
  }, [sending])

  return (
    <Grid>
      <Grid className={classes.root}>
        <Grid className={classes.middleGrid}>
          <Grid className={classes.collateralContainer}>
            <Grid style={{ width: '100%' }}>
              <Typography className={classes.title}>Add collateral</Typography>
              <ExchangeAmountInput
                value={amountCollateral}
                setValue={value => {
                  if (value.match(/^\d*\.?\d*$/)) {
                    setAmountCollateral(value)
                  }
                }}
                placeholder={'0.0'}
                onMaxClick={() => {
                  if (pairIndex !== null) {
                    setAmountCollateral(printBN(tokenTo.maxAvailable, tokenTo.assetScale))
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
                  value={printBN(tokenTo.maxAvailable, tokenTo.assetScale)}
                  formatValue={(value: number) => value.toFixed(5)}
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
                    color: cRatio <= 100 ? colors.green.button : colors.red.error
                  }}>
                  {cRatio}%
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
                      value={minCRatio}
                      onClick={event => changeCRatio(Number(event.currentTarget.value))}>
                      Min: <span className={classes.minValue}>{minCRatio.toFixed(0)}%</span>
                    </Button>
                    <Input
                      className={classes.popoverInput}
                      classes={{ input: classes.customInput }}
                      disableUnderline
                      value={customCRatio}
                      placeholder={'Custom'}
                      onChange={event => {
                        if (event.currentTarget.value.match(/^\d*\.?\d*$/)) {
                          setCustomCRatio(event.currentTarget.value)
                        }
                      }}
                      onBlur={changeCustomCRatio}
                    />
                    <Button
                      className={classes.popoverButton}
                      value={200}
                      onClick={event => changeCRatio(Number(event.currentTarget.value))}>
                      200%
                    </Button>
                    <Button
                      className={classes.popoverButton}
                      value={150}
                      onClick={event => changeCRatio(Number(event.currentTarget.value))}>
                      150%
                    </Button>
                    <Button
                      className={classes.popoverButton}
                      value={100}
                      onClick={event => changeCRatio(Number(event.currentTarget.value))}>
                      100%
                    </Button>
                  </Grid>
                </Popover>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ width: '100%' }}>
            <Typography className={classes.title}>Max borrow</Typography>
            <ExchangeAmountInput
              value={amountBorrow}
              setValue={value => {
                if (value.match(/^\d*\.?\d*$/)) {
                  setAmountBorrow(value)
                }
              }}
              placeholder={'0.0'}
              onMaxClick={() => {
                if (pairIndex !== null) {
                  setAmountBorrow(printBN(tokenFrom.maxAvailable, tokenFrom.assetScale))
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
              Available to borrow:{' '}
              <AnimatedNumber
                value={printBN(tokenFrom.maxAvailable, tokenFrom.assetScale)}
                formatValue={(value: number) => value.toFixed(5)}
              />
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid className={classes.bottomGrid}>
          <Grid className={classes.bottomInfo}>
            <Grid>
              <Typography className={classes.infoTitle}>Interest rate:</Typography>
              <Typography className={classes.infoValueFrom}>
                <AnimatedNumber
                  value={interestRate}
                  formatValue={(value: number) => value.toFixed(3)}
                />
                %
              </Typography>
            </Grid>
            <Grid>
              <Typography className={classes.infoTitle}>Liquidation price:</Typography>

              <Grid container alignItems='center'>
                <Typography className={classes.infoValueTo}>{liquidationPriceTo}$</Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color:
                      liquidationPriceTo >= liquidationPriceFrom
                        ? colors.green.button
                        : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueFrom}>
                  <AnimatedNumber
                    value={liquidationPriceFrom}
                    formatValue={(value: number) => value.toFixed(3)}
                  />{' '}
                  $
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Typography className={classes.infoTitle}>Collateral ratio:</Typography>
              <Grid container>
                <Typography className={classes.infoValueTo}>
                  {collateralRatioTo.toFixed(2)}%
                </Typography>
                <FlatIcon
                  className={classes.flatIcon}
                  style={{
                    color: cRatio <= 100 ? colors.green.button : colors.red.error
                  }}
                />
                <Typography className={classes.infoValueFrom}>
                  {' '}
                  <AnimatedNumber
                    value={collateralRatioFrom}
                    formatValue={(value: number) => value.toFixed(2)}
                  />
                  %
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.buttonAction} container>
            <Progress state={getProgressState()} message={getProgressMessage()} />
            <OutlinedButton
              name={nameButton}
              color='secondary'
              className={classes.actionButton}
              onClick={onClickSubmitButton}
            />
          </Grid>
        </Grid>
      </Grid>
      <BorrowTable
        collateral={pairIndex !== null ? pairs[pairIndex].collateralData.symbol : 'WSOL'}
        borrowed={pairIndex !== null ? pairs[pairIndex].syntheticData.symbol : 'WSOL'}
        currentDebt={10}
        deposited={56}
        depositedSign={pairIndex !== null ? pairs[pairIndex].collateralData.symbol : 'WSOL'}
        currentDebtSign={'$'}
        cRatio={
          pairIndex !== null
            ? printBN(pairs[pairIndex].collateralRatio.val, pairs[pairIndex].collateralRatio.scale)
            : '0'
        }
        interestRate={
          pairIndex !== null
            ? printBN(
                pairs[pairIndex].accumulatedInterestRate.val,
                pairs[pairIndex].accumulatedInterestRate.scale
              )
            : '0'
        }
        liquidationPrice={
          pairIndex !== null
            ? printBN(
                pairs[pairIndex].liquidationThreshold.val,
                pairs[pairIndex].liquidationThreshold.scale
              )
            : '0'
        }
        maxBorrow={
          pairIndex !== null
            ? printBN(pairs[pairIndex].maxBorrow.val, pairs[pairIndex].maxBorrow.scale)
            : '0'
        }
        setValueWithTable={() => {}}
        active={false}
      />
    </Grid>
  )
}
