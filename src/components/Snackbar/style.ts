import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.green.snackbar,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    fontWeight: 600,
    fontSize: 20,
    paddingBottom: 12.5,
    paddingTop: 12.5,
    '& svg': {
      paddingTop: 4,
      [theme.breakpoints.down('xs')]: {
        paddingTop: 2,
        paddingLeft: 5,
        width: 12,
        height: 12,
      }
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 11,
      maxWidth: 255,
      maxHeight: 32,
      //paddingBottom: 2,
      //paddingTop: 2,
    }
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
    margin: 2,
    fontWeight: 600,
    fontSize: 20,
    paddingBottom: 8,
    paddingTop: 8,
    '& svg': {
      paddingTop: 4
    }
  },
  info: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.blue.astel,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    fontWeight: 600,
    fontSize: 20,
    paddingBottom: 8,
    paddingTop: 8,
    '& svg': {
      paddingTop: 4
    }
  },
  warning: {
    backgroundColor: colors.navy.navButton,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.yellow.neon,
    borderRadius: 10,
    padding: 10,
    margin: 2,
    fontWeight: 600,
    fontSize: 20,
    paddingBottom: 8,
    paddingTop: 8,
    '& svg': {
      paddingTop: 4
    }
  },
  wrapperInner: {
    opacity: 0
  }
}))

export default useStyles
