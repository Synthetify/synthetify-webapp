import React from 'react'
import { Button, Popper, Typography, ClickAwayListener } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import ConnectWallet from '@components/Modals/ConnectWallet/ConnectWallet'

export interface IProps {
  name: string
  disabled?: boolean
  onClick?: () => void
  startIcon?: JSX.Element
}
export const DropdownHeaderButton: React.FC<IProps> = ({
  name,
  disabled = false,
  startIcon,
  onClick = () => {}
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
          className={classes.dropdownHeaderButton}
          variant='contained'
          classes={{ disabled: classes.disabled }}
          disabled={disabled}
          onClick={handleClick}
          startIcon={startIcon}
          endIcon={<ExpandMoreIcon />}>
          <Typography className={classes.dropdownHeaderButtonText}>{name}</Typography>
        </Button>
        <Popper transition open={open} anchorEl={anchorEl} placement='bottom'>
          <ConnectWallet
            open={true}
            options={['phantom', 'sollet', 'extension']}
            handleClose={() => {}}
            onSelect={() => {}}
          />
        </Popper>
      </div>
    </ClickAwayListener>
  )
}
export default DropdownHeaderButton
