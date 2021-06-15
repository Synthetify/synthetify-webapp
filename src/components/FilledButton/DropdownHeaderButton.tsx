import React from 'react'
import { Button, Popover } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'

const blurAllOfClass = (className: string) => {
  const els = document.getElementsByClassName(className)

  const filters = 'blur(4px) brightness(0.4)'

  for (const i in els) {
    const el = els[i] as HTMLElement
    if (!el.style) {
      return
    }

    if (el.style.filter !== filters) {
      el.style.filter = filters
    } else {
      el.style.filter = 'none'
    }
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
  }

  const open = Boolean(anchorEl)

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
        The content of the Popover
      </Popover>
    </div>
  )
}
export default DropdownHeaderButton
