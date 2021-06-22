import React from 'react'
import { Typography, Popper, Grid } from '@material-ui/core'
import useStyles from './style'

export interface IConnectWalletModal {
  options: string[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose: () => void
  onSelect: (wallet: string) => void
}
export const ConnectWallet: React.FC<IConnectWalletModal> = ({
  options,
  open,
  anchorEl,
  handleClose,
  onSelect
}) => {
  const classes = useStyles()

  return (
    <Popper transition open={open} anchorEl={anchorEl} placement='bottom'>
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
      </Grid>
    </Popper>
  )
}
export default ConnectWallet
