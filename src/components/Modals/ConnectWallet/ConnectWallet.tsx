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
        spacing={2}>
        <Grid item className={classes.listItem}>
          <Typography className={classes.name}>
            <Icon>
              <img className={classes.icon} src={SolletIcon} alt={`${options[0]} icon}`} />
            </Icon>
            {options[0]}
          </Typography>
        </Grid>
      </Grid>
    </Modal>
  )
}
export default ConnectWallet
