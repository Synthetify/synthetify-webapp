import React from 'react'
import { Button, Popover, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'

const blurAllOfClass = (className: string) => {
  const els = document.getElementsByClassName(className)

  for (const i in els) {
    const el = els[i] as HTMLElement
    if (!el.style) {
      return
    }
    el.style.filter = 'blur(4px) brightness(0.4)'
  }
}

const resetFiltersOfClass = (className: string) => {
  const els = document.getElementsByClassName(className)

  for (const i in els) {
    const el = els[i] as HTMLElement
    if (!el.style) {
      return
    }
    el.style.filter = 'none'
  }
}

export interface IProps {
  name: string
  classToBlur?: string
  disabled?: boolean
  onClick?: () => void
  startIcon?: JSX.Element
}
export const DropdownHeaderButton: React.FC<IProps> = ({
  name,
  classToBlur = 'blur-at-overlay',
  disabled = false,
  startIcon,
  onClick = () => {}
}) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurAllOfClass(classToBlur)
    onClick()
  }

  const handleClose = () => {
    setAnchorEl(null)
    resetFiltersOfClass(classToBlur)
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
        open={!!anchorEl}
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
