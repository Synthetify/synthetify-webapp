import React from 'react'
import { Typography, Modal, Grid } from '@material-ui/core'
import useStyles from './style'

export interface IRoutesModal {
  routes: string[]
  open: boolean
  handleClose: () => void
  onSelect: (wallet: string) => void
}
export const RoutesModal: React.FC<IRoutesModal> = ({
  routes,
  open,
  handleClose,
  onSelect
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
            <Typography className={classes.name}>{route}</Typography>
          </Grid>
        ))}
      </Grid>
    </Modal>
  )
}
export default RoutesModal
