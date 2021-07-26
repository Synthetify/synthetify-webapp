import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 118,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: colors.navy.navBar,
    padding: '2px 10px',
    lineHeight: '40px',
    borderRadius: 10,
    fontSize: '16px',
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: 4,

    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey
    }
  },
  active: {
    background: colors.navy.button,
    color: colors.navy.veryLightGrey,
    minWidth: 118,
    padding: '2px 10px',
    lineHeight: '40px',
    borderRadius: 10,
    fontSize: '16px',
    fontWeight: 700,
    textTransform: 'capitalize',
    boxShadow: 'none',
    margin: 4,

    '&:hover': {
      background: colors.navy.button,
      color: colors.navy.veryLightGrey
    }
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
