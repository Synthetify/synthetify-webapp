import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    color: colors.gray.manatee
  },
  progress: {
    paddingTop: 10
  },
  success: {
    paddingTop: 10,
    color: '#00F9BB'
  },
  failed: {
    paddingTop: 10,
    color: '#F22F2F'
  }
}))

export default useStyles
