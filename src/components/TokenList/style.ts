import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 10,
    background: colors.navy.component,
    padding: '20px 32px',
    [theme.breakpoints.down('xs')]: {
      padding: 10
    }
  },
  ownedTokens: {
    fontWeight: 400,
    color: colors.navy.grey,
    fontSize: 22,
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    }
  },
  headerFont: {
    fontWeight: 600,
    fontSize: 22,
    lineHeight: '26px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 18
    },
    color: colors.navy.grey
  },
  headerDivider: {
    background: colors.navy.grey
  },
  tokensDivider: {
    background: colors.navy.grey
  },
  emptyTokens: {
    margin: '20px auto',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 22,
    maxWidth: 500,
    color: colors.navy.lightGrey,
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        fontSize: 18
      }
    }
  },
  tokensDividerMargin: {
    margin: '18px 0'
  }
}))

export default useStyles
