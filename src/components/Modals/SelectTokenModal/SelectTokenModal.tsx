import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'
import useStyles from './style'
import { Search } from '@material-ui/icons'
import CustomScrollbar from './CustomScrollbar'
import icons from '@static/icons'
export interface ISelectTokenModal {
  tokens: string[]
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
        direction='column'
        spacing={2}>
        <Grid item>
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
                  return token.toLowerCase().includes(value.toLowerCase())
                })
                .map(name => (
                  <Grid
                    container
                    key={`tokens-${name}`}
                    className={classes.tokenItem}
                    alignItems='center'
                    onClick={() => {
                      onSelect(name)
                      handleClose()
                    }}>
                    <Grid item>
                      <CardMedia className={classes.tokenIcon} image={icons[name] ?? icons.SNY} />{' '}
                    </Grid>
                    <Grid item>
                      <Typography className={classes.tokenName}>{name}</Typography>
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
export default SelectTokenModal
