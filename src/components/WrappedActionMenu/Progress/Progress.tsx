import React from 'react'
import { Typography } from '@material-ui/core'

export interface IProps {
  state: 'progress' | 'success' | 'failed'
  message: string
}

export const Progress: React.FC<IProps> = ({ state, message }) => {
  return (
    <Typography>
      {state} x {message}
    </Typography>
  )
}
