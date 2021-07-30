import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'
import useStyles from './style'
import { Search } from '@material-ui/icons'
import CustomScrollbar from './CustomScrollbar'
import icons from '@static/icons'
import { BN } from '@project-serum/anchor'
import { printBN } from '@consts/utils'
export interface ISelectTokenModal {
  tokens: Array<{ symbol: string, balance?: BN, decimals?: number }>
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  centered?: boolean
  onSelect: (chosen: string) => void
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
    xSNY: 'Synthetify asset',
    xBNB: 'Binance asset',
    xBTC: 'Bitcoin asset',
    xETH: 'Ethereum asset',
    xFTT: 'FTX asset',
    xSOL: 'Solana asset',
    xSRM: 'Serum asset',
    xUSD: 'USD asset',
    WSOL: 'Wrapped Solana'
  }

  const endAdornment = () => (
    <>
      {!!value.length && <img className={classes.clearIcon} src={icons.clear} alt='x' onClick={() => { setValue('') }} />}
      <Search className={classes.searchIcon} />
    </>
  )

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
      <Grid
        className={classes.root}
        container
        alignContent='space-around'
        direction='column'>
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
                  return token.symbol.toLowerCase().includes(value.toLowerCase())
                })
                .map((token) => (
                  <Grid
                    container
                    key={`tokens-${token.symbol}`}
                    className={classes.tokenItem}
                    alignItems='center'
                    onClick={() => {
                      onSelect(token.symbol)
                      handleClose()
                    }}>
                    <Grid item>
                      <CardMedia className={classes.tokenIcon} image={icons[token.symbol] ?? icons.SNY} />{' '}
                    </Grid>
                    <Grid item>
                      <Typography className={classes.tokenName}>{token.symbol}</Typography>
                      <Typography className={classes.tokenDescrpiption}>{descrpitionForSymbol[token.symbol] ?? 'Asset'}</Typography>
                    </Grid>
                    {(token.balance && token.decimals) && (
                      <Grid item style={{ marginLeft: 'auto', marginRight: 5 }}>
                        <Typography className={classes.tokenBalance}>Balance: {printBN(token.balance, token.decimals)}</Typography>
                      </Grid>
                    )}
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
