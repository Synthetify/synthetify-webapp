import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    borderRadius: 10
  },
  title: {
    fontSize: 22,
    color: colors.gray.light
  },
  titleDivider: {
    background: colors.gray.light
  }
}))

export default useStyles
