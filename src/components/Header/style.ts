import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.navy.background,
    paddingRight: 0,
    height: 100,

    [theme.breakpoints.down('sm')]: {
      height: 60
    }
  },
  snyLogo: {
    width: 50,
    height: 44,
    margin: 10,
    marginLeft: 50,

    [theme.breakpoints.down('md')]: {
      margin: 0,
      marginLeft: 32
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: 8
    }
  },
  divider: {
    background: colors.navy.grey
  },
  verticalDivider: {
    background: colors.navy.grey,
    height: 50,
    marginLeft: 40,
    marginRight: 10,

    [theme.breakpoints.down('sm')]: {
      margin: 0
    }
  },
  leftDivider: {
    [theme.breakpoints.only('md')]: {
      marginLeft: 32
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: 5
    }
  },
  connectedWalletIcon: {
    minWidth: 21,
    height: 21,
    marginRight: 5,

    [theme.breakpoints.down('xs')]: {
      marginRight: 0
    }
  },
  dehazeButton: {
    borderRadius: 10,
    padding: 4,
    paddingTop: 1,
    paddingBottom: 1,

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  dehazeIcon: {
    width: 45,
    height: 38,
    fill: colors.navy.navBar
  },
  dotsButton: {
    borderRadius: 10,
    padding: '5px 8px',
    marginRight: 100,
    marginLeft: 50,

    [theme.breakpoints.down('md')]: {
      marginRight: 30
    },

    [theme.breakpoints.down('sm')]: {
      padding: '1px 4px',
      marginRight: 8,
      marginLeft: 10
    },

    '&:hover': {
      background: colors.navy.navButton
    }
  },
  left: {
    maxWidth: 200,
    [theme.breakpoints.down('md')]: {
      maxWidth: 140
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 83
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 68
    }
  },
  mobileRight: {
    maxWidth: 83,

    [theme.breakpoints.down('xs')]: {
      maxWidth: 65
    }
  },
  rightDivider: {
    marginLeft: 20,

    [theme.breakpoints.down('xs')]: {
      marginLeft: 5
    }
  },
  buttons: {
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  }
}))

export default useStyles
