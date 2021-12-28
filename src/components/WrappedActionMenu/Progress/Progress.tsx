import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import GradientCircularProgress from '@components/WrappedActionMenu/Progress/GradientCircularProgress'
import progressSuccess from '@static/svg/progress-success.svg'
import progressFailed from '@static/svg/progress-faild.svg'
import useStyles from './style'

export type ProgressState = 'progress' | 'success' | 'failed' | 'none'

export interface IProps {
  state: ProgressState
  message?: string,
  className?: string
}

export const Progress: React.FC<IProps> = ({ state, message, className }) => {
  const classes = useStyles()

  const progressIcon = (state: ProgressState) => {
    if (state === 'success') {
      return <img src={progressSuccess} alt='success' style={{ marginTop: 10 }} />
    } else if (state === 'failed') {
      return <img src={progressFailed} alt='failed' style={{ marginTop: 10 }} />
    }
    return (
      <GradientCircularProgress
        style={{ marginTop: 10 }}
        size={{
          xs: 30,
          sm: 40,
          md: 40,
          lg: 40,
          xl: 40
        }}
      />
    )
  }

  return (
    <Typography component={'span'} className={className}>
      {state !== 'none' ? (
        <Grid container direction='row' alignItems='center' wrap='nowrap' style={{ height: 52 }}>
          <Grid item className={classes.icon}>
            {progressIcon(state)}
          </Grid>
          <Grid item className={classes.text}>
            {message}
          </Grid>
        </Grid>
      ) : (
        <Grid style={{ height: 52 }} />
      )}
    </Typography>
  )
}
