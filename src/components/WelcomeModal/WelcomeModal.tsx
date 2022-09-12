import { OutlinedButton } from '@components/OutlinedButton/OutlinedButton'
import { blurContent, unblurContent } from '@consts/uiUtils'
import { Grid, Popover, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import useStyles from './style'

const textModal = {
  textHeader: 'Welcome to Synthetify!',
  firstParagraph:
    'We are glad that you’ve decided to use Synthetify and want us to assist you in this journey!',
  secondParagraph:
    'In the beginning, it is normal to have some questions and doubts. We have prepared a few articles to help you find yourself on our website.',
  firstPoint:
    'If you need some clarification about the app’s functionalities, you can take a look at our  ',
  secondPoint:
    ' you can read the short text about staking, where we described its mechanisms and how you can earn while doing it.',
  thirdPoint: ' We’ve got you covered with this post with some tips.',
  fourthPoint: '. - step by step, it’s easier than you think!',
  fifthPoint: '. Remember, to receive these rewards, you have to be a debt pool participant.',
  social: 'If you need any more explanations, feel free to DM us on our ',
  conjunction: '  or  ',
  buttonText: 'Let’s begin!'
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
                      <ul className={classes.oneListItem}>
                        <li className={classes.pointer}>
                          <Typography className={classes.textPoint}>
                            {textModal.firstPoint}
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/app-tutorial'
                              rel='noopener'
                              target='_blank'>
                              tutorial
                            </a>
                            .
                          </Typography>
                        </li>
                        <li className={classes.pointer}>
                          <Typography className={classes.textPoint}>
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/staking'
                              rel='noopener'
                              target='_blank'>
                              Here
                            </a>
                            {textModal.secondPoint}
                          </Typography>
                        </li>
                        <li className={classes.pointer}>
                          <Typography className={classes.textPoint}>
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/liquidation'
                              rel='noopener'
                              target='_blank'>
                              Want to know how not to be liquidated?
                            </a>
                            {textModal.thirdPoint}
                          </Typography>
                        </li>
                        <li className={classes.pointer}>
                          <Typography className={classes.textPoint}>
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/borrowing'
                              rel='noopener'
                              target='_blank'>
                              Introduction to borrowing money
                            </a>
                            {textModal.fourthPoint}
                          </Typography>
                        </li>
                        <li className={classes.pointer}>
                          <Typography className={classes.textPoint}>
                            <a
                              className={classes.link}
                              href='https://synthetify.io/blog/rewards'
                              rel='noopener'
                              target='_blank'>
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
                        <a
                          className={classes.link}
                          href='https://discord.gg/EDrf437'
                          rel='noopener'
                          target='_blank'>
                          Discord
                        </a>
                        {textModal.conjunction}
                        <a
                          className={classes.link}
                          href='https://t.me/synthetify'
                          rel='noopener'
                          target='_blank'>
                          Telegram!
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.backgroundFooter}>
                  <Grid container className={classes.buttonContainer}>
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
