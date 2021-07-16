import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: colors.gray.component,
    borderStyle: 'solid',
    borderWidth: 0,
    borderLeftWidth: 10,
    borderColor: colors.green.snackbar,
    borderRadius: 10,
    padding: 10
  }
}))

export default useStyles
