import React from 'react'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import { Done, Close } from '@material-ui/icons'
import useStyles from './style'

export type ProgressState = 'progress' | 'success' | 'failed'

export interface IProps {
  state: ProgressState
  message: string
}

export const Progress: React.FC<IProps> = ({ state, message }) => {
  const classes = useStyles()

  const progressIcon = (state: ProgressState) => {
    if (state === 'success') {
      return <Done />
    } else if (state === 'failed') {
      return <Close />
    }
    return <CircularProgress />
  }

  return (
    <Typography>
      <Grid container direction='row'>
        <Grid item style={{ marginRight: 5 }}>
          {progressIcon(state)}
        </Grid>
        <Grid item>{message}</Grid>
      </Grid>
    </Typography>
  )
}
