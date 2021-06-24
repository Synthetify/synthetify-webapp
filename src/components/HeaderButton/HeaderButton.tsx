import React from 'react'
import { Button, ClickAwayListener, Popover, Typography } from '@material-ui/core'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'
export interface IProps {
  name: string
  onClick: (chosen: string) => void
  disabled?: boolean
}
export const HeaderButton: React.FC<IProps> = ({ name, onClick, disabled = false }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    // could use rewriting to backdrop-filter when browser support is better
    blurContent()
    onClick('idk yet')
    if (open) handleClose()
    else setOpen(true)
  }

  const handleClose = () => {
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
          {' '}
          <Typography variant='h2'>Sample Popover Text</Typography>
        </Popover>
      </div>
    </ClickAwayListener>
  )
}
export default HeaderButton
