import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    width: 226,
    borderRadius: 10,
    margin: 20

  }
}))

export default useStyles
