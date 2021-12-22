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
import useStyles from './style'
import { printBN } from '@consts/utils'
import { BorrowedPair } from '../WrappedBorrow/WrappedBorrow'

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
  cRatio: number
  interestRate: number
  liquidationPriceTo: number
  liquidationPriceFrom: number
  collateralRatioTo: number
  collateralRatioFrom: number
  onClickSubmitButton: (action: string) => void
  pairs: BorrowedPair[]
  minCRatio: number
  changeCRatio: (nr: number) => void
  sending: boolean
  onSelectPair: (nr: number) => void
  hasError: boolean
  changeValueFromTable: (cRatio: number, interestRate: number, liquidationPrice: number) => void
}
export const ActionBorrow: React.FC<IProp> = ({
  action,
  cRatio,
  interestRate,
  liquidationPriceTo,
  liquidationPriceFrom,
  collateralRatioTo,
  collateralRatioFrom,
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
  const [nameSubmitButton, _] = React.useState<ActionType>('add')
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
  }, [amountBorrow, amountCollateral])

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
            <Typography className={classes.title}>
              {' '}
              {action === 'borrow' ? 'Max borrow' : 'Repay'}
            </Typography>
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
              {action === 'borrow' ? 'Available to borrow: ' : 'Available to repay: '}
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
              name={nameSubmitButton}
              color='secondary'
              className={classes.actionButton}
              onClick={() => {
                onClickSubmitButton(nameSubmitButton)
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
