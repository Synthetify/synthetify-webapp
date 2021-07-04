import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16,
    color: colors.gray.manatee
  },
  icon: {
    paddingRight: 10,
    minWidth: 42
  }
}))

export default useStyles
