import React from 'react'
import { Button, CardMedia } from '@material-ui/core'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectTokenModal from '@components/Modals/SelectTokenModal/SelectTokenModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from './style'
import icons from '@static/icons'
import { BN } from '@project-serum/anchor'

export interface ISelectTokenModal {
  name?: string
  current: string | null
  centered?: boolean
  tokens: Array<{ symbol: string, balance?: BN, assetDecimals?: number }>
  onSelect: (chosen: string) => void
}
export const SelectToken: React.FC<ISelectTokenModal> = ({
  name = 'Select a token',
  current,
  centered,
  tokens,
  onSelect
}) => {
  const classes = useStyles()
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
    <>
      <Button
        className={classes.button}
        color='primary'
        variant='contained'
        onClick={handleClick}
        startIcon={
          !current ? null : (
            <CardMedia className={classes.icon} image={icons[current] ?? icons.SNY} />
          )
        }
        endIcon={<ExpandMoreIcon style={{ minWidth: 20, marginLeft: -8 }} />}>
        {!current ? name : current}
      </Button>
      <SelectTokenModal
        tokens={tokens}
        open={open}
        centered={centered}
        anchorEl={anchorEl}
        onSelect={onSelect}
        handleClose={handleClose}
      />
    </>
  )
}
export default SelectToken
