import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    paddingRight: 0,
    height: 74,
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-between'
    },
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
    marginRight: 0,
    marginTop: -2
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
    [theme.breakpoints.down('md')]: {
      width: 'max-content'
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '250px',
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
