import { colors } from '@static/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 13,
    lineHeight: '16px',
    fontWeight: 700,
    marginBottom: 10
  },
  icon: {
    height: 20,
    minWidth: 20
  },
  tooltip: {
    backgroundColor: colors.navy.button
  }
}))

export default useStyles
