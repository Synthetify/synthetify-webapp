import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  property: {
    fontSize: 20,
    color: colors.gray.light
  },
  value: {
    fontSize: 20,
    color: colors.gray.veryLight
  },
  lineHeight: {
    lineHeight: 1.5
  }
}))

export default useStyles
