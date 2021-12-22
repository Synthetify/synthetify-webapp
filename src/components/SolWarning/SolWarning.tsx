
import { Button, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './style'
import icons from '@static/icons'
import { blurContent, unblurContent } from '@consts/uiUtils'

interface Props {
  open: boolean
}

export const SolWarning: React.FC<Props> = ({ open }) => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState<boolean>(open)
  useEffect(() => {
    setShowModal(open)
    if (open) {
      blurContent()
    }
  }, [open])
  return (
    <Grid className={classes.warningContainer} style={{ display: showModal ? 'flex' : 'none' }}>
      <Grid className={classes.warningBlock}>
        <Typography component='p'><img src={icons.exclamation}></img></Typography>
        <Typography component='h1' className={classes.warningHeader}>You have less than 0.05 SOL in your wallet!</Typography>
        <Typography component='p' className={classes.warningText}> Be aware that your transactions might fail because of having not enough funds for network fees.</Typography>
        <Button className={classes.warningButton} onClick={() => {
          setShowModal(false)
          unblurContent()
        }}>Close</Button>
      </Grid>
    </Grid>
  )
}
