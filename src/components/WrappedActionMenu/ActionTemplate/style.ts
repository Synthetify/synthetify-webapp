import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  available: {
    maxWidth: 240,
    maxHeight: 60,
    overflow: 'hidden',
    '& *': {
      margin: 0
    }
  },
  divider: {
    backgroundColor: colors.gray.light,
    height: 60
  }
}))

export default useStyles
