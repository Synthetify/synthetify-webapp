import React from 'react'
import { ColorProperty } from 'csstype'

export interface IProps {
  color: ColorProperty
  height: number
}

export const Separator: React.FC<IProps> = ({ color, height }) => {
  return (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        borderWidth: 0,
        height: height
      }}
    />
  )
}

export default Separator
