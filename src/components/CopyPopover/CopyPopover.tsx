import { Grid, Popover, Typography } from '@material-ui/core'
import { PublicKey } from '@solana/web3.js'
import React from 'react'
import Copy from '@static/svg/copy.svg'
import useStyles from './style'

interface IProp {
  address: PublicKey
}
export const CopyPopover: React.FC<IProp> = ({ address }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const openCopiedText = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    navigator.clipboard.writeText(address.toString()).catch(() => console.log('No copied'))
    setAnchorEl(event.currentTarget)
    setOpen(true)
    setTimeout(() => setOpen(false), 3000)
  }

  const closeCopiedText = () => {
    setAnchorEl(null)
    setOpen(false)
  }
  const classes = useStyles()
  return (
    <Grid container item direction='row' alignItems='center' className={classes.copy}>
      <img
        id={'collateral'}
        src={Copy}
        alt=''
        className={classes.copyIcon}
        onClick={openCopiedText}
      />

      <Popover
        classes={{ paper: classes.popover }}
        open={open}
        anchorEl={anchorEl}
        onClose={closeCopiedText}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}>
        <Typography className={classes.copiedText}>Copied</Typography>
      </Popover>
    </Grid>
  )
}
