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
    backgroundColor: 'transparent',
    cursor: 'pointer',
    '&:hover path': {
      // possible in future
    }
  },
  divider: {
    display: 'none',
    backgroundColor: colors.gray.light,
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  }
}))

export default useStyles
