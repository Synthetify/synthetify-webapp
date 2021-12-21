import React from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import useStyles from './style'
import icons from '@static/icons'
import { colors, theme } from '@static/theme'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
interface IProp {
  marinade: string
}
export const Marinade: React.FC<IProp> = ({ marinade }) => {
  const classes = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <MobileTooltip
      mobilePlacement='bottom-start'
      desktopPlacement='bottom-start'
      hint={
        <>
          <Grid style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
            <Typography className={classes.title}>Average MNDE APY</Typography>{' '}
            <img src={icons.marinadeWhite} alt='' className={classes.marinadeIconTooltip} />
          </Grid>
          <p style={{ margin: 0, color: colors.navy.lightGrey }}>
            To receive MNDE tokens, you need to have deposited mSOL and minted debt. Tokens are
            distributed once a week. Snapshots are taken once a day to determine, how much tokens
            you would receive.
          </p>
        </>
      }
      anchor={
        <Grid className={classes.root}>
          <img src={icons.marinade} alt='' className={classes.marinadeIcon} />
          <Typography className={classes.mnde}>
            {marinade}% {!isSmDown ? 'MNDE' : ''}
          </Typography>
        </Grid>
      }
    />
  )
}
