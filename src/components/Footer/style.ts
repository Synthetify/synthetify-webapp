import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: colors.gray.background,
    padding: 12,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  },
  socialMedia: {
    width: 32,
    height: 32,
    marginLeft: 9,
    background: 'transparent',
    cursor: 'pointer',
    '&:hover path': {
      // possible in future
    }
  },
  divider: {
    backgroundColor: 'transparent',
    [theme.breakpoints.down('xs')]: {
      backgroundColor: colors.gray.light
    }
  }
}))

export default useStyles
