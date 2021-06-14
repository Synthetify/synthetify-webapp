import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  name: string
  value: string
  onClick?: () => void
}
export const ValueCard: React.FC<IProps> = ({
  name,
  value,
  onClick,
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.valueCard} onClick={onClick}>
      <CardContent>
        <Typography className={classes.valueCardTitle}>
          {name}
        </Typography>
        <Typography className={classes.valueCardAmount}>
          {value}
        </Typography>
      </CardContent>
    </Card>
    /*
    <Button
      className={classNames(className, classes.valueCard)}
      color={color}
      variant='outlined'
      type={onClick ? 'button' : 'submit'}
      startIcon={startIcon}
      onClick={onClick}>
      {name}
    </Button>
    */
  )
}
export default ValueCard
