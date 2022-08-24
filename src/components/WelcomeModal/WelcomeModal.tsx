import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'

const textModal = {
  textHeader: 'Welcome to Synthetify!',
  firstParagraph:
    'We are glad that you’ve decided to use Synthetify and want us to assist you in this journey',
  secondParagraph:
    'In the beginning, it is obvious to have questions and to have some second thoughts. We have prepared a few articles for you which should help you to findyourself on our page.',
  firstPoint: 'If you need some clarification about app functioning, you can take a look at our ',
  secondPoint:
    ' you have staking described in a few words, and how can you earn while staking tokens.',
  thirdPoint: ' and tips on how not to be liqudated.',
  fourthPoint: '. Step by step, it’s easier than you think!',
  fifthPoint: '. Remember, to receive these rewards, you have to be a debt pool participant.',
  social: 'If you need any more explanation feel free to DM us on our ',
  conjunction: '  or  ',
  buttonText: `Let's begin!`
}

const WelcomeModal = () => {
  const classes = useStyles()
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item>
        <Grid container alignItems='center' direction='column'>
          <Grid item>
            <Typography className={classes.heading}>{textModal.textHeader}</Typography>
          </Grid>
          <Grid item>
            <Grid container justifyContent='center' direction='column'>
              <Grid item className={classes.backgroundHeader}></Grid>
              <Grid item>
                <Grid container className={classes.textContainer}>
                  <Grid item>
                    <Typography className={classes.textPoint}>
                      {textModal.firstParagraph}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.text}>{textModal.secondParagraph}</Typography>
                  </Grid>
                  <Grid item>
                    <ul>
                      <li className={classes.pointer}>
                        <Typography className={classes.textPoint}>
                          {textModal.firstPoint}
                          <a className={classes.link} href=''>
                            tutorial
                          </a>
                          .
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  <Grid item>
                    <ul>
                      <li className={classes.pointer}>
                        <Typography className={classes.textPoint}>
                          <a className={classes.link} href=''>
                            Here
                          </a>
                          {textModal.secondPoint}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  <Grid item>
                    <ul>
                      <li className={classes.pointer}>
                        <Typography className={classes.textPoint}>
                          <a className={classes.link} href=''>
                            Liquidation in a nutshell
                          </a>
                          {textModal.thirdPoint}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  <Grid item>
                    <ul>
                      <li className={classes.pointer}>
                        <Typography className={classes.textPoint}>
                          <a className={classes.link} href=''>
                            Introduction to borrowing money
                          </a>
                          {textModal.fourthPoint}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  <Grid item>
                    <ul>
                      <li className={classes.pointer}>
                        <Typography className={classes.textPoint}>
                          <a className={classes.link} href=''>
                            The clue of rewarding
                          </a>
                          {textModal.fifthPoint}
                        </Typography>
                      </li>
                    </ul>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.text}>
                      {textModal.social}
                      <a className={classes.link} href=''>
                        Discord
                      </a>
                      {textModal.conjunction}
                      <a className={classes.link} href=''>
                        Telegram!
                      </a>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.backgroundFooter}>
                <Grid container>
                  <Grid item>
                    <button className={classes.closeButton}>{textModal.buttonText}</button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WelcomeModal
