import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'
import useStyles from '../style'
import { Search } from '@material-ui/icons'
import CustomScrollbar from '../CustomScrollbar'
import icons from '@static/icons'
import classNames from 'classnames'
import { descrpitionForSymbol } from '@consts/static'

export interface ISelectPairModal {
  pairs: Array<{ symbol1: string; symbol2: string; type?: number }>
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
  const alphabetTable = ['A', 'B', 'C', 'D', 'E', 'F']
  const getCountSameVaults = (
    array: Array<{ symbol1: string; symbol2: string; type?: number }>,
    tokenBorr: string,
    tokenColl: string
  ) => {
    let count = 0
    array.forEach(
      element => element.symbol2 === tokenBorr && element.symbol1 === tokenColl && count++
    )
    return count
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
                      <Typography className={classes.tokenName}>
                        {pairSymbol(pair)}
                        {typeof pair.type !== 'undefined' &&
                        pair.type !== 3 &&
                        getCountSameVaults(pairs, pair.symbol2, pair.symbol1) > 1
                          ? ` - ${alphabetTable[pair.type]}`
                          : null}
                      </Typography>
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
