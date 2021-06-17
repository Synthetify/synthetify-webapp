import React from 'react'
import { Button, Popover, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'
import { blurContent, unblurContent } from '@consts/uiUtils'

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
    setOpen(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpen(false)
  }

  return (
    <div>
      <Button
        className={classes.dropdownHeaderButton}
        variant='contained'
        classes={{ disabled: classes.disabled }}
        disabled={disabled}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={<ExpandMoreIcon />}>
        {name}
      </Button>
      <Popover
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
        <Typography className={classes.textInsidePopover}>The content of the Popover</Typography>
      </Popover>
    </div>
  )
}
export default DropdownHeaderButton
