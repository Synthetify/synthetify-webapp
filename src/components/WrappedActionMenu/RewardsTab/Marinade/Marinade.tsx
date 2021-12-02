import React from 'react'
import { Grid, Popover, Typography, useMediaQuery } from '@material-ui/core'
import useStyles from './style'
import icons from '@static/icons'
import { theme } from '@static/theme'
interface IProp {
  marinade: string
}
export const Marinade: React.FC<IProp> = ({ marinade }) => {
  const classes = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Grid
      className={classes.root}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <img src={icons.marinade} alt='' className={classes.marinadeIcon} />
      <Typography className={classes.mnde}>
        {marinade}% {!isSmDown ? 'MNDE' : ''}
      </Typography>
      <Popover
        id='mouse-over-popover'
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography className={classes.text}>Average MNDE APY</Typography>
      </Popover>
    </Grid>
  )
}
