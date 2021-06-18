import React from 'react'
import { Scrollbars } from 'rc-scrollbars'
import useStyles from './style'

export const SelectToken: React.FC<{}> = props => {
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
