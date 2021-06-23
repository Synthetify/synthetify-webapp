import React from 'react'
import { Button, Typography, ClickAwayListener } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ConnectWallet from '@components/Modals/ConnectWallet/ConnectWallet'

export interface IProps {
  name: string
  options: string[]
  onClick?: () => void
  connected: boolean
  startIcon?: JSX.Element
}
export const ChangeWalletButton: React.FC<IProps> = ({
  name,
  options,
  onClick = () => {},
  connected,
  startIcon
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    // could use rewriting to backdrop-filter when browser support is better
    blurContent()
    onClick()
    if (open) handleClose()
    else setOpen(true)
  }

  const handleClose = () => {
    console.log('clck away')
    if (!open) return
    unblurContent()
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Button
          className={classes.ChangeWalletButton}
          variant='contained'
          classes={{ disabled: classes.disabled }}
          onClick={handleClick}
          startIcon={startIcon}
          endIcon={<ExpandMoreIcon />}>
          <Typography className={classes.ChangeWalletButtonText}>{name}</Typography>
        </Button>
        <ConnectWallet
          options={options}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          onSelect={() => {}}
          callDisconect={() => {}}
          connected={connected}
        />
      </div>
    </ClickAwayListener>
  )
}
export default ChangeWalletButton
