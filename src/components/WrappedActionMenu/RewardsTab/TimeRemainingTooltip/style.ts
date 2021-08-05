import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  hint: {
    color: colors.white.main,
    fontWeight: 400,
    fontSize: 13,
    lineHeight: '16px'
  },
  questionMark: {
    height: 17,
    minWidth: 17
  }
}))

export default useStyles
