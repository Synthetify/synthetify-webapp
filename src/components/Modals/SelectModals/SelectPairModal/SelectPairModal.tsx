import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'
import useStyles from '../style'
import { Search } from '@material-ui/icons'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import classNames from 'classnames'

export interface ISelectPairModal {
  pairs: Array<{ symbol1: string; symbol2: string }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (index: number) => void
}

export const SelectPairModal: React.FC<ISelectPairModal> = ({
  pairs,
  open,
  handleClose,
  anchorEl,
  centered = false,
  onSelect
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<string>('')

  const descrpitionForSymbol: { [key: string]: string } = {
    SNY: 'Synthetify',
    xBNB: 'Synthetic Binance Coin',
    xBTC: 'Synthetic Bitcoin',
    xETH: 'Synthetic Ethereum',
    xFTT: 'Synthetic FTT',
    xSOL: 'Synthetic Solana',
    xSRM: 'Synthetic Serum',
    xUSD: 'Synthetic USD',
    stSOL: 'Staked Solana',
    WSOL: 'Wrapped Solana',
    USDC: 'USD Coin',
    renBTC: 'RENBTC'
  }

  const endAdornment = () => (
    <>
      {!!value.length && (
        <img
          className={classes.clearIcon}
          src={icons.clear}
          alt='x'
          onClick={() => {
            setValue('')
          }}
        />
      )}
      <Search className={classes.searchIcon} />
    </>
  )

  const pairSymbol = (pair: { symbol1: string; symbol2: string }) =>
    `${pair.symbol1}/${pair.symbol2}`

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorReference={centered ? 'none' : 'anchorEl'}
      className={classes.popover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      {' '}
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        <Grid item style={{ width: '100%' }}>
          <Input
            className={classes.searchInput}
            value={value}
            disableUnderline={true}
            placeholder='Select a pair'
            endAdornment={endAdornment()}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <Box className={classes.tokenList}>
            <CustomScrollbar>
              {pairs
                .filter(pair => {
                  if (!value) return true
                  return pairSymbol(pair).toLowerCase().includes(value.toLowerCase())
                })
                .map((pair, index) => (
                  <Grid
                    container
                    key={index}
                    className={classes.tokenItem}
                    alignItems='center'
                    wrap='nowrap'
                    onClick={() => {
                      onSelect(index)
                      handleClose()
                    }}>
                    <Grid className={classes.dualIcon}>
                      <CardMedia
                        className={classes.tokenIcon}
                        image={icons[pair.symbol1] ?? icons.SNY}
                        style={{ marginRight: 0 }}
                      />
                      <CardMedia
                        className={classNames(classes.tokenIcon, classes.secondIcon)}
                        image={icons[pair.symbol2] ?? icons.SNY}
                      />{' '}
                    </Grid>
                    <Grid item>
                      <Typography className={classes.tokenName}>{pairSymbol(pair)}</Typography>
                      <Typography className={classes.tokenDescrpiption}>
                        {descrpitionForSymbol[pair.symbol1] ?? 'Asset'}/
                        {descrpitionForSymbol[pair.symbol2] ?? 'Asset'}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
            </CustomScrollbar>
          </Box>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectPairModal
