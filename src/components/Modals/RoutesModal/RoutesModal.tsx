import React from 'react'
import { Typography, Modal, Grid } from '@material-ui/core'
import useStyles from './style'

export interface IRoutesModal {
  routes: string[]
  open: boolean
  handleClose: () => void
  onSelect: (selected: string) => void
  current?: string
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  handleClose,
  onSelect,
  current
}) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {routes.map(route => (
          <Grid
            item
            className={classes.listItem}
            alignItems='center'
            onClick={() => onSelect(route)}>
            <Typography className={current === route ? classes.current : classes.name}>{route}</Typography>
          </Grid>
        ))}
      </Grid>
    </Modal>
  )
}
export default RoutesModal
