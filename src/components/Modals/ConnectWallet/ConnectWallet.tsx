import React from 'react'
import { Typography, Popover, Grid } from '@material-ui/core'
import useStyles from './style'
import { ExitToApp } from '@material-ui/icons'

export interface IConnectWalletModal {
  options: string[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  callDisconect: () => void
  connected: boolean
  onSelect: (wallet: string) => void
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  options,
  open,
  anchorEl,
  handleClose,
  callDisconect,
  connected,
  onSelect
}) => {
  const classes = useStyles()

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
              key={option}
              className={classes.listItem}
              onClick={() => {
                onSelect(option)
                handleClose()
              }}>
              <img className={classes.icon} src={icon} alt={`${option} icon}`} />
              <Typography className={classes.name}>{option}</Typography>
            </Grid>
          )
        })}

        {connected ? (
          <Grid item className={classes.listItem} onClick={callDisconect}>
            <ExitToApp className={classes.icon} />
            <Typography className={classes.name}>Disconnect</Typography>
          </Grid>
        ) : null}
      </Grid>
    </Popover>
  )
}
export default ConnectWallet
