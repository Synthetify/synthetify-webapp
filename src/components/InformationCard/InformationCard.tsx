import React, { useState, useEffect } from 'react'
import useStyles from './style'
import SNYlogo from '@static/svg/synthetifyError.svg'
import { Grid, Typography, Container, Avatar, Button } from '@material-ui/core'
const InformationCard = () => {
  const [display, setDisplay] = useState(true)
  useEffect(() => {
    display ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'visible'
  }, [display])
  const classes = useStyles()
  return (
    <div style={{ display: display ? 'block' : 'none' }}>
      <div className={classes.infoBackground}></div>
      <Grid className={classes.info}>
        <Avatar alt='logo Synthetify' src={SNYlogo} className={classes.infoLogo}/>
        <Container className={classes.infoContainer}>
          <Typography component='h2' className={classes.infoHeader}>OOPS!</Typography>
          <Typography component='p' className={classes.infoParagraph}>Exchange is temporarily halted... <br/>Click close to open the app.</Typography>
          <Button onClick={() => {
            setDisplay(!display)
          }}
          className={classes.infoBtn}>
            close
          </Button>
        </Container>
      </Grid>
    </div>
  )
}

export default InformationCard
