import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'
import useStyles from '../style'
import { Search } from '@material-ui/icons'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import { BN } from '@project-serum/anchor'
import { printBN, showPrefix } from '@consts/utils'
export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; balance?: BN; decimals?: number }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (index: number) => void
}

export const SelectTokenModal: React.FC<ISelectTokenModal> = ({
  tokens,
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
    USDC: 'USD Coin'
  }

  const selectTokens = (name: string): number => {
    let tokenIndex = 0
    tokens.map((token, index) => {
      console.log(token.symbol, name)
      token.symbol === name ? tokenIndex = index : ''
    })
    return tokenIndex
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

  const formatNumbers = (value: string) => {
    const num = Number(value)

    if (num < 10) {
      return num.toFixed(6)
    }

    if (num < 1000) {
      return num.toFixed(4)
    }

    if (num < 10000) {
      return num.toFixed(2)
    }

    if (num < 1000000) {
      return (num / 1000).toFixed(2)
    }

    return (num / 1000000).toFixed(2)
  }

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
            placeholder='Search a token'
            endAdornment={endAdornment()}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <Box className={classes.tokenList}>
            <CustomScrollbar>
              {tokens
                .filter(token => {
                  if (!value) return true
                  console.log(token.symbol.toLowerCase().includes(value.toLowerCase()))
                  return token.symbol.toLowerCase().includes(value.toLowerCase())
                })
                .map((token) => (
                  <Grid
                    container
                    key={`tokens-${token.symbol}`}
                    className={classes.tokenItem}
                    alignItems='center'
                    wrap='nowrap'
                    onClick={() => {
                      onSelect(selectTokens(token.symbol))
                      handleClose()
                    }}>
                    <Grid item>
                      <CardMedia
                        className={classes.tokenIcon}
                        image={icons[token.symbol] ?? icons.SNY}
                      />{' '}
                    </Grid>
                    <Grid item className={classes.tokenData}>
                      <Typography className={classes.tokenName}>{token.symbol}</Typography>
                      <Typography className={classes.tokenDescrpiption}>
                        {descrpitionForSymbol[token.symbol] ?? 'Asset'}
                      </Typography>
                    </Grid>
                    {token.balance && token.decimals ? (
                      <Grid item style={{ marginLeft: 'auto', marginRight: 5 }}>
                        <Typography className={classes.tokenBalance}>
                          Balance: {formatNumbers(printBN(token.balance, token.decimals))}
                          {showPrefix(+printBN(token.balance, token.decimals))}
                        </Typography>
                      </Grid>
                    ) : null}
                  </Grid>
                ))}
            </CustomScrollbar>
          </Box>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectTokenModal
