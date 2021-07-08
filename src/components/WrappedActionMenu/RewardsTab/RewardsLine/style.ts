import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 22,
    color: colors.gray.veryLight
  },
  tooltip: {
    background: colors.gray.mid,
    color: colors.white.main,
    fontSize: 13,
    padding: '5px 8px',
    fontWeight: 400
  },
  questionMark: {
    height: 17,
    width: 17
  }
}))

export default useStyles
