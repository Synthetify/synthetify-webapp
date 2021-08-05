import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerButton: {
    background: colors.navy.navButton,
    color: colors.navy.navBar,
    padding: '2px 25px',
    borderRadius: 10,
    textTransform: 'none',
    fontSize: 16,
    lineHeight: '40px',
    margin: 8,

    [theme.breakpoints.down('sm')]: {
      padding: '2px 0',
      margin: '0px 18px',
      width: 'calc(33% - 36px)'
    },

    [theme.breakpoints.down('xs')]: {
      padding: 0,
      fontSize: 13,
      margin: '0px 3px',
      width: 'calc(33% - 6px)'
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
    lineHeight: '40px',

    [theme.breakpoints.down('xs')]: {
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
