import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 93,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: colors.navy.navBar,
    height: 44,
    borderRadius: 5,
    fontSize: 16,
    textTransform: 'capitalize',
    boxShadow: 'none',

    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey
    }
  },
  active: {
    background: colors.navy.button,
    color: colors.navy.veryLightGrey,
    fontWeight: 700
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
