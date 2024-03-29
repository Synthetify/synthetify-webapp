import React from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import useStyles from './style'
import icons from '@static/icons'
import { colors, theme } from '@static/theme'
import MobileTooltip from '@components/MobileTooltip/MobileTooltip'
interface IProp {
  lido: string
}
export const Lido: React.FC<IProp> = ({ lido }) => {
  const classes = useStyles()

  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <MobileTooltip
      mobilePlacement='bottom-start'
      desktopPlacement='bottom-start'
      hint={
        <>
          <Grid style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
            <Typography className={classes.title}>Average Lido APY</Typography>{' '}
            <img src={icons.lidoIcon} alt='' className={classes.lidoIconTooltip} />
          </Grid>
          <p style={{ margin: 0, color: colors.navy.lightGrey }}>
            To receive Lido tokens, you need to have deposited stSOL and minted debt. Tokens are
            distributed once a week. Snapshots are taken once a day to determine, how much tokens
            you would receive.
          </p>
        </>
      }
      anchor={
        <Grid className={classes.root}>
          <img src={icons.LidoIconBg} alt='' className={classes.lidoIcon} />
          <Typography className={classes.mnde}>
            {lido}% {!isSmDown ? 'LIDO' : ''}
          </Typography>
        </Grid>
      }
    />
  )
}
