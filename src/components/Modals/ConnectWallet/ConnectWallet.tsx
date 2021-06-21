import React from 'react'
import { Typography, Modal, Grid, Icon } from '@material-ui/core'
import useStyles from './style'
import PhantomIcon from '@static/svg/phantom.svg'
import SolletIcon from '@static/svg/sollet.svg'

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
        spacing={0}>
        <Grid
          item
          container
          className={classes.listItem}
          alignItems='center'
          onClick={() => onSelect(options[0])}>
          <Grid item>
            <img className={classes.icon} src={SolletIcon} alt={`${options[0]} icon}`} />
          </Grid>
          <Grid item>
            <Typography className={classes.name}>{options[0]}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}
export default ConnectWallet
