import React from 'react'
import { Button } from '@material-ui/core'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectTokenModal from '@components/Modals/SelectTokenModal/SelectTokenModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export interface ISelectTokenModal {
  name?: string
  tokens: string[]
  className?: string
  onSelect: (chosen: string) => void
}
export const SelectToken: React.FC<ISelectTokenModal> = ({
  name = 'Select a token',
  tokens,
  onSelect,
  className
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    blurContent()
    setOpen(true)
  }

  const handleClose = () => {
    unblurContent()
    setOpen(false)
  }

  return (
    <div>
      <Button
        className={className}
        color='primary'
        variant='contained'
        onClick={handleClick}
        endIcon={<ExpandMoreIcon style={{ minWidth: 20 }} />}>
        {name}
      </Button>
      <SelectTokenModal
        tokens={tokens}
        open={open}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
      />
    </div>
  )
}
export default SelectToken
