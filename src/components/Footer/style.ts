import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  fixedWrapper: {
    position: 'fixed',
    width: 'fit-content',
    bottom: 22,
    right: 22
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.navy.background,
    paddingBlock: 12
  },
  socialMedia: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    cursor: 'pointer',

    [theme.breakpoints.only('md')]: {
      height: 43,
      width: 43
    },

    '&:not(:first-child)': {
      marginLeft: 9
    },

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
