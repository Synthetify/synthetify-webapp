import React from 'react'
import { Button, CardMedia, useMediaQuery } from '@material-ui/core'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectTokenModal from '@components/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import icons from '@static/icons'
import { BN } from '@project-serum/anchor'
import useStyles from './style'
import classNames from 'classnames'
import { theme, typography } from '@static/theme'

export interface ISelectTokenModal {
  name?: string
  current: string | null
  centered?: boolean
  tokens: Array<{ symbol: string, balance?: BN, assetDecimals?: number }>
  onSelect: (chosen: string) => void
  className?: string
}
export const SelectToken: React.FC<ISelectTokenModal> = ({
  name = 'Select a token',
  current,
  centered,
  tokens,
  onSelect,
  className
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

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
        className={classNames(classes.button, className)}
        classes={{ startIcon: classes.startIcon }}
        color='primary'
        variant='contained'
        onClick={handleClick}
        startIcon={
          !current ? null : (
            <CardMedia className={classes.icon} image={icons[current] ?? icons.SNY} />
          )
        }
        endIcon={<ExpandMoreIcon style={{ minWidth: 20, marginLeft: !current ? -8 : -6 }} />}
        style={
          !current ? (isXs ? typography.caption4 : typography.body3) : undefined
        }
      >
        <span style={{ position: 'relative', top: -1, whiteSpace: 'nowrap' }}>{!current ? name : current}</span>
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
