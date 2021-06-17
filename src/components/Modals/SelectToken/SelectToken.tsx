import React from 'react'
import { Typography, Modal, Divider, Grid, IconButton, Box } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import useStyles from './style'
import { Close } from '@material-ui/icons'

export interface TokenNameWithIcon {
  name: string
  icon: string
  disabled?: boolean
}

export interface ISelectTokenModal {
  tokens: TokenNameWithIcon[]
  open: boolean
  handleClose: () => void
  onSelect: (tokenAddress: PublicKey) => void
  loading?: boolean
}

export const SelectToken: React.FC<ISelectTokenModal> = ({
  tokens,
  open,
  loading,
  handleClose,
  onSelect
}) => {
  const classes = useStyles()
  return (
    <Modal className={classes.root} open={open} onClose={handleClose}>
      <Grid container direction='column' spacing={0}>
        <Grid>
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
        <Grid></Grid>
      </Grid>
    </Modal>
  )
}
export default SelectToken
