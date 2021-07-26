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

    [theme.breakpoints.down('md')]: {
      fontSize: 13,
      padding: '0px 12px',
      margin: 0
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

    [theme.breakpoints.down('md')]: {
      fontSize: 13
    }
  },
  disabled: {
    opacity: 0.5
  },
  paper: {
    background: 'transparent',
    boxShadow: 'none'
  }
}))

export default useStyles
