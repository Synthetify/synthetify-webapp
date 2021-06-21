import React from 'react'
import { Typography, Modal, Grid } from '@material-ui/core'
import useStyles from './style'

export interface IConnectWalletModal {
  options: string[]
  open: boolean
  handleClose: () => void
  onSelect: (wallet: string) => void
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  options,
  open,
  handleClose,
  onSelect
}) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        className={classes.root}
        container
        alignContent='space-around'
        direction='column'
        spacing={2}>
          <Grid item>
            <Typography>Placeholder</Typography>
          </Grid>


        </Grid>
    </Modal>
  )
}
export default ConnectWallet
