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
        direction='column'>
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
              key={option}
              className={classes.listItem}
              onClick={() => onSelect(option)}>
              <img className={classes.icon} src={icon} alt={`${option} icon}`} />
              <Typography className={classes.name}>{option}</Typography>
            </Grid>
          )
        })}
      </Grid>
    </Modal>
  )
}
export default ConnectWallet
