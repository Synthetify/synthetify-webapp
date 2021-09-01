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
    paddingBlock: 20,
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 22,
    color: colors.navy.lightGrey,
    backgroundColor: '#1F1F41',
    [theme.breakpoints.down('xs')]: {
      '& > *': {
        fontSize: 18
      }
    }
  },
  header: {
    height: 66,
    backgroundColor: '#1F1F4160',
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
