import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import AnimatedNumber from '@components/AnimatedNumber'

interface IProps {
  name: string,
  value: number,
  desc: string
}

export const StatisticsCard: React.FC<IProps> = ({ name, value, desc }) => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent classes={{ root: classes.root }}>
        <Typography className={classes.header}>
          <h1 className={classes.cardName}>{name}</h1>
          <p className={classes.cardTime}>last 24h</p>
        </Typography>
        <Typography className={classes.cardValue}>
          <AnimatedNumber
            value={value}
            duration={400}
            formatValue={(value: string) => {
              const num = Number(value)
              return num.toFixed(0)
            }}
          />
        </Typography>
        <Typography className={classes.cardDesc}>{desc}</Typography>
      </CardContent>
    </Card>
  )
}
