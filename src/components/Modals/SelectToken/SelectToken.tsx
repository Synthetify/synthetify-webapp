import React from 'react'
import { Typography, Popover, Grid, Input, CardMedia, Box } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import useStyles from './style'
import { Search } from '@material-ui/icons'
import CustomScrollbar from './CustomScrollbar'

export interface ISelectTokenModal {
  tokens: string[]
  open: boolean
  handleClose: () => void
  anchorEl: HTMLButtonElement | null
  onSelect: (chosen: string) => void
}

export const SelectToken: React.FC<ISelectTokenModal> = ({
  tokens,
  open,
  handleClose,
  anchorEl,
  onSelect
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<string>('')

  return (
    <Popover
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
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
            type={'search'}
            value={value}
            disableUnderline={true}
            placeholder='Search a token'
            endAdornment={<Search className={classes.searchIcon} />}
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
                .map(name => {
                  let icon
                  try {
                    icon = require(`@static/icons/${name.toLowerCase()}.png`)
                  } catch (error) {
                    icon = require('@static/icons/sny.png')
                  }

                  return (
                    <Grid
                      container
                      className={classes.tokenItem}
                      alignItems='center'
                      onClick={() => onSelect(name)}>
                      <Grid item>
                        <CardMedia className={classes.tokenIcon} image={icon} />{' '}
                      </Grid>
                      <Grid item>
                        <Typography className={classes.tokenName}>{name}</Typography>
                      </Grid>
                    </Grid>
                  )
                })}
            </CustomScrollbar>
          </Box>
        </Grid>
      </Grid>
    </Popover>
  )
}
export default SelectToken
