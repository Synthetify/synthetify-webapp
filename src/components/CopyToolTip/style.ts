import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: colors.black.greyish,
    marginTop: 10,
    cursor: 'pointer',
    fontSize: 12
  },
  arrow: {
    color: colors.black.greyish
  },
  wrapper: {
    cursor: 'pointer'
  }
}))

export default useStyles
