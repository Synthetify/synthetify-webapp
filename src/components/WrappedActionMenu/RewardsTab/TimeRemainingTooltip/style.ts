import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  hint: {
    color: colors.white.main,
    fontSize: 13,
    lineHeight: '16px'
  },
  icon: {
    height: 20,
    minWidth: 20
  }
}))

export default useStyles
