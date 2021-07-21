import React from 'react'

import { useSelector } from 'react-redux'
import { Backdrop, Grid, CardMedia } from '@material-ui/core'
import { loader } from '@selectors/ui'
import video from '@static/loading.mp4'
import useStyles from './style'

export const GlobalLoader: React.FC = () => {
  const loaderData = useSelector(loader)
  const classes = useStyles()
  return (
    <Backdrop
      transitionDuration={{ appear: 0, exit: 300 }}
      className={classes.backdrop}
      open={loaderData.open}>
      <Grid container direction='column' alignItems='center' justifyContent='center' spacing={2}>
        <Grid item>
          <CardMedia
            autoPlay
            loop
            muted
            component='video'
            height='100%'
            image={video}
            title='Loading wallet'
          />
        </Grid>
        {/* <Grid item>
          <Typography variant='h3'>{loaderData.message}</Typography>
        </Grid> */}
      </Grid>
    </Backdrop>
  )
}

export default GlobalLoader
