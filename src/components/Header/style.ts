import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    paddingRight: 0,
    height: 74,

    [theme.breakpoints.down('sm')]: {
      height: 54
    }
  },
  snyLogo: {
    width: 45,
    height: 38,
    marginLeft: 25,

    [theme.breakpoints.down('sm')]: {
      width: 33,
      height: 28,
      marginInline: 16
    }
  },
  divider: {
    background: colors.navy.darkGrey
  },
  verticalDivider: {
    background: colors.navy.darkGrey,
    height: 50,
    marginInline: 25,

    [theme.breakpoints.down('sm')]: {
      height: 36,
      margin: 0
    }
  },
  connectedWalletIcon: {
    minWidth: 21,
    height: 21,
    marginRight: 0
  },
  dehazeButton: {
    borderRadius: 10,
    padding: 4,
    paddingTop: 1,
    paddingBottom: 1,
    marginLeft: 5,

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  dehazeIcon: {
    width: 45,
    height: 'auto',
    fill: colors.navy.navBar
  },
  dotsButton: {
    borderRadius: 10,
    padding: '0px 2px',
    marginRight: 25,

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  left: {
    maxWidth: 121,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 66
    }
  },
  right: {
    maxWidth: 125
  },
  mobileRight: {
    maxWidth: 66
  },
  buttons: {
    justifyContent: 'flex-end',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-evenly'
    }
  },
  link: {
    textDecoration: 'none',

    '&:not(:last-child)': {
      marginRight: 15
    }
  }
}))

export default useStyles
