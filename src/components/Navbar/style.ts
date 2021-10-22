import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 93,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: colors.navy.navBar,
    height: 44,
    borderRadius: 10,
    ...typography.subtitle2,
    textTransform: 'capitalize',
    //boxShadow: 'none',

    '&:hover': {
      //boxShadow: 'none',
      backgroundColor: 'unset'
//      color: colors.navy.veryLightGrey
      //backgroundColor: 'transparent'
      //opacity: 0
    }
  },
  active: {
    background: colors.navy.button,
    color: colors.navy.veryLightGrey
  },
  disabled: {
    opacity: 1
  }
}))

export default useStyles
