import { colors, typography } from '@static/theme'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 10,
    ...typography.subtitle1,
    minWidth: 127,
    height: 42,
    backgroundColor: colors.navy.navButton,
    width: 'fit-content',
    flexShrink: 0,
    paddingInline: 5,

    '&:hover': {
      backgroundColor: colors.navy.navButton
    },

    [theme.breakpoints.down('md')]: {
      minWidth: 107,
      borderRadius: 7
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 89,
      height: 34,
      borderRadius: 6,
      ...typography.body3
    }
  },
  icon: {
    minWidth: 30,
    height: 30,
    [theme.breakpoints.down('xs')]: {
      height: 24,
      minWidth: 24
    }
  },
  startIcon: {
    marginRight: 5,
    marginLeft: 0
  }
}))

export default useStyles
