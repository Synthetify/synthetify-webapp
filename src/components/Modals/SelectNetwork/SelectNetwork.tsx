import React from 'react'
import { Typography, Popper, Grid } from '@material-ui/core'
import useStyles from './style'

interface ISelectNetwork {
  name: string
  network: string
}
export interface ISelectNetworkModal {
  networks: ISelectNetwork[]
  open: boolean
  anchorEl: HTMLButtonElement | null
  onSelect: (wallet: string) => void
}
export const SelectNetwork: React.FC<ISelectNetworkModal> = ({
  networks,
  anchorEl,
  open,
  onSelect
}) => {
  const classes = useStyles()

  return (
    <Popper open={open} anchorEl={anchorEl}>
      <Grid className={classes.root} container alignContent='space-around' direction='column'>
        {networks.map(({ name, network }) => (
          <Grid
            item
            className={classes.listItem}
            alignItems='center'
            onClick={() => onSelect(network)}>
            <Typography className={classes.name}>{name}</Typography>
            <Typography className={classes.network}>{network}</Typography>
          </Grid>
        ))}
      </Grid>
    </Popper>
  )
}
export default SelectNetwork
