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
    color: colors.navy.veryLightGrey,
    boxShadow: '8px 8px 9px 0.1px rgba(0, 0, 0, 0.75)'
  }
}))

export default useStyles
