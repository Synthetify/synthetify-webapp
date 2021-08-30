import { colors } from '@static/theme'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    lineHeight: '30px',
    width: 160,
    height: 56,
    fontWeight: 700,
    backgroundColor: colors.navy.background,

    '&:hover': {
      backgroundColor: colors.navy.background
    },

    [theme.breakpoints.down('xs')]: {
      height: 48,
      minWidth: 96,
      maxWidth: 110
    }
  },
  icon: {
    minWidth: 30,
    height: 30,
    marginRight: 2,

    [theme.breakpoints.down('xs')]: {
      height: 24,
      minWidth: 24
    }
  }
}))

export default useStyles
