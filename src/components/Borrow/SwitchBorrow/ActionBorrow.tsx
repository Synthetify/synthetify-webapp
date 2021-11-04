import ExchangeAmountInput from '@components/Inputs/ExchangeAmountInput/ExchangeAmountInput'
import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { Progress } from '@components/WrappedActionMenu/Progress/Progress'
import { Grid, Typography, Divider, Popover, Button, Input } from '@material-ui/core'
import React from 'react'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import FlatIcon from '@material-ui/icons/TrendingFlat'
import { colors } from '@static/theme'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles from './style'
interface IProp {
  availableCollateral: number

  availableBorrow: number
  cRatio: number
  interestRate: number
  liquidationPriceTo: number
  liquidationPriceFrom: number
  collateralRatioTo: number
  collateralRatioFrom: number
  nameButton: string
  onClickButton: () => void
  pairs: Array<{ symbol1: string; symbol2: string }>
}
export const ActionBorrow: React.FC<IProp> = ({
  availableCollateral,
  availableBorrow,
  cRatio,
  interestRate,
  liquidationPriceTo,
  liquidationPriceFrom,
  collateralRatioTo,
  collateralRatioFrom,
  nameButton,
  onClickButton,
  pairs
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

  const changeCRatio = () => {
    setCustomCRatio('Custom')
  }
  return (
    <Grid className={classes.root}>
      <Grid className={classes.middleGrid}>
        <Grid>
          <Typography className={classes.title}>Add collateral</Typography>
          <ExchangeAmountInput
            value={amountCollateral}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountCollateral(value)
              }
            }}
            placeholder={'0.0'}
            onMaxClick={() => {}}
            pairs={pairs}
            current={'SOL'}
            onSelect={() => {}}
            className={classes.input}
          />
          <Typography className={classes.desc}>
            Available collateral:{' '}
            <AnimatedNumber
              value={availableCollateral}
              formatValue={(value: number) => value.toFixed(5)}
            />
          </Typography>
        </Grid>
        <Grid className={classes.cRatioGrid}>
          <Grid className={classes.cRatioBack}>
            <Typography className={classes.cRatioTitle}>Collateral Ratio</Typography>
            <Divider />
            <Button
              className={classes.cRatioButton}
              endIcon={<DownIcon style={{ color: colors.white.main, width: '24px' }} />}
              onClick={onClickPopover}
              style={{
                ...(cRatio <= 100 ? { color: colors.green.button } : { color: colors.red.error })
              }}>
              {cRatio}
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
                <Button className={classes.popoverButton}>
                  Min: <span className={classes.minValue}>99%</span>
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
                  onBlur={changeCRatio}
                />
                <Button className={classes.popoverButton}>200%</Button>
                <Button className={classes.popoverButton}>150%</Button>
                <Button className={classes.popoverButton}>100%</Button>
              </Grid>
            </Popover>
          </Grid>
        </Grid>
        <Grid>
          <Typography className={classes.title}>Max borrow</Typography>
          <ExchangeAmountInput
            value={amountBorrow}
            setValue={value => {
              if (value.match(/^\d*\.?\d*$/)) {
                setAmountBorrow(value)
              }
            }}
            placeholder={'0.0'}
            onMaxClick={() => {}}
            pairs={pairs}
            current={'xSOL'}
            onSelect={() => {}}
            className={classes.input}
          />
          <Typography className={classes.desc}>
            Available to borrow:{' '}
            <AnimatedNumber
              value={availableBorrow}
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
              <Typography className={classes.infoValueTo}>{collateralRatioTo}$</Typography>
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
                  formatValue={(value: number) => value.toFixed(3)}
                />
                $
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent='flex-end'>
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
