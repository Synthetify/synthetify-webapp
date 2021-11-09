import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { Grid, Typography, Divider, Popover, Button, Input, Hidden } from '@material-ui/core'
import React from 'react'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import { ICollateral, ISynthetic } from '@reducers/exchange'
import { Asset, Decimal } from '@synthetify/sdk/lib/exchange'
import { BN } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import useStyles from './style'
import { printBN } from '@consts/utils'
import { ExchangeCollateralTokens, ExchangeSyntheticTokens } from '@selectors/solanaWallet'
interface BorrowedPair {
  collateralData: ExchangeCollateralTokens
  syntheticData: ExchangeSyntheticTokens
  balance: Decimal
}
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
  onClickButton: () => void
  pairs: BorrowedPair[]
  minCRatio: number
  changeCRatio: (nr: number) => void
}
export const ActionBorrow: React.FC<IProp> = ({
  cRatio,
  interestRate,
  liquidationPriceTo,
  liquidationPriceFrom,
  collateralRatioTo,
  collateralRatioFrom,
  nameButton,
  onClickButton,
  pairs,
  minCRatio,
  changeCRatio
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
      maxAvailable: pair.balance.val,
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
    customCRatio ? changeCRatio(Number(customCRatio)) : changeCRatio(minCRatio)
    customCRatio ? setCustomCRatio(Number(customCRatio)) : setCustomCRatio(minCRatio.toString())
  }
  return (
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
                  setAmountCollateral(printBN(tokenFrom.balance, tokenFrom.assetScale))
                }
              }}
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
                  ...(cRatio <= 100 ? { color: colors.green.button } : { color: colors.red.error })
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
                setAmountBorrow(printBN(tokenFrom.balance, tokenFrom.assetScale))
              }
            }}
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

            <Grid container>
              <Typography className={classes.infoValueTo}>{liquidationPriceTo}$</Typography>
              <FlatIcon
                className={classes.flatIcon}
                style={{
                  ...(liquidationPriceTo >= liquidationPriceFrom
                    ? { color: colors.green.button }
                    : { color: colors.red.error })
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
                  ...(cRatio <= 100 ? { color: colors.green.button } : { color: colors.red.error })
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
          <Progress state={'success'} message='Successfully added' />
          <OutlinedButton
            name={nameButton}
            color='secondary'
            className={classes.actionButton}
            onClick={onClickButton}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
