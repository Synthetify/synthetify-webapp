import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16,
    color: colors.gray.manatee
  },
  icon: {
    paddingTop: 10,
    paddingRight: 10,
    minWidth: 42
  },
  success: {
    paddingRight: 16,
    color: colors.green.main
  },
  failed: {
    paddingRight: 16,
    color: colors.red.error
  }
}))

export default useStyles
