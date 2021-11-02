import { Grid, Popover, Typography } from '@material-ui/core'
import React from 'react'
import Copy from '@static/svg/copy.svg'
import useStyles from './style'
import { PublicKey } from '@solana/web3.js'
interface IGeneralInfo {
  collateralAmount: number
  debtAmount: number
  collateral: string
  borrowed: string
  limit: number
  reserve: number
  collateralAddress: PublicKey
  borrowedAddress: PublicKey
}

export const BorrowInfo: React.FC<IGeneralInfo> = ({
  collateral,
  collateralAddress,
  collateralAmount,
  borrowed,
  borrowedAddress,
  reserve,
  limit,
  debtAmount
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const openCopiedText = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (event.currentTarget.id === 'collateral') {
      navigator.clipboard
        .writeText(collateralAddress.toString())
        .catch(() => console.log('No copied'))
    } else {
      navigator.clipboard
        .writeText(borrowedAddress.toString())
        .catch(() => console.log('No copied'))
    }
    setAnchorEl(event.currentTarget)
    setOpen(true)
    setTimeout(() => setOpen(false), 3000)
  }

  const closeCopiedText = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  return (
    <Grid className={classes.root}>
      <Grid className={classes.wrapper}>
        <Typography className={classes.infoTitle}>Totals</Typography>
        <Grid container item className={classes.infoWrapper}>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral amount (xUSD):</Typography>
            <Typography className={classes.positionValue}>
              {'$'}
              {collateralAmount}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Debt amount:</Typography>
            <Typography className={classes.positionValue}>
              {'$'}
              {debtAmount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.wrapper}>
        <Typography className={classes.infoTitle}> General info</Typography>
        <Grid className={classes.infoWrapper}>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral:</Typography>
            <Typography className={classes.positionValue}>{collateral}</Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Borrowed asset:</Typography>
            <Typography className={classes.positionValue}>{borrowed}</Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Limit:</Typography>
            <Typography className={classes.positionValue}>
              {'$'}
              {limit}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Reserve:</Typography>
            <Typography className={classes.positionValue}>
              {'$'}
              {reserve}
            </Typography>
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Collateral address:</Typography>
            <Grid container item direction='row' alignItems='center' className={classes.copy}>
              <img
                id={'collateral'}
                src={Copy}
                alt=''
                className={classes.copyIcon}
                onClick={openCopiedText}
              />
              <Typography className={classes.positionValue}>
                {collateralAddress.toString().substr(0, 8)}...
              </Typography>
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
          </Grid>
          <Grid
            container
            item
            className={classes.infoPosition}
            justifyContent='space-between'
            alignItems='center'>
            <Typography className={classes.positionTitle}>Borrowed asset address:</Typography>
            <Grid container item direction='row' alignItems='center' className={classes.copy}>
              <img
                id={'borrowed'}
                src={Copy}
                alt=''
                className={classes.copyIcon}
                onClick={openCopiedText}
                aria-describedby={borrowedAddress.toString()}
              />
              <Typography className={classes.positionValue}>
                {borrowedAddress.toString().substr(0, 8)}...
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
