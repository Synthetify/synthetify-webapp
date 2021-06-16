import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  root: {
    background: colors.black.cinder,
    padding: '25px',
    paddingRight: 0,
    height: 100
  },
  snyLogo: {
    width: 48,
    height: 36,
    marginRight: 20
  },
  dotsButton: {
    fontSize: 60
  }
}))

export default useStyles
