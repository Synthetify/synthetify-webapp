import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  fixedWrapper: {
    position: 'fixed',
    width: 'fit-content',
    marginRight: 22,
    marginBottom: 22,
    bottom: 0,
    right: 0
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.navy.background,
    padding: 12
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
    display: 'block',
    backgroundColor: colors.navy.lightGrey
  }
}))

export default useStyles
