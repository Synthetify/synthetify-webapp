import React from 'react'
import { Typography, Popper, Grid } from '@material-ui/core'
import useStyles from './style'

export interface IRoutesModal {
  routes: string[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  handleClose?: () => void
  onSelect: (selected: string) => void
  current?: string
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  anchorEl,
  handleClose = () => {},
  onSelect,
  current
}) => {
  const classes = useStyles()

  return (
    <Popper open={open} anchorEl={anchorEl} placement='bottom'>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {routes.map(route => (
          <Grid
            item
            key={`routes-${route}`}
            className={classes.listItem}
            onClick={() => {
              onSelect(route)
              handleClose()
            }}>
            <Typography className={current === route ? classes.current : classes.name}>{route}</Typography>
          </Grid>
        ))}
      </Grid>
    </Popper>
  )
}
export default RoutesModal
