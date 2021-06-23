import React from 'react'
import { Typography, Popper, Grid } from '@material-ui/core'
import useStyles from './style'

export interface ISelectNetwork {
  name: string
  network: string
}
export interface ISelectNetworkModal {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (wallet: string) => void
  handleClose?: () => {}
}
export const SelectNetwork: React.FC<ISelectNetworkModal> = ({
  networks,
  anchorEl,
  open,
  onSelect,
  handleClose = () => {}
}) => {
  const classes = useStyles()

  return (
    <Popper open={open} anchorEl={anchorEl}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {networks.map(({ name, network }) => (
          <Grid
            item
            key={`networks-${name}`}
            className={classes.listItem}
            onClick={() => {
              onSelect(name)
              handleClose()
            }}>
            <Typography className={classes.name}>{name}</Typography>
            <Typography className={classes.network}>{network}</Typography>
          </Grid>
        ))}
      </Grid>
    </Popper>
  )
}
export default SelectNetwork
