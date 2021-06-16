import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: colors.blue.bastille
  },
  headerFont: {
    fontWeight: 600,
    fontSize: 22,
    color: colors.gray.manatee
  }
}))

export default useStyles
