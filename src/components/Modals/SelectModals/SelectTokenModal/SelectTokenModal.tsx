import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'

import { Search } from '@material-ui/icons'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import { BN } from '@project-serum/anchor'
import { printBN, showPrefix } from '@consts/utils'
import { descrpitionForSymbol } from '@consts/static'
import useStyles from '../style'
export interface ISelectTokenModal {
  tokens: Array<{ symbol: string; balance?: BN; decimals?: number; type?: number }>
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

  const fixedTokensList = tokens.filter(token => token.symbol !== 'XYZ')
  const alphabetTable = ['A', 'D', 'C', 'B', 'E', 'F']
  const selectTokens = (name: string): number => {
    return tokens.findIndex(token => token.symbol === name)
  }
  const getCountSameVaults = (array: Array<{ symbol: string; type?: number }>, token: string) => {
    let count = 0
    array.forEach(element => element.symbol === token && count++)
    return count
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

  const renderTokenList = () => {
    const filteredList = fixedTokensList.filter(token => {
      if (!value) return true
      return token.symbol.toLowerCase().includes(value.toLowerCase())
    })

    if (filteredList.length !== 0) {
      return (
        <CustomScrollbar>
          {filteredList.map(token => (
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
                <CardMedia className={classes.tokenIcon} image={icons[token.symbol] ?? icons.SNY} />{' '}
              </Grid>
              <Grid item>
                <Typography className={classes.tokenName}>
                  {token.symbol}{' '}
                  {typeof token.type !== 'undefined' && getCountSameVaults(tokens, token.symbol) > 1
                    ? ` - ${alphabetTable[token.type]}`
                    : null}
                </Typography>
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
      )
    } else {
      return (
        <Grid
          container
          direction='column'
          alignItems='center'
          wrap='nowrap'
          justifyContent='center'
          style={{ width: '100%', paddingTop: '36px' }}>
          <Grid item>
            <Typography className={classes.emptyName}>No tokens to show...</Typography>
          </Grid>
          <Grid className={classes.emptyIconGrid} item>
            <CardMedia className={classes.emptyIcon} image={icons.closeX ?? null} />{' '}
          </Grid>
        </Grid>
      )
    }
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
          <Box className={classes.tokenList}>{renderTokenList()}</Box>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectTokenModal
