import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  headerFont: {
    fontWeight: 700,
    fontSize: 22,
    lineHeight: '40px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 13
    },
    color: colors.navy.grey
  },
  emptyTokens: {
    paddingBlock: 20,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 22,
    color: colors.navy.lightGrey,
    backgroundColor: colors.navy.component,
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        fontSize: 18
      }
    }
  },
  header: {
    height: 69,
    backgroundColor: colors.navy.background,
    paddingInline: 24,

    [theme.breakpoints.down('sm')]: {
      height: 61,
      paddingInline: 20
    },

    [theme.breakpoints.down('xs')]: {
      paddingInline: 16,
      height: 45
    }
  },
  column: {
    maxWidth: 164,

    [theme.breakpoints.down('sm')]: {
      maxWidth: 141
    },

    [theme.breakpoints.down('xs')]: {
      maxWidth: 85
    }
  }
}))

export default useStyles
