import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    padding: '0 20px',
    '& > *': {
      marginTop: 15
    }
  },
  divider: {
    background: colors.navy.navButton,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    fontSize: 16,
    width: 130
  }
}))

export default useStyles
