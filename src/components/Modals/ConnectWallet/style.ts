import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 500,
    borderRadius: 10,
    margin: 20
  },
  listItem: {
    height: 34
  },
  icon: {
    width: 24,
    height: 24,
    display: 'inline'
  },
  name: {
    textTransform: 'capitalize'
  }
}))

export default useStyles
