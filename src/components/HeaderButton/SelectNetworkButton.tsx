import React from 'react'
import { Button, ClickAwayListener } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectNetwork from '@components/Modals/SelectNetwork/SelectNetwork'

export interface IProps {
  name: string
  onSelect: (chosen: string) => void
  disabled?: boolean
}
export const SelectNetworkButton: React.FC<IProps> = ({ name, onSelect, disabled = false }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    // could use rewriting to backdrop-filter when browser support is better
    blurContent()
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
          className={classes.headerButton}
          variant='contained'
          classes={{ disabled: classes.disabled }}
          disabled={disabled}
          onClick={handleClick}>
          {name}
        </Button>
        <SelectNetwork
          networks={[
            { name: 'testnet', network: 'https://api.solana.com/' },
            { name: 'localnet', network: 'https://127.0.0.1:8898/' }
          ]}
          open={open}
          anchorEl={anchorEl}
          onSelect={onSelect}
        />
      </div>
    </ClickAwayListener>
  )
}
export default SelectNetworkButton
