import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import Skeleton from '@material-ui/lab/Skeleton'

export const PageSkeleton: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={4}
          className={classes.headerRoot}
          alignItems='center'
          justify='space-evenly'>
          <Grid item lg={4}>
            <Skeleton variant='rect' width={330} height={330} className={classes.roundBorder} />
          </Grid>
          <Grid item lg={4}>
            <Skeleton variant='rect' width={330} height={330} className={classes.roundBorder} />
          </Grid>
          <Grid item lg={4}>
            <Skeleton variant='rect' width={330} height={330} className={classes.roundBorder} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.switch}>
        <Skeleton variant='rect' width={260} height={50} className={classes.roundBorder} />
      </Grid>
      <Grid item xs={12} className={classes.content}>
        <Skeleton variant='rect' width={'90%'} height={800} className={classes.roundBorder} />
      </Grid>
    </Grid>
  )
}
export default PageSkeleton
