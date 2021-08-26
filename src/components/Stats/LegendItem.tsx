import { Grid } from '@material-ui/core'
import { colors } from '@static/theme'
import React from 'react'

export interface IProps {
  name: string
  percentage?: number
  price?: number
  color: string
}
export const LegendItem: React.FC<IProps> = ({ name, percentage, price, color }) => {
  return (
    <div style={{ padding: 6 }}>
      <Grid container>
        <li style={{ fontSize: 21, color: color }}>
          <span style={{ position: 'relative', left: '-10px' }}>{name}</span>
          {percentage !== undefined ? (
            <span style={{ position: 'relative', color: 'white' }}>{`(${String(
              percentage
            )}%)`}</span>
          ) : null}
        </li>
        {price !== undefined ? (
          <li style={{ fontSize: 16, color: colors.navy.button, paddingLeft: 10 }}>
            <span style={{ position: 'relative', left: '-10px', lineHeight: '25px' }}>
              {`$${String(price)}`}
            </span>
          </li>
        ) : null}
      </Grid>
    </div>
  )
}
export default LegendItem
