import React from 'react'
import { Card, CardContent, Typography, Divider } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  name: string
  value: string
  hint?: string
  onClick?: () => void
}
export const ValueCard: React.FC<IProps> = ({
  name,
  value,
  onClick
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent>
        <Typography className={classes.valueCardTitle}>
          {name}
        </Typography>
        <Divider className={classes.divider}/>
        <Typography className={classes.valueCardAmount}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
export default ValueCard
