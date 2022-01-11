import React from 'react'
import { Button, CardMedia, useMediaQuery } from '@material-ui/core'
import { blurContent, unblurContent } from '@consts/uiUtils'
import SelectTokenModal from '@components/Modals/SelectModals/SelectTokenModal/SelectTokenModal'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import icons from '@static/icons'
import { BN } from '@project-serum/anchor'
import classNames from 'classnames'
import { theme, typography } from '@static/theme'
import SelectPairModal from '@components/Modals/SelectModals/SelectPairModal/SelectPairModal'
import useStyles from './style'

export interface ISelectModal {
  name?: string
  current: string | null
  centered?: boolean
  tokens?: Array<{ symbol: string; balance?: BN; assetDecimals?: number }>
  pairs?: Array<{ symbol1: string; symbol2: string }>
  onSelect?: (chosen: number) => void
  className?: string
  hideArrow?: boolean
  walletConnected?: boolean
  noWalletHandler?: () => void
  emptyTokensHandler?: () => void
}
export const Select: React.FC<ISelectModal> = ({
  name = 'Select a token',
  current,
  centered,
  tokens,
  pairs,
  onSelect,
  className,
  hideArrow,
  walletConnected,
  noWalletHandler,
  emptyTokensHandler
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = React.useState<boolean>(false)
  const isXs = useMediaQuery(theme.breakpoints.down('xs'))

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!walletConnected && noWalletHandler) {
      noWalletHandler()
      return
    }

    if (!!walletConnected && !tokens?.length && emptyTokensHandler) {
      emptyTokensHandler()
      return
    }

    if (onSelect) {
      setAnchorEl(event.currentTarget)
      blurContent()
      setOpen(true)
    }
  }

  const handleClose = () => {
    unblurContent()
    setOpen(false)
  }

  return (
    <>
      <Button
        disableRipple
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
        endIcon={
          !hideArrow ? <ExpandMoreIcon style={{ minWidth: 20, marginLeft: -8 }} /> : undefined
        }
        style={{
          ...(!current ? (isXs ? typography.caption4 : typography.body3) : {}),

          cursor: onSelect ? 'pointer' : 'auto'
        }}>
        <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
          {!current ? name : current}
        </span>
      </Button>
      {tokens && (
        <SelectTokenModal
          tokens={tokens}
          open={open}
          centered={centered}
          anchorEl={anchorEl}
          onSelect={onSelect ?? (() => {})}
          handleClose={handleClose}
        />
      )}
      {pairs && (
        <SelectPairModal
          pairs={pairs}
          open={open}
          centered={centered}
          anchorEl={anchorEl}
          onSelect={onSelect ?? (() => {})}
          handleClose={handleClose}
        />
      )}
    </>
  )
}
export default Select
