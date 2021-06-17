import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: colors.gray.component,
    '& > *': {
      marginTop: 15
    }
  },
  card: {
    background: colors.gray.component,
    borderRadius: 10,
    padding: 32
  },
  header: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  ownedTokens: {
    fontWeight: 400,
    color: colors.gray.light,
    fontSize: 22
  },
  addAccountWrapper: {
    textAlign: 'end',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  headerFont: {
    fontWeight: 600,
    fontSize: 22,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    },
    color: colors.gray.light
  },
  divider: {
    background: `linear-gradient(90deg, ${colors.black.controls}, rgba(255, 255, 255, 0))`
  },
  emptyTokens: {
    margin: '20px auto',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 22,
    maxWidth: 500,
    color: colors.gray.veryLight
  },
  diverMargin: {
    margin: 18
  }
}))

export default useStyles
