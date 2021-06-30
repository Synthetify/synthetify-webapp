import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'

export interface IProps {
  firstColor?: string
  secondColor?: string
  width?: number
  style?: React.CSSProperties
}

const useStyles = makeStyles(() => ({
  circle: {
    stroke: 'url(#linearColors)'
  }
}))

export const GradientCircularProgress: React.FC<IProps> = ({
  firstColor = '#00F9BB',
  secondColor = '#627EEA',
  width = 2,
  style
}) => {
  const classes = useStyles({})

  return (
    <>
      <svg width='0' height='0'>
        <linearGradient id='linearColors' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='20%' stopColor={firstColor} />
          <stop offset='90%' stopColor={secondColor} />
        </linearGradient>
      </svg>
      <CircularProgress thickness={width} classes={{ circle: classes.circle }} style={style} />
    </>
  )
}

export default GradientCircularProgress
