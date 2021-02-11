import React from 'react'

import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress, Grid, Typography } from '@material-ui/core'
import { loader } from '@selectors/ui'
import useStyles from './style'

export const GlobalLoader: React.FC = () => {
  const loaderData = useSelector(loader)
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={loaderData.open}>
      <Grid container direction='column' alignItems='center' justify='center' spacing={2}>
        <Grid item>
          <CircularProgress size={100} className={classes.loader} color='primary' />
        </Grid>
        <Grid item>
          <Typography variant='h3'>{loaderData.message}</Typography>
        </Grid>
      </Grid>
    </Backdrop>
  )
}

export default GlobalLoader
