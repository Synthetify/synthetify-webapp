import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import AnimatedNumber from '@components/AnimatedNumber'
import useStyles from './style'

export interface IProps {
  name: string
  value: string
}
export const StatsCard: React.FC<IProps> = ({ name, value }) => {
  const classes = useStyles()
  return (
    <Card className={classes.statsCard}>
      <CardContent>
        <Grid item container justifyContent='space-between' alignItems='center' spacing={1}>
          <Typography className={classes.statsCardTitle}>{name}</Typography>
          <Typography className={classes.statsCardSecondTitle} style={{ fontSize: 8 }}>
            last 24h
          </Typography>
        </Grid>

        <Typography className={classes.statsCardAmount} style={{ textAlign: 'center' }}>
          <AnimatedNumber value={value} duration={300} />
        </Typography>
        <Typography
          className={classes.pos}
          style={{ textAlign: 'center', fontSize: 7 }}>
          Lorem ipsum dolor sit amet.
        </Typography>
      </CardContent>
    </Card>
  )
}
export default StatsCard
