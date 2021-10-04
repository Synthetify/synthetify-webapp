import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'

interface IProps {
  name: string
  value: number
  desc: string
}

export const StatisticsCard: React.FC<IProps> = ({ name, value, desc }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent classes={{ root: classes.root }}>
        <Grid className={classes.header}>
          <Typography className={classes.cardName}>{name}</Typography>
          {name === 'Debt' || name === 'Collateral' ? (
            <Typography className={classes.cardTime}>Current</Typography>
          ) : (
            <Typography className={classes.cardTime}>last 24h</Typography>
          )}
        </Grid>
        <Typography className={classes.cardValue}>
          $
          <AnimatedNumber
            value={value}
            duration={400}
            formatValue={(value: string) =>
              Number(value) > 99999
                ? Number(Number(value).toFixed(0)).toLocaleString('pl-PL')
                : Number(value).toLocaleString('pl-PL').replace(',', '.')
            }
          />
        </Typography>
        <Typography className={classes.cardDesc}>{desc}</Typography>
      </CardContent>
    </Card>
  )
}
