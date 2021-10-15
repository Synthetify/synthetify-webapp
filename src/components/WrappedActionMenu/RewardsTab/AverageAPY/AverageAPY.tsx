import React from 'react'
import Percent from '@static/svg/percent.svg'
import useStyles from './style'
import { Grid, Typography } from '@material-ui/core'

interface IProp {
  avgAPY: string
}
export const AverageAPY: React.FC<IProp> = ({ avgAPY = 0 }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.root}>
      <img src={Percent} alt='' className={classes.percentIcon} />
      <Typography className={classes.apy}>
        APY:
        <span
          style={{
            ...(avgAPY >= 0 ? { color: '#40BFA0' } : { color: '#C52727' }),
            paddingLeft: '8px'
          }}>
          {avgAPY}%
        </span>
      </Typography>
    </Grid>
  )
}
