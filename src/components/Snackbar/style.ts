import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
 
const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.green.snackbar,
    borderRadius: 10,
    padding: 10,
    margin: 2
  },
  error: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.red.snackbar,
    color: colors.red.snackbar,
    borderRadius: 10,
    padding: 10,
    margin: 2
  },
  info: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.blue.astel,
    borderRadius: 10,
    padding: 10,
    margin: 2
  },
  warning: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.yellow.neon,
    borderRadius: 10,
    padding: 10,
    margin: 2
  },
  button: {
    width: 73,
    height: 33,
    backgroundColor: colors.navy.grey,
    borderRadius: 6,
    marginRight: 16,
    border: 'none',
    color: colors.navy.navButton,
    fontSize: 16,
    fontWeight: 800,
    transition: '1s all ease-in-out',
    '&:hover': {
      transform: 'scale(1.125)'
    }
  }
}))
 
export default useStyles