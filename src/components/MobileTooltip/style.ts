import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  tooltip: {
    background: colors.navy.info,
    padding: '5px 8px'
  }
}))

export default useStyles
