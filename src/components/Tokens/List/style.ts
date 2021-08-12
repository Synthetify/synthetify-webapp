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
    [theme.breakpoints.down('xs')]: {
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
    backgroundColor: `${colors.navy.component}80`,
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        fontSize: 18
      }
    }
  },
  header: {
    height: 66,
    backgroundColor: colors.navy.dark,
    paddingLeft: 16,

    [theme.breakpoints.down('sm')]: {
      height: 39,
      paddingLeft: 14
    },

    [theme.breakpoints.down('xs')]: {
      paddingRight: 20
    }
  },
  column: {
    maxWidth: 159,

    [theme.breakpoints.down('xs')]: {
      maxWidth: 75
    }
  }
}))

export default useStyles
