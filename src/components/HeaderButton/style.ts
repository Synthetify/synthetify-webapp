import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerButton: {
    background: colors.navy.navButton,
    color: colors.navy.navBar,
    paddingInline: 25,
    borderRadius: 10,
    textTransform: 'none',
    fontSize: 16,
    height: 44,

    '&:not(:last-child)': {
      marginRight: 15
    },

    [theme.breakpoints.down('sm')]: {
      paddingInline: 0,
      width: 110,
      height: 36,
      fontSize: 13,

      '&:not(:last-child)': {
        marginRight: 0
      }
    },

    [theme.breakpoints.down('xs')]: {
      width: 72
    },

    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey
    }
  },
  headerButtonTextEllipsis: {
    textTransform: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 16,

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },
  disabled: {
    opacity: 0.5
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  },
  startIcon: {
    [theme.breakpoints.down('xs')]: {
      marginRight: 2
    }
  }
}))

export default useStyles
