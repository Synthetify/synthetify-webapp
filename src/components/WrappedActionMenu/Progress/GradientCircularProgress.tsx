import React from 'react'
import { CircularProgress, makeStyles, withWidth } from '@material-ui/core'
import { Breakpoint, BreakpointValues } from '@material-ui/core/styles/createBreakpoints'

export interface IProps {
  size: BreakpointValues
  width?: Breakpoint
  firstColor?: string
  secondColor?: string
  thickness?: number
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
  thickness = 2,
  size,
  width,
  style
}) => {
  const classes = useStyles()
  const progressSize = width ? size[width] : 40

  return (
    <>
      <svg width='0' height='0'>
        <linearGradient id='linearColors' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='20%' stopColor={firstColor} />
          <stop offset='90%' stopColor={secondColor} />
        </linearGradient>
      </svg>
      <CircularProgress
        size={progressSize}
        thickness={thickness}
        classes={{ circle: classes.circle }}
        style={style}
      />
    </>
  )
}

export default withWidth()(GradientCircularProgress)
