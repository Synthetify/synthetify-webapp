import React from 'react'
import Percent from '@static/svg/percent.svg'
import { Grid, Popover, Typography } from '@material-ui/core'
import useStyles from './style'
interface IProp {
  avgAPY: string
}
export const AverageAPY: React.FC<IProp> = ({ avgAPY = 0 }) => {
  const classes = useStyles()
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
      onMouseLeave={handlePopoverClose}>
      <img src={Percent} alt='' className={classes.percentIcon} />
      <Typography className={classes.apy}>
        APY:
        <span
          style={{
            color: '#40BFA0',
            paddingLeft: '8px'
          }}>
          {avgAPY}%
        </span>
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
        <Typography className={classes.text}>Average APY (based on total debt value)</Typography>
      </Popover>
    </Grid>
  )
}
