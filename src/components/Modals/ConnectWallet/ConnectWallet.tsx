import React from 'react'
import { Typography, Modal, Grid } from '@material-ui/core'
import useStyles from './style'
import { ExitToApp } from '@material-ui/icons'

export interface IConnectWalletModal {
  options: string[]
  open: boolean
  handleClose: () => void
  callDisconect: () => void
  onSelect: (wallet: string) => void
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  options,
  open,
  handleClose,
  callDisconect,
  onSelect
}) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {options.map(option => {
          let icon
          try {
            icon = require(`@static/svg/${option}.svg`)
          } catch (error) {
            icon = require('@static/icons/sny.png')
          }

          return (
            <Grid
              item
              className={classes.listItem}
              alignItems='center'
              onClick={() => onSelect(option)}>
              <img className={classes.icon} src={icon} alt={`${option} icon}`} />
              <Typography className={classes.name}>{option}</Typography>
            </Grid>
          )
        })}
        <Grid
          item
          className={classes.listItem}
          alignItems='center'
          onClick={callDisconect}>
          <ExitToApp className={classes.icon}/>
          <Typography className={classes.name}>Disconnect</Typography>
        </Grid>
      </Grid>
    </Modal>
  )
}
export default ConnectWallet
