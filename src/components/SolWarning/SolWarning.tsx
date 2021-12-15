
import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import icons from '@static/icons'

interface Props {
  open: boolean
}

export const SolWarning: React.FC<Props> = ({ open }) => {
  const classes = useStyles()
  return (
    <Grid container className={classes.warningContainer} style={{ display: open ? 'block' : 'none' }}>
      <Grid className={classes.warningBlock}>
        <Typography component='p'><img src={icons.exclamation}></img></Typography>
        <Typography component='h1' className={classes.warningHeader}>You have less than 0.05 SOL in your wallet!</Typography>
        <Typography component='p' className={classes.warningText}>You cannot deposit xSOL right now. Top-up your wallet and try again later</Typography>
        <Button className={classes.warningButton}>Dismiss</Button>
      </Grid>
    </Grid>
  )
}
