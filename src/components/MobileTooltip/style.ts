import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: colors.navy.tooltip,
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
    lineHeight: '16px',
    fontWeight: 500,
    color: colors.navy.veryLightGrey
  }
}))

export default useStyles
