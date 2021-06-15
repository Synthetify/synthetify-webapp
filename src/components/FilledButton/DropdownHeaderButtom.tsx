import React from 'react'
import { Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'

const blurAllOfClass = (className: string) => {
  const els = document.getElementsByClassName(className)

  const filters = 'blur(4px)'

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
  return (
    <Button
      className={classes.dropdownHeaderButton}
      variant='contained'
      classes={{ disabled: classes.disabled }}
      disabled={disabled}
      onClick={() => {
        blurAllOfClass(classToBlur)
      }}
      startIcon={startIcon}
      endIcon={<ExpandMoreIcon />}>
      {name}
    </Button>
  )
}
export default DropdownHeaderButton
