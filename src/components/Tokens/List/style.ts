import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerFont: {
    fontWeight: 700,
    fontSize: 22,
    lineHeight: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    },
    color: colors.navy.grey
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
  header: {
    height: 66,
    backgroundColor: colors.navy.dark,
    paddingInline: 16,

    [theme.breakpoints.down('sm')]: {
      height: 39,
      paddingInline: 14
    }
  }
}))

export default useStyles
