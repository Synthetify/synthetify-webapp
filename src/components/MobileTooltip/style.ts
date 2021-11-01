import { makeStyles } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles(() => ({
  tooltip: {
    backgroundColor: colors.navy.tooltip,
    padding: 10,
    paddingTop: 5,
    borderRadius: 10,
    ...typography.body4,
    color: colors.navy.veryLightGrey,
    boxShadow: '8px 8px 9px 0.1px rgba(0, 0, 0, 0.75)'
  }
}))

export default useStyles
