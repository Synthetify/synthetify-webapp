import { makeStyles } from '@material-ui/core/styles'
import { typography, colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1400px',
    width: 'unset',
    paddingInline: 20
  },
  text: {
    ...typography.heading1,
    color: colors.navy.veryLightGrey,
    paddingBottom: 16
  }
}))
export default useStyles
