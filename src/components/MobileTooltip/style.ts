import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  tooltip: {
    background: colors.navy.info,
    padding: 10,
    borderRadius: 10
  }
}))

export default useStyles
