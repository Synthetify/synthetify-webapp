import React from 'react'
import {
  Typography,
  Modal,
  Divider,
  Grid,
  IconButton,
  Input,
  CardMedia,
  Box
} from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import useStyles from './style'
import { Close, Search } from '@material-ui/icons'
import CustomScrollbar from './CustomScrollbar'

export interface TokenNameWithIcon {
  name: string
  disabled?: boolean
}

export interface ISelectTokenModal {
  tokens: TokenNameWithIcon[]
  open: boolean
  handleClose: () => void
  onSelect: (tokenAddress: PublicKey) => void
  loading?: boolean
  error?: string
}

export const SelectToken: React.FC<ISelectTokenModal> = ({
  tokens,
  open,
  loading,
  handleClose,
  onSelect,
  error
}) => {
  const classes = useStyles()
  const [value, setValue] = React.useState<string>('')

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid className={classes.root} container direction='column' spacing={2}>
        <Grid item>
          <Grid container justify='space-between'>
            <Grid item>
              <Typography className={classes.modalName}>Select a token</Typography>
            </Grid>
            <Grid item>
              <IconButton className={classes.closeButton}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </Grid>
            <Divider className={classes.divider} />
          </Grid>
        </Grid>
        <Grid item>
          <Input
            error={!!error}
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
              <Grid container direction={'column'}>
                {tokens
                  .filter(token => {
                    if (!value) return true
                    return token.name.toLowerCase() === value.toLowerCase()
                  })
                  .map(({ name }) => {
                    let icon
                    try {
                      icon = require(`@static/icons/${name.toLowerCase()}.png`)
                    } catch (error) {
                      icon = require('@static/icons/sny.png')
                    }

                    return (
                      <Grid item container className={classes.tokenItem} alignItems='center'>
                        <Grid item>
                          <CardMedia className={classes.tokenIcon} image={icon} />{' '}
                        </Grid>
                        <Grid item>
                          <Typography className={classes.tokenName}>SNY</Typography>
                        </Grid>
                      </Grid>
                    )
                  })}
              </Grid>
            </CustomScrollbar>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  )
}
export default SelectToken
