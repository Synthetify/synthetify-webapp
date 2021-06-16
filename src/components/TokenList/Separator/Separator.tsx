import React from 'react'
import { ColorProperty } from 'csstype'

export interface IProps {
  color?: ColorProperty
}

export const Separator: React.FC<IProps> = ({ color }) => {
  return (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5
      }}
    />
  )
}

export default Separator
