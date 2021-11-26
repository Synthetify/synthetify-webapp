import { makeStyles, Theme } from '@material-ui/core/styles'
import { typography, colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1420px',
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
