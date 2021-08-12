import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  tooltip: {
    background: colors.navy.info,
    padding: 10,
    borderRadius: 10,
    fontSize: 10,
    lineHeight: '12px',
    fontWeight: 500,
    color: colors.navy.veryLightGrey
  }
}))

export default useStyles
