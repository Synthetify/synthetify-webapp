import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  circle: {
    stroke: 'url(#linearColors)'
  }
}))

export const GradientCircularProgress: React.FC = () => {
  const classes = useStyles({})

  return (
    <>
      <svg width='0' height='0'>
        <linearGradient id='linearColors' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='20%' stopColor='#39F' />
          <stop offset='90%' stopColor='#F3F' />
        </linearGradient>
      </svg>
      <CircularProgress thickness={4} classes={{ circle: classes.circle }} />
    </>
  )
}

export default GradientCircularProgress
