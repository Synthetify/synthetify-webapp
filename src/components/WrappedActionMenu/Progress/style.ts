import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    color: colors.gray.manatee
  },
  icon: {
    paddingRight: 10,
    minWidth: 42
  },
  progressWrapper: {
    paddingTop: 10
  },
  success: {
    paddingTop: 10,
    color: colors.green.main
  },
  failed: {
    paddingTop: 10,
    color: colors.red.error
  }
}))

export default useStyles
