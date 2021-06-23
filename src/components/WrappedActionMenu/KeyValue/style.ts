import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontSize: 20
  },
  property: {
    color: colors.gray.light
  },
  value: {
    color: colors.gray.veryLight
  },
  lineHeight: {
    lineHeight: 1.5
  }
}))

export default useStyles
