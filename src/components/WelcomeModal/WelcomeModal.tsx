import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Grid, Popover, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
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
  buttonText: `Let’s begin!`
}

const WelcomeModal: React.FC<{
  open: boolean
  handleClose: (value: boolean) => void
}> = ({ open, handleClose }) => {
  const classes = useStyles()

  const clickClose = () => {
    unblurContent()
    handleClose(false)
  }

  useEffect(() => {
    if (open) blurContent()
  }, [open])

  return (
    <Popover classes={{ paper: classes.container }} open={open}>
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
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/app-tutorial'>
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
                            <a className={classes.link} href='https://synthetify.io/blog/staking'>
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
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/liquidation'>
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
                            <a className={classes.link} href='https://synthetify.io/blog/borrowing'>
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
                            <a className={classes.link} href='https://synthetify.io/blog/rewards'>
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
                        <a className={classes.link} href='https://discord.gg/EDrf437'>
                          Discord
                        </a>
                        {textModal.conjunction}
                        <a className={classes.link} href='https://t.me/synthetify'>
                          Telegram!
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.backgroundFooter}>
                  <Grid container>
                    <Grid item>
                      <OutlinedButton
                        className={classes.closeButton}
                        name={textModal.buttonText}
                        color={'secondary'}
                        onClick={clickClose}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Popover>
  )
}

export default WelcomeModal
