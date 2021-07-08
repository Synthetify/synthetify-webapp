import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 22,
    color: colors.gray.veryLight
  },
  tooltip: {
    background: colors.gray.mid,
    padding: '5px 8px'
  },
  hint: {
    color: colors.white.main,
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '16px'
  },
  questionMark: {
    height: 17,
    width: 17
  }
}))

export default useStyles
