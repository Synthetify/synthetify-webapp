import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      marginTop: 15
    }
  },
  card: {
    borderRadius: 10,
    background: colors.gray.component,
    padding: 32,
    [theme.breakpoints.down('xs')]: {
      padding: 10
    }
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
  headerDivider: {
    background: colors.gray.light
  },
  tokensDivider: {
    background: colors.gray.mid
  },
  emptyTokens: {
    margin: '20px auto',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 22,
    maxWidth: 500,
    color: colors.gray.veryLight
  },
  tokensDividerMargin: {
    margin: 18
  }
}))

export default useStyles
