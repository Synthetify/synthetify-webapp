import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import useStyles from './style'

interface ScrollbarProps {}

export const SelectToken: React.FC<ScrollbarProps> = props => {
  const classes = useStyles()
  console.log('classes')

  return (
    <Scrollbars
      renderThumbVertical={() => {
        return <div className={classes.scrollbarThumb}/>
      }}
      renderTrackVertical={() => {
        return <div className={classes.scrollbarTrack}/>
      }}
      {...props}
    />
  )
}

export default SelectToken
