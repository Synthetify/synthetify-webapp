import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors, typography } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    background: colors.navy.navButton,
    marginBlock: 16,

    [theme.breakpoints.down('sm')]: {
      marginBlock: 20
    },

    [theme.breakpoints.down('xs')]: {
      marginBlock: 16
    }
  },
  button: {
    ...typography.subtitle1,
    width: 130
  },
  amount: {
    marginTop: 24,
    marginBottom: 18,

    [theme.breakpoints.down('sm')]: {
      marginTop: 16
    }
  },
  buttonsWrapper: {
    marginTop: 8,

    [theme.breakpoints.down('sm')]: {
      marginTop: 4
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: 8
    }
  },
  line: {
  },
  label: {
    top: -1
  }
}))

export default useStyles
