import React from 'react'
import { Typography, Modal, Grid } from '@material-ui/core'
import useStyles from './style'

interface IConnectWalletModalWallet{
  name: string
  network: string
  disabled?: boolean
}

export interface IConnectWalletModal {
  networks: IConnectWalletModalWallet[]
  open: boolean
  handleClose: () => void
  onSelect: (wallet: string) => void
}
export const SelectNetwork: React.FC<IConnectWalletModal> = ({
  networks,
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
        direction='column'>
        {networks.map(network => {
          let icon
          try {
            icon = require(`@static/svg/${network}.svg`)
          } catch (error) {
            icon = require('@static/icons/sny.png')
          }

          return (
            <Grid
              item
              className={classes.listItem}
              alignItems='center'
              onClick={() => onSelect(network)}>
              <img className={classes.icon} src={icon} alt={`${network} icon}`} />
              <Typography className={classes.name}>{option}</Typography>
            </Grid>
          )
        })}
      </Grid>
    </Modal>
  )
}
export default SelectNetwork