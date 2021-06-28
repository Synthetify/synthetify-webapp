import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: colors.gray.background,
    padding: 12
  },
  socialMedia: {
    width: 32,
    height: 32,
    marginLeft: 9
  }
}))

export default useStyles
