import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

export interface IUserStatsTile {
  titleText: string;
  titleValueText: string;
}

export const UserStatsTile: React.FC<IUserStatsTile> = ({
  titleText,
  titleValueText
}) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} lg={4} classes={{ item: `${classes.gutter} ${classes.userStats}` }}>
      <Typography variant='h3' className={classes.titleText}>
        {titleText}
      </Typography>
      <Typography variant='h2' className={classes.titleValueText}>
        {titleValueText}
      </Typography>
    </Grid>
  )
}

export default UserStatsTile
