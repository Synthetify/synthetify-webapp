import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    background: colors.navy.navButton,
    marginTop: 22
  },
  button: {
    fontSize: 16,
    width: 130
  },
  amount: {
    marginTop: 24,

    [theme.breakpoints.down('sm')]: {
      marginTop: 16
    }
  },
  buttonsWrapper: {
    marginTop: 24
  },
  line: {
    marginTop: 22
  }
}))

export default useStyles
