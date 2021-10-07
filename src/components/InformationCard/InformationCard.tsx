import React, { useState } from 'react'
import useStyles from './style'
import SNYlogo from '@static/svg/synthetifyError.svg'
import { Grid, Typography, Container, Avatar } from '@material-ui/core'
const InformationCard = () => {
  const [display, setDisplay]: boolean = useState(true)
  const classes = useStyles()
  return (
    <div style={{ display: display ? 'block' : 'none' }}>
      <div className={classes.infoBackground}></div>
      <Grid className={classes.info}>
        <Avatar alt='logo Synthetify' src={SNYlogo} className={classes.infoLogo}/>
        <Container className={classes.infoContainer}>
          <Typography component='h2' className={classes.infoHeader}>OOPS!</Typography>
          <Typography component='p' className={classes.infoParagraph}>Something went wrong while loading the page... <br/>Please, try to reload it. If there’ll still be a problem, contact us!</Typography>
          
        </Container>
      </Grid>
    </div>
  )
}

export default InformationCard
