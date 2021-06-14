import React from 'react'
import { Button, PropTypes, Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './style'

export interface IProps {
  name?: string
  value?: string
  onClick?: () => void
  className?: string
}
export const ValueCard: React.FC<IProps> = ({
  name,
  value,
  onClick,
  className
}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Title placeholder
        </Typography>
        <Typography variant="h5" component="h2">
          Content placeholder
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
