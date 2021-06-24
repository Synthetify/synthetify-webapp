import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    color: colors.gray.manatee
  },
  progressWrapper: {
    paddingTop: 10
  },
  progress: {
    color: colors.green.main
    // color: 'linear-gradient(225deg, #00F9BB -0.21%, #627EEA 100.21%)'
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
